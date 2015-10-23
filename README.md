# BAS Style Kit

Master: [![Build Status](https://semaphoreci.com/api/v1/projects/0f33c45e-b93f-4491-aa1a-eb4848653351/573094/badge.svg)](https://semaphoreci.com/antarctica/bas-style-kit)
Develop: [![Build Status](https://semaphoreci.com/api/v1/projects/0f33c45e-b93f-4491-aa1a-eb4848653351/569676/badge.svg)](https://semaphoreci.com/antarctica/bas-style-kit)

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

* More information about this project is available in `documentation/project-management`
* Documentation for end users is stored in `documentation/end-users` and online, see the *Usage* section for details
* Documentation for developers is available in `documentation/developers`

This project is based on the BASIS project template (version 2).

## Requirements

You will need to have the following software available on your localhost depending on the environment you wish to use:

### All environments

* [Mac OS X](https://www.apple.com/uk/osx/)
* [NMap](http://nmap.org/) `brew cask install nmap` [1]
* [Git](http://git-scm.com/) `brew install git`
* [Ansible](http://www.ansible.com) `brew install ansible`
* You have a [private key](https://help.github.com/articles/generating-ssh-keys/) `id_rsa`
and [public key](https://help.github.com/articles/generating-ssh-keys/) `id_rsa.pub` in `~/.ssh/`

[1] `nmap` is needed to determine if you access internal resources (such as Stash).

### Development - local

* [VMware Fusion](http://vmware.com/fusion) `brew cask install vmware-fusion`
* [Vagrant](http://vagrantup.com) `brew cask install vagrant`
* Vagrant plugins:
    * [Vagrant VMware](http://www.vagrantup.com/vmware) `vagrant plugin install vagrant-vmware-fusion`
    * [Host manager](https://github.com/smdahlen/vagrant-hostmanager) `vagrant plugin install vagrant-hostmanager`
    * [Vagrant triggers](https://github.com/emyl/vagrant-triggers) `vagrant plugin install vagrant-triggers`
* You have an entry like [1] in your `~/.ssh/config`
* You have a [self signed SSL certificate for local use](https://gist.github.com/felnne/25c220a03f8f39663a5d), with the
certificate assumed at, `app/provisioning/certificates/v.m/v.m.tls.crt`, and private key, `/etc/ssl/private/v.m.tls.key`

[1] SSH config entry

```shell
Host *.v.m
    ForwardAgent yes
    User app
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

### Staging - remote

* [Terraform](terraform.io) `brew cask install terraform` (minimum version: 6.0)
* [Rsync](https://rsync.samba.org/) `brew install rsync`
* You have an entry like [1] in your `~/.ssh/config`
* An environment variable: `TF_VAR_digital_ocean_token=XXX` set,
where `XXX` is your DigitalOcean personal access token - used by Terraform
* An environment variable: `TF_VAR_ssh_fingerprint=XXX` set,
 where `XXX` is [your public key fingerprint](https://gist.github.com/felnne/596d2bf11842a0cf64d6) - used by Terraform
* An `AWS_ACCESS_KEY_ID` environment variable set to your AWS access key ID, and both `AWS_ACCESS_KEY_SECRET` and
`AWS_SECRET_ACCESS_KEY` environment variables set to your AWS Access Key [2]
* Suitable permissions within AWS to manage S3 buckets and to manage CloudFront distributions
* Suitable permissions within [SemaphoreCI](https://semaphoreci.com) to create projects under the `antarctica`
organisation [3]
* Ansible Vault password file [4]
* The `star.web.bas.ac.uk` SSL certificate is available within CloudFront [5]

[1] SSH config entry

```shell
Host *.web.nerc-bas.ac.uk
    ForwardAgent yes
    User app
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

[2] Specifically for a user account delegated from the BAS AWS account, use the
[IAM Console](https://console.aws.amazon.com/iam/home?region=eu-west-1) to generate access keys.

[3] Please contact the *Project Maintainer* if you do not have permission to access this organisation.

[4] This playbook uses an Ansible vault managed variables file to set the AWS user credentials. The password for this
vault is contained in `provisioning/.vault_pass.txt` and passed to the `ansible-playbook` at run time.

For obvious reasons, this file is **MUST NOT** be checked into source control. Those with suitable access can download
this file from the [BAS Credential Store](https://stash.ceh.ac.uk/projects/BASWEB/repos/porcupine/browse).

[5] See the [BAS Credential Store](https://stash.ceh.ac.uk/projects/BASWEB/repos/porcupine/browse) for instructions.

### Production - remote

* [Terraform](terraform.io) `brew cask install terraform` (minimum version: 6.0)
* [Rsync](https://rsync.samba.org/) `brew install rsync`
* [Duck](https://duck.sh/) `brew install duck`
* You have an entry like [1] in your `~/.ssh/config`
* You have access to the BAS CDN Azure account [2]
* An environment variable: `TF_VAR_digital_ocean_token=XXX` set,
where `XXX` is your DigitalOcean personal access token - used by Terraform
* An environment variable: `TF_VAR_ssh_fingerprint=XXX` set,
 where `XXX` is [your public key fingerprint](https://gist.github.com/felnne/596d2bf11842a0cf64d6) - used by Terraform

[1] SSH config entry

```shell
Host *.web.nerc-bas.ac.uk
    ForwardAgent yes
    User app
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

[2] Currently this account is tied to Felix Fennell - this will be changed, see https://jira.ceh.ac.uk/browse/BSK-54
for details.

## Setup

### All environments

```shell
$ git clone ssh://git@stash.ceh.ac.uk:7999/bsk/bas-style-kit.git
$ cd bas-style-kit
```

### Development - local

VMs are powered by VMware, managed using Vagrant and configured by Ansible.

```shell
$ vagrant up
```

Vagrant will automatically configure the localhost hosts file for infrastructure it creates on your behalf:

| Name                       | Points To        | FQDN                         | Notes                       |
| -------------------------- | ---------------- | ---------------------------- | --------------------------- |
| bas-style-kit-dev-web1.v.m | *computed value* | `bas-style-kit-dev-web1.v.m` | The VM's private IP address |

Note: Vagrant managed VMs also have a second, host-guest only, network for management purposes not documented here.

```shell
$ ansible-playbook -i provisioning/development provisioning/site-dev.yml
```

### Staging - remote

Static website hosting is powered by AWS S3 / AWS CloudFront, managed using terraform / manually, configured by Ansible
and deployed by SemaphoreCI.

Distribution assets of each version are stored in the *development* environment of the BAS CDN, deployments to this CDN
are managed automatically by SemaphoreCI [1].

#### Infrastructure

The AWS S3 bucket managed by Terraform:

```shell
$ terraform get
$ terraform apply
```

The CloudFront distribution that sits on top of the S3 bucket to provide SSL, requires manual provisioning:

1. Login to the [BAS AWS Console](https://178449599525.signin.aws.amazon.com/console/)
2. Within CloudFront, setup a new web distribution with these settings (use defaults for non-specified settings):
  * Origin domain name: `bas-style-kit-docs-stage.s3.amazonaws.com`
  * Viewer protocol policy: *Redirect HTTP to HTTPS*
  * Price class: *Use Only US and Europe*
  * Alternate domain names: `style-kit-preview.web.bas.ac.uk`
  * SSL certificate: *Custom SSL Certificate* -> `star-web-bas-ac-uk`
  * Default root object: `index.html`

To use an alternate domain name, a CNAME DNS record is required, this will need to be created by BAS ICT as below:

| Kind      | Name               | Points To        | FQDN                              | Notes      |
| --------- | ------------------ | ---------------- | --------------------------------- | ---------- |
| **CNAME** | style-kit-preview  | *computed value* | `style-kit-preview.web.bas.ac.uk` | Vanity URL |

#### Continuous Integration

If not added already, create a new project in [SemaphoreCI](https://semaphoreci.com) using the *develop* branch of the
Project Repository as the project repository, associate with the `antarctica` organisation.

If the project already exists, but not for this branch, check the settings below are correct and add the *develop*
branch as a new build branch manually.

In the settings for this project set the *Build Settings* to:

* Language: `Python`
* Python version: `2.7`

For the *Setup* thread enter these commands:

```shell
pip install ansible
```

For *Thread #1* rename to *Build and Test* with these commands:

```shell
ansible-playbook -i provisioning/local provisioning/site-test-ci.yml --connection=local
```

Set the *Branches* settings to:

* Build new branches: `Never`

Set *Environment Variables* as shown in the table below:

| Name         | Content | Encrypt Content |
| ------------ | ------- | --------------- |
| `JEKYLL_ENV` | staging | No (unchecked)  |

Set *Configuration Files* as shown in the table below:

| File Path                                    | Content | Encrypt File  |
| -------------------------------------------- | ------- | ------------- |
| `bas-style-kit/provisioning/.vault_pass.txt` | [3]     | Yes (checked) |

Copy the build badge for the *develop* branch to this README.

If the project and branch already exists, check the settings above are correct.

#### Continuous Deployment

If not added already, create a deployment in [SemaphoreCI](https://semaphoreci.com) using the Generic Deployment option.

* Set the deployment strategy to: `Automatic`
* Set the branch to deploy to: `develop`
* Set the deploy commands to [2]
* Skip the deployment SSH key option
* Set the server name to: `s3-bas-style-kit-docs-stage`
* Set the server URL to: `http://bas-style-kit-docs-stage.s3-website-eu-west-1.amazonaws.com/`

If the deployment already exists check the settings above are correct.

End-user documentation for this project can then be accessed from
[here](http://bas-style-kit-docs-stage.s3-website-eu-west-1.amazonaws.com/).

[1] Note: This service should already exist and is out of the scope of this project.
See the [BAS CDN Project](https://stash.ceh.ac.uk/projects/WSF/repos/bas-cdn/browse) for more information.

[2]
```shell
pip install ansible
ansible-playbook -i provisioning/local provisioning/deploy-stage-cd.yml --connection=local --vault-password-file provisioning/.vault_pass.txt
```

[3] Set this to the contents of the `.vault_pass.txt` file for this project. Users can request this file using the
information in the *Issue Tracker* section of the Project Management documentation..

### Production - remote

VMs are powered by DigitalOcean, managed using Terraform and configured by Ansible.

An Azure CDN is used to host the distribution assets of each version, it is managed manually.

You **MUST** have setup and configured a *development* environment, before you can create a *production* environment.
Specifically, you must have a `/site` or `/dist` directory. If you don't, you **MUST** create them in a *development*
environment, using the steps listed in the *usage* section of this README.

See the *developer* documentation for instructions on how to prepare to a deploy a release, which will take place as
part of this setup process.

```shell
$ terraform get
$ terraform apply
```

Terraform will automatically configure DNS records for infrastructure it creates on your behalf:

| Kind      | Name                             | Points To                                             | FQDN                                                  | Notes                                                |
| --------- | -------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| **A**     | bas-style-kit-prod-web1.internal | *computed value*                                      | `bas-style-kit-prod-web1.internal.web.nerc-bas.ac.uk` | The VM's private IP address                          |
| **A**     | bas-style-kit-prod-web1.external | *computed value*                                      | `bas-style-kit-prod-web1.external.web.nerc-bas.ac.uk` | The VM's public IP address                           |
| **CNAME** | bas-style-kit-prod-web1          | `bas-style-kit-prod-web1.external.web.nerc-bas.ac.uk` | `bas-style-kit-prod-web1.web.nerc-bas.ac.uk`          | A pointer for the default address                    |
| **CNAME** | bas-style-kit                    | `bas-style-kit-prod-web1.web.nerc-bas.ac.uk`          | `bas-style-kit.web.nerc-bas.ac.uk`                    | Vanity URL to current production instance of project |

Note: Terraform cannot provision VMs itself due to [this issue](https://github.com/hashicorp/terraform/issues/1178),
therefore these tasks need to be performed manually:

```shell
$ ansible-galaxy install https://github.com/antarctica/ansible-prelude,v0.1.1 --roles-path=provisioning/roles_bootstrap  --no-deps --force
$ ansible-playbook -i provisioning/local provisioning/prelude.yml
$ ansible-playbook -i provisioning/production provisioning/bootstrap-digitalocean.yml
$ ansible-playbook -i provisioning/production provisioning/site-prod.yml
```

End-user documentation for this project can then be accessed from [bas-style-kit-](bas-style-kit.web.nerc-bas.ac.uk).

An Azure CDN is used to host the distribution assets of each version, for use within websites and applications. It is
unlikely you will need to create this CDN since only a single instance is used for this project [1]. However for
completeness the steps to create a CDN are listed here.

There are two stages to setup the CDN - creating the underlying storage account and container, and adding a CDN in
front of this.

To create the underlying storage account and container:

1. Login to the [Azure management portal](http://manage.windowsazure.com/)
2. Select *New* -> *Data Services* -> *Storage* -> *Quick Create* service using these options:
  * *URL* - `bascdnprod`(.core.windows.net)
  * *Location/affinity group* - `West Europe`
  * *Replication* - `Geo-Redundant` [2]
3. Select *Storage* -> *bascdnprod* -> *containers* -> *add* using these options:
  * *Name* - `bas-style-kit`
  * *Access* - `public blob`

To create the CDN backed by this storage account:

1. Login to the [Azure management portal](http://manage.windowsazure.com/)
2. Select *New* -> *App Services* -> *CDN* -> *Quick Create* service using these options:
  * *Origin type* - `Storage Accounts`
  * *Origin URL* - `bascdnprod.blob.core.windows.net`
3. Select *CDN* -> *[3]* and set these options:
  * *Enable HTTPS*

[1] This CDN may also be used by other projects as needed, these will use the same storage account, but different
containers within this. The CDN in front of these containers will also be shared as it links to the storage account,
not the containers within.

[2] The means the content in the storage account will be mirrored between the `West Europe` and `North Europe`
locations. Data will not pass beyond the EU (i.e. to a US location). However as Microsoft is a US company this isn't
really a meaningful distinction.

[3] The name of the CDN instance is random but will be something like `az792977`.

## Usage

### All environments

It is assumed you have setup the environment you wish to use and your working directory is the root of this project.

### Development - local

#### End-user documentation

In the *development* environment documentation is built from within the Project VM, triggered either manually or
automatically, to ensure new features are correctly documented.

The `JEKYLL_ENV` is not set in this environment to use its default value of `development`. This should not be changed
to ensure the documentation is built in the correct way.

To manually build the documentation:

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ jekyll build
```

To automatically build whenever changes are made to source files:

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ jekyll build --watch --force_polling
```

Note: The definitive version of this documentation, built from the latest release of the project, is available at
[here](https://bas-style-kit.web.nerc-bas.ac.uk/).

### Staging - remote

#### End-user documentation

The Continuous Deployment element of SemaphoreCI will deploy project documentation to the staging documentation
website automatically. This documentation is generated from the *develop* branch of the Project Repository providing it
has passed certain tests. These is automatic, taking place whenever changes are pushed to the Project Repository.

The `JEKYLL_ENV` will be automatically set to `staging` to ensure the documentation is built in the correct way.

The Continuous Deployment element of SemaphoreCI will also deploy distribution assets to the *development* environment
of the BAS CDN automatically. These assets are also generated from the *develop* branch of the Project Repository
providing it has passed the same tests. These processes are also automatic.

Note: The definitive version of this documentation, built from the latest, passing, version of the *develop* branch of
this project, is available [here](http://bas-style-kit-docs-stage.s3-website-eu-west-1.amazonaws.com/).

### Production - remote

#### CDN distribution for assets and project release

The distribution assets (i.e. compiled CSS, etc.) and the current snapshot of the overall project are hosted on the
project CDN for each release. These resources are used by others in their own websites and applications in order to
implement or build on a particular release of the Style Kit.

Note: You **MUST** make sure you have the correct version checked out and that you do not have the *master* branch
checked out instead. This ensures the correct distribution files are used and the associated documentation generated.

The distribution files to be uploaded to the CDN will have already been compiled within the `dist` directory. The
snapshot of the overall project to be uploaded can be downloaded from Stash directly as a `.zip` archive. Both files
will be uploaded the CDN's underlying Storage Account.

To upload the distribution files (it is assumed all files inside `/dist` will be uploaded):

```
$ duck --upload azure://bascdnprod.blob.core.windows.net/bas-style-kit/[version]/dist dist/ -u bascdndev -p [primary_access_key]
```

Where: `[version]` represents the release being uploaded and `[primary access key]` is the primary access key of the
Storage Account being used [1], in this case `bascdnprod`.

E.g.

```
$ duck --upload azure://bascdnprod.blob.core.windows.net/bas-style-kit/0.1.0-alpha/dist dist/ -u bascdndev -p xxx
```

To upload the snapshot of the overall project:

1. Access the [project's Stash repo](https://stash.ceh.ac.uk/projects/BSK/repos/bas-style-kit/browse)
2. Using the tag/branch selector, select the relevant tag for the release
3. Select the *download* action
4. Change to the path containing the downloaded `.zip` archive and use the command below to upload to the CDN:

```
$ duck --upload azure://bascdnprod.blob.core.windows.net/bas-style-kit/[version] [snapshot] -u bascdndev -p [primary_access_key]
```

Where: `[version]` represents the release being uploaded, `[snapshot]` the snapshit archive and `[primary access key]`
the primary access key of the Storage Account being used [1], in this case `bascdnprod`.

E.g.

```
$ duck --upload azure://bascdnprod.blob.core.windows.net/bas-style-kit/0.1.0-alpha/ bas-style-kit/0.1.0-alpha.zip dist/ -u bascdndev -p xxx
```

[1] You can find this access key through the [Azure management portal](http://manage.windowsazure.com/) by logging in
and selecting *Storage* -> *bascdnprod* -> *manage access keys*

#### End-user documentation

To generate end-user documentation for a *production* environment ensure you have the relevant release tag checked out
in a *development* environment.

Note: You **MUST** make sure you have the correct version checked out and that you do not have the *master* branch
checked out instead. This ensures the correct distribution files are used and the associated documentation generated.

Within this environment generate the documentation:

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ jekyll build

$ logout
```

Then publish this to the *production* environment:

```shell
$ ansible-playbook -i provisioning/production provisioning/update-prod.yml
```

This will update the documentation on the production server using the generated site files.

## Contributing

This project welcomes contributions, see `CONTRIBUTING` for our general policy.

## Releases

See the *developer* documentation for instructions on how to create and manage releases.

## Acknowledgements

The vast majority of this project is based on the amazing [Bootstrap](http://getbootstrap.com) project.

97% of any credit for this project should go to Boostrap's [authors and contributors](http://getbootstrap.com/about/).

The original Bootstrap licensing statement is shown below,
see their original `LICENSE-BOOTSTRAP-MIT` further licensing information.

> Code and documentation copyright 2011-2015 Twitter, Inc. Code released under
[the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE).
Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).

The authors of this project are incredibly grateful for their work.

## License

Copyright 2015 NERC BAS. Licensed under the MIT license, see `LICENSE` for details.
