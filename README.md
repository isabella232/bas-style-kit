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
* An `AWS_ACCESS_KEY_ID` environment variable set to your AWS access key ID, and both `AWS_ACCESS_KEY_SECRET` and
`AWS_SECRET_ACCESS_KEY` environment variables set to your AWS Access Key [1]
* Suitable permissions within AWS to manage S3 buckets and to manage CloudFront distributions
* Suitable permissions within [SemaphoreCI](https://semaphoreci.com) to create projects under the `antarctica`
organisation [2]
* Ansible Vault password file [3]
* The `star.web.bas.ac.uk` SSL certificate is available within CloudFront [4]

[1] Specifically for a user account delegated from the BAS AWS account, use the
[IAM Console](https://console.aws.amazon.com/iam/home?region=eu-west-1) to generate access keys.

[2] Please contact the *Project Maintainer* if you do not have permission to access this organisation.

[3] This playbook uses an Ansible vault managed variables file to set the AWS user credentials. The password for this
vault is contained in `provisioning/.vault_pass.txt` and passed to the `ansible-playbook` at run time.

For obvious reasons, this file is **MUST NOT** be checked into source control. Those with suitable access can download
this file from the [BAS Credential Store](https://stash.ceh.ac.uk/projects/BASWEB/repos/porcupine/browse).

[4] See the [BAS Credential Store](https://stash.ceh.ac.uk/projects/BASWEB/repos/porcupine/browse) for instructions.

### Production - remote

* [Terraform](terraform.io) `brew cask install terraform` (minimum version: 6.0)
* An `AWS_ACCESS_KEY_ID` environment variable set to your AWS access key ID, and both `AWS_ACCESS_KEY_SECRET` and
`AWS_SECRET_ACCESS_KEY` environment variables set to your AWS Access Key [1]
* Suitable permissions within AWS to manage S3 buckets and CloudFront distributions
* Suitable permissions to upload to the BAS CDN [2]
* Suitable permissions within [SemaphoreCI](https://semaphoreci.com) to create projects under the `antarctica`
organisation [3]
* Ansible Vault password file [4]
* The `star.web.bas.ac.uk` SSL certificate is available within CloudFront [5]

[1] Specifically for a user account delegated from the BAS AWS account, use the
[IAM Console](https://console.aws.amazon.com/iam/home?region=eu-west-1) to generate access keys.

[2] See the [BAS CDN Project](https://stash.ceh.ac.uk/projects/WSF/repos/bas-cdn/browse) for more information.

[3] Please contact the *Project Maintainer* if you do not have permission to access this organisation.

[4] This playbook uses an Ansible vault managed variables file to set the AWS user credentials. The password for this
vault is contained in `provisioning/.vault_pass.txt` and passed to the `ansible-playbook` at run time.

For obvious reasons, this file is **MUST NOT** be checked into source control. Those with suitable access can download
this file from the [BAS Credential Store](https://stash.ceh.ac.uk/projects/BASWEB/repos/porcupine/browse).

[5] See the [BAS Credential Store](https://stash.ceh.ac.uk/projects/BASWEB/repos/porcupine/browse) for instructions.

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

#### Infrastructure

The AWS S3 bucket managed by Terraform:

```shell
$ terraform get
$ terraform apply
```

The CloudFront distribution that sits on top of the S3 bucket to provide SSL, requires manual provisioning:

1. Login to the [BAS AWS Console](https://178449599525.signin.aws.amazon.com/console/)
2. Within CloudFront, setup a new web distribution with these settings (use defaults for non-specified settings):
  * Origin domain name: `bas-style-kit-docs-stage.s3-website-eu-west-1.amazonaws.com`
  * Viewer protocol policy: *Redirect HTTP to HTTPS*
  * Price class: *Use Only US and Europe*
  * Alternate domain names: `style-kit-preview.web.bas.ac.uk`
  * SSL certificate: *Custom SSL Certificate* -> `star-web-bas-ac-uk`
  * Default root object: `index.html`

To use an alternate domain name, a CNAME DNS record is required, this will need to be created by BAS ICT as below:

| Kind      | Name              | Points To        | FQDN                              | Notes      |
| --------- | ----------------- | ---------------- | --------------------------------- | ---------- |
| **CNAME** | style-kit-preview | *computed value* | `style-kit-preview.web.bas.ac.uk` | Vanity URL |

#### Continuous Integration

If not added already, create a new project in [SemaphoreCI](https://semaphoreci.com) using the *develop* branch of the
Project Repository, associate with the `antarctica` organisation.

If the project already exists, but not this branch, check the settings below are correct and add the *develop* branch
as a new build branch manually.

In the settings for this project set the *Build Settings* to:

* Language: `Python`
* Python version: `2.7`

For the *Setup* thread enter these commands:

```shell
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
```

For *Thread #1* rename to *Build and Test* with these commands:

```shell
ansible-playbook -i provisioning/local provisioning/test-ci.yml --connection=local
```

Set the *Branches* settings to:

* Build new branches: `Never`

Set *Configuration Files* as shown in the table below:

| File Path                                    | Content | Encrypt File  |
| -------------------------------------------- | ------- | ------------- |
| `bas-style-kit/provisioning/.vault_pass.txt` | [1]     | Yes (checked) |

Copy the build badge for the *develop* branch to this README.

If the project and branch already exists, check the settings above are correct.

#### Continuous Deployment

If not added already, create a deployment in [SemaphoreCI](https://semaphoreci.com) using the Generic Deployment option.

* Set the deployment strategy to: `Automatic`
* Set the branch to deploy to: `develop`
* Set the deploy commands to [2]
* Skip the deployment SSH key option
* Set the server name to: `staging-documentation`
* Set the server URL to: `https://style-kit-preview.web.bas.ac.uk/`

If the deployment already exists check the settings above are correct.

End-user documentation for this project can then be accessed from
[here](https://style-kit-preview.web.bas.ac.uk/).

[1] Set this to the contents of the `.vault_pass.txt` file for this project. Users can request this file using the
information in the *Issue Tracker* section of the Project Management documentation.

[2]
```shell
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
ansible-playbook -i provisioning/local provisioning/deploy-stage-cd.yml --connection=local --vault-password-file provisioning/.vault_pass.txt
```

### Production - remote

Static website hosting is powered by AWS S3 / AWS CloudFront, managed using terraform / manually, configured by Ansible
and deployed by SemaphoreCI.

Distribution assets of each version are stored in the *development* environment of the BAS CDN, deployments to this CDN
are managed automatically by SemaphoreCI.

#### Infrastructure

The AWS S3 bucket managed by Terraform:

```shell
$ terraform get
$ terraform apply
```

The CloudFront distribution that sits on top of the S3 bucket to provide SSL, requires manual provisioning:

1. Login to the [BAS AWS Console](https://178449599525.signin.aws.amazon.com/console/)
2. Within CloudFront, setup a new web distribution with these settings (use defaults for non-specified settings):
  * Origin domain name: `bas-style-kit-docs-prod.s3-website-eu-west-1.amazonaws.com`
  * Viewer protocol policy: *Redirect HTTP to HTTPS*
  * Price class: *Use Only US and Europe*
  * Alternate domain names: `style-kit.web.bas.ac.uk`
  * SSL certificate: *Custom SSL Certificate* -> `star-web-bas-ac-uk`
  * Default root object: `index.html`

To use an alternate domain name, a CNAME DNS record is required, this will need to be created by BAS ICT as below:

| Kind      | Name      | Points To        | FQDN                      | Notes      |
| --------- | --------- | ---------------- | ------------------------- | ---------- |
| **CNAME** | style-kit | *computed value* | `style-kit.web.bas.ac.uk` | Vanity URL |

#### Continuous Integration

If not added already, create a new project in [SemaphoreCI](https://semaphoreci.com) using the *master* branch of the
Project Repository and associate with the `antarctica` organisation.

Note: To test changes that will apply to the master branch a `pretend-master` branch is used. This prevents such tests
from being carried out on the *production* branch of the project. To implement this repeat the steps below for the
*pretend-master* branch.

If the project already exists, but not this branch, check the settings below are correct and add the *master* branch
as a new build branch manually.

In the settings for this project set the *Build Settings* to:

* Language: `Python`
* Python version: `2.7`

For the *Setup* thread enter these commands:

```shell
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
```

For *Thread #1* rename to *Build and Test* with these commands:

```shell
ansible-playbook -i provisioning/local provisioning/site-test-ci.yml --connection=local
```

Set the *Branches* settings to:

* Build new branches: `Never`

Set *Configuration Files* as shown in the table below:

| File Path                                    | Content | Encrypt File  |
| -------------------------------------------- | ------- | ------------- |
| `bas-style-kit/provisioning/.vault_pass.txt` | [1]     | Yes (checked) |

Copy the build badge for the *master* branch to this README.

Note: Do not repeat this step for the *pretend-master* branch, it is not necessary.

If the project and branch already exists, check the settings above are correct.

#### Continuous Deployment

##### End-user documentation

If not added already, create a deployment in [SemaphoreCI](https://semaphoreci.com) using the Generic Deployment option.

Note: To test changes that will apply to the master branch a `pretend-master` branch is used. This prevents such tests
from being carried out on the *production* branch of the project. To implement this repeat the steps below for the
*pretend-master* branch. Use the same S3 bucket, and server URL as the real master branch,
use `pretend-master-documentation` as the server name.

* Set the deployment strategy to: `Automatic`
* Set the branch to deploy to: `master`
* Set the deploy commands to [1]
* Skip the deployment SSH key option
* Set the server name to: `master-documentation`
* Set the server URL to: `https://style-kit.web.bas.ac.uk/`

If the deployment already exists check the settings above are correct.

End-user documentation for this project can then be accessed from
[here](https://style-kit.web.bas.ac.uk/).

[1] Set this to the contents of the `.vault_pass.txt` file for this project. Users can request this file using the
information in the *Issue Tracker* section of the Project Management documentation.

[2]
```shell
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
ansible-playbook -i provisioning/local provisioning/deploy-docs-prod-cd.yml --connection=local --vault-password-file provisioning/.vault_pass.txt
```

##### Distribution assets

If not added already, create a deployment in [SemaphoreCI](https://semaphoreci.com) using the Generic Deployment option.

Note: To test changes that will apply to the master branch a `pretend-master` branch is used. This prevents such tests
from being carried out on the *production* branch of the project. To implement this repeat the steps below for the
*pretend-master* branch. Use `pretend-master-documentation` as the server name.

* Set the deployment strategy to: `Automatic`
* Set the branch to deploy to: `master`
* Set the deploy commands to [1]
* Skip the deployment SSH key option
* Set the server name to: `master-assets-cdn`

If the deployment already exists check the settings above are correct.

[1]
```shell
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
ansible-playbook -i provisioning/local provisioning/deploy-assets-prod-cd.yml --connection=local --vault-password-file provisioning/.vault_pass.txt
```

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

$ gulp clean
$ gulp fonts
$ gulp less
$ gulp jekyll-data
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

Note: The definitive version of this documentation, built from the latest, passing, version of the *develop* branch of
this project, is available [here](http://bas-style-kit-docs-stage.s3-website-eu-west-1.amazonaws.com/).

### Production - remote

#### End-user documentation

The Continuous Deployment element of SemaphoreCI will deploy project documentation to the staging documentation
website automatically. This documentation is generated from the *master* branch of the Project Repository providing it
has passed certain tests. These is automatic, taking place whenever changes are pushed to the Project Repository.

The `JEKYLL_ENV` will be automatically set to `production` to ensure the documentation is built in the correct way.

Note: The definitive version of this documentation, built from the latest, passing, version of the *develop* branch of
this project, is available [here](http://bas-style-kit-docs-stage.s3-website-eu-west-1.amazonaws.com/).

#### Distribution assets

The Continuous Deployment element of SemaphoreCI will also deploy distribution assets, i.e. the `dist` directory, to
the *production* environment of the BAS CDN [1] automatically. These resources are used by others in their own websites
and applications in order to use a particular version.

As with end-user documentation, these assets are generated from the *master* branch of the Project Repository,
providing it has passed the same tests. These processes are automatic.

[1] Note: This service should already exist and is out of the scope of this project. See the BAS CDN Project for more
information.

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
