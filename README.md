# BAS Style Kit

Master: [![Build Status](https://semaphoreci.com/api/v1/projects/0f33c45e-b93f-4491-aa1a-eb4848653351/573094/badge.svg)](https://semaphoreci.com/antarctica/bas-style-kit)
Develop: [![Build Status](https://semaphoreci.com/api/v1/projects/0f33c45e-b93f-4491-aa1a-eb4848653351/569676/badge.svg)](https://semaphoreci.com/antarctica/bas-style-kit)

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

* More information about this project is available in
[documentation/project-management](documentation/project-management/index.md)
* Documentation for end users is stored in `documentation/end-users` and
[published online](https://style-kit.web.bas.ac.uk)
* Documentation for developers is available in [documentation/developers](documentation/developers/index.md)

This project is based on the BASIS project template (version 2).

## Requirements

You will need to have the following software or resources available depending on the environment you wish to use:

### All environments

* Mac OS X or Linux
* [Git](http://git-scm.com/) `brew install git` [1] [2]
* You have a [private key](https://help.github.com/articles/generating-ssh-keys/) `id_rsa`
and [public key](https://help.github.com/articles/generating-ssh-keys/) `id_rsa.pub` in `~/.ssh/`

[1] `brew` is a package manager for Mac OS X, see [here](http://brew.sh/) for details.

[2] Although these instructions uses `brew` and `brew cask` these are not required, 
binaries/packages can be installed manually if you wish.

### Development - local

To *setup* and *use* this environment:

* [VMware Fusion](http://vmware.com/fusion) `brew cask install vmware-fusion` [1] [2]
* [Vagrant](http://vagrantup.com) `brew cask install vagrant` [1] [2]
* Vagrant plugins:
    * [Vagrant VMware](http://www.vagrantup.com/vmware) `vagrant plugin install vagrant-vmware-fusion`
    * [Host manager](https://github.com/smdahlen/vagrant-hostmanager) `vagrant plugin install vagrant-hostmanager`
    * [Vagrant triggers](https://github.com/emyl/vagrant-triggers) `vagrant plugin install vagrant-triggers`
* [NMap](http://nmap.org/) `brew cask install nmap` [1] [2] [3]
* [Ansible](http://www.ansible.com) `brew install ansible` [4] [2]
* You have an entry like [5] in your `~/.ssh/config`
* You have a [self signed SSL certificate for local use](https://gist.github.com/felnne/25c220a03f8f39663a5d), with the
certificate assumed at, `app/provisioning/certificates/v.m/v.m.tls.crt`, and private key, `/etc/ssl/private/v.m.tls.key`

[1] `brew` is a package manager for Mac OS X, see [here](http://brew.sh/) for details.

[2] Although these instructions uses `brew` and `brew cask` these are not required, 
binaries/packages can be installed manually if you wish.

[3] `nmap` is needed to determine if you access internal resources (such as Stash).

[4] `brew cask` is a package manager for Mac OS X binaries, see [here](http://caskroom.io/) for details.

[5] SSH config entry

```shell
Host *.v.m
    ForwardAgent yes
    User app
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

### Staging - remote

To *setup* this environment:

* [Terraform](terraform.io) `brew cask install terraform` (minimum version: 6.0) [1] [2]
* Suitable permissions within AWS to manage S3 buckets and to manage CloudFront distributions [3]
* Suitable permissions within [SemaphoreCI](https://semaphoreci.com) to create projects under the *antarctica*
organisation [3]
* The `star.web.bas.ac.uk` SSL certificate is available within CloudFront [4]
* An environment variable `TF_VAR_aws_access_key` set to your AWS access key [5]
* An environment variable `TF_VAR_aws_secret_key` set to your AWS access secret [5]

To *use* this environment:

* Suitable permissions to push to the *develop* branch of the project repository [3]
* Suitable permissions within [SemaphoreCI](https://semaphoreci.com) to view projects under the *antarctica*
organisation [3]

[1] `brew cask` is a package manager for Mac OS X binaries, see [here](http://caskroom.io/) for details.

[2] Although these instructions uses `brew` and `brew cask` these are not required, 
binaries/packages can be installed manually if you wish.

[3] Please contact the *Project Maintainer* if you do not have these permissions.

[4] See the [BAS Credential Store](https://stash.ceh.ac.uk/projects/BASWEB/repos/porcupine/browse) for instructions.

[5] Specifically for a user account delegated from the BAS AWS account, use the
[IAM Console](https://console.aws.amazon.com/iam/home?region=eu-west-1) to generate access keys.

### Production - remote

To *setup* this environment:

* [Terraform](terraform.io) `brew cask install terraform` (minimum version: 6.0) [1] [2]
* Suitable permissions within AWS to manage S3 buckets and CloudFront distributions [3]
* Suitable permissions to upload to the BAS CDN [3]
* Suitable permissions within [SemaphoreCI](https://semaphoreci.com) to create projects under the *antarctica*
organisation [3]
* The `star.web.bas.ac.uk` SSL certificate is available within CloudFront [4]
* An environment variable `TF_VAR_aws_access_key` set to your AWS access key [5]
* An environment variable `TF_VAR_aws_secret_key` set to your AWS access secret [5]

To *use* this environment:

* Suitable permissions to push to the *master* branch of the project repository [3]
* Suitable permissions within [SemaphoreCI](https://semaphoreci.com) to view projects under the *antarctica*
organisation [3]

[1] `brew cask` is a package manager for Mac OS X binaries, see [here](http://caskroom.io/) for details.

[2] Although these instructions uses `brew` and `brew cask` these are not required, 
binaries/packages can be installed manually if you wish.

[3] Please contact the *Project Maintainer* if you do not have these permissions.

[4] See the [BAS Credential Store](https://stash.ceh.ac.uk/projects/BASWEB/repos/porcupine/browse) for instructions.

[5] Specifically for a user account delegated from the BAS AWS account, use the
[IAM Console](https://console.aws.amazon.com/iam/home?region=eu-west-1) to generate access keys.

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

| Name                   | Points To        | FQDN                         | Notes                       |
| ---------------------- | ---------------- | ---------------------------- | --------------------------- |
| bas-style-kit-dev-web1 | *computed value* | `bas-style-kit-dev-web1.v.m` | The VM's private IP address |

Note: Vagrant managed VMs also have a second, host-guest only, network for management purposes not documented here.

```shell
$ mkdir provisioning/certificates/v.m
$ cp /etc/ssl/certs/v.m.tls.crt provisioning/certificates/v.m/
$ cp /etc/ssl/private/v.m.tls.key provisioning/certificates/v.m/

$ ansible-playbook provisioning/site-dev.yml
```

### Staging - remote

Static website hosting is powered by AWS S3 / AWS CloudFront, managed using Terraform / manually, configured by Ansible
and deployed by SemaphoreCI.

#### Infrastructure

The AWS S3 bucket, and associated IAM users/policies to permit access, are managed by Terraform:

```shell
$ terraform get
$ terraform apply
```

Note: IAM access keys requires manual provisioning, as they would be stored in state files if managed by Terraform.

The CloudFront distribution, that sits on top of the S3 bucket to provide SSL, requires manual provisioning:

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

If not added already, create a new project in [SemaphoreCI](https://semaphoreci.com) using the `develop` branch of the
Project Repository and associate within the *antarctica* organisation.

If the project already exists, but not this branch, check the settings below are correct and add the *develop* branch
as a new build branch manually.

In the settings for this project set the *Build Settings* to:

* Language: *Python*
* Version: *2.7*

For the *Setup* thread enter these commands:

```shell
rm -f .rbenv-version .ruby-version
rbenv global 2.2
nvm use 4.2.1
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
```

For *Thread #1* rename to *Build and Test* with these commands:

```shell
ansible-playbook provisioning/test-ci.yml --connection=local
```

Set the *Branches* settings to:

* Build new branches: `Never`

Copy the build badge for the *develop* branch to this README.

If the project and branch already exists, check the settings above are correct.

#### Continuous Deployment

If not added already, create a deployment in [SemaphoreCI](https://semaphoreci.com) using the *AWS S3* strategy.

* Set the deployment strategy to: `Automatic`
* Set the branch to deploy to: `develop`
* Set the access credentials to [1], set the region to *Ireland (eu-west-1)*
* Set the directory to upload to `site`, set the build commands to [2]
* Set the S3 index document to `index.html`, set the S3 bucket to *bas-style-kit-docs-stage*
* Set the server name to: `Staging - Documentation`
* Set the server URL to: `https://style-kit-preview.web.bas.ac.uk/`

*DO NOT* run the deployment now, additional settings need to be changed first:

* Edit the new deployment
* Change the last deployment command to [3]

If the deployment already exists check the settings above are correct.

End-user documentation for this project can then be accessed from
[here](https://style-kit-preview.web.bas.ac.uk/).

[1] Use the [IAM Console](https://console.aws.amazon.com/iam/home?region=eu-west-1) to generate access keys for the
`semmaphore-deploy-bas-style-kit-felnne-docs-stage` IAM user. This user and associated policy are managed by Terraform.

[2]
```shell
rm -f .rbenv-version .ruby-version
rbenv global 2.2
nvm use 4.2.1
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
ansible-playbook provisioning/deploy-docs-stage-cd.yml --connection=local
```

[3]
```shell
aws s3 sync $S3_DIRECTORY s3://$S3_BUCKET_NAME/
```

### Production - remote

Static website hosting is powered by AWS S3 / AWS CloudFront, managed using Terraform / manually, configured by Ansible
and deployed by SemaphoreCI.

Distribution assets of each version are stored in the *production* environment of the BAS CDN, deployments to this CDN
are managed automatically by Semaphore.

#### Infrastructure

The AWS S3 bucket, and associated IAM users/policies to permit access, are managed by Terraform:

```shell
$ terraform get
$ terraform apply
```

Note: IAM access keys requires manual provisioning, as they would be stored in state files if managed by Terraform.

Note: Terraform will also create an IAM and suitable policy for accessing the relevant part of the BAS CDN.

The CloudFront distribution, that sits on top of the S3 bucket to provide SSL, requires manual provisioning:

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

Within the BAS CDN, ensure a top level directory `bas-style-kit` exists.

#### Continuous Integration

If not added already, create a new project in [SemaphoreCI](https://semaphoreci.com) using the `master` branch of the
Project Repository and associate within the *antarctica* organisation.

If the project already exists, but not this branch, check the settings below are correct and add the *master* branch
as a new build branch manually.

In the settings for this project set the *Build Settings* to:

* Language: *Python*
* Version: *2.7*

For the *Setup* thread enter these commands:

```shell
rm -f .rbenv-version .ruby-version
rbenv global 2.2
nvm use 4.2.1
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
```

For *Thread #1* rename to *Build and Test* with these commands:

```shell
ansible-playbook provisioning/site-test-ci.yml --connection=local
```

Set the *Branches* settings to:

* Build new branches: `Never`

Copy the build badge for the *master* branch to this README.

If the project and branch already exists, check the settings above are correct.

#### Continuous Deployment

##### End-user documentation

If not added already, create a deployment in [SemaphoreCI](https://semaphoreci.com) using the *AWS S3* strategy.

* Set the deployment strategy to: `Automatic`
* Set the branch to deploy to: `master`
* Set the access credentials to [1], set the region to *Ireland (eu-west-1)*
* Set the directory to upload to `site`, set the build commands to [2]
* Set the S3 index document to `index.html`, set the S3 bucket to *bas-style-kit-docs-prod*
* Set the server name to: `Production - Documentation`
* Set the server URL to: `https://style-kit.web.bas.ac.uk/`

*DO NOT* run the deployment now, additional settings need to be changed first:

* Edit the new deployment
* Change the last deployment command to [3]

If the deployment already exists check the settings above are correct.

End-user documentation for this project can then be accessed from
[here](https://style-kit.web.bas.ac.uk/).

[1] Use the [IAM Console](https://console.aws.amazon.com/iam/home?region=eu-west-1) to generate access keys for the
`semmaphore-deploy-bas-style-kit-felnne-docs-stage` IAM user. This user and associated policy are managed by Terraform.

[2]
```shell
rm -f .rbenv-version .ruby-version
rbenv global 2.2
nvm use 4.2.1
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
ansible-playbook provisioning/deploy-docs-prod-cd.yml --connection=local
```

[3]
```shell
aws s3 sync $S3_DIRECTORY s3://$S3_BUCKET_NAME/
```

##### Distribution assets

If not added already, create a deployment in [SemaphoreCI](https://semaphoreci.com) using the *AWS S3* strategy.

* Set the deployment strategy to: `Automatic`
* Set the branch to deploy to: `master`
* Set the access credentials to [1], set the region to *Ireland (eu-west-1)*
* Set the directory to upload to `dist`, set the build commands to [2]
* Set the S3 index document to `index.html`, set the S3 bucket to *bas-cdn-prod*
* Set the server name to: `Production - Assets`
* Do not set a server URL

*DO NOT* run the deployment now, additional settings need to be changed first:

* Edit the new deployment
* Remove the last deployment command

Note: This last command is removed because Ansible will perform the S3 sync, using the credentials set by Semaphore.
Assets need to be deployed to a versioned directory (e.g. /bas-style-kit/0.1.0/), in Semaphore there is no way to 
discover the project version. Using Ansible however, the `project_version` Ansible Variable can be used to ensure the 
correct directory is used.

If the deployment already exists check the settings above are correct.

[1] Use the [IAM Console](https://console.aws.amazon.com/iam/home?region=eu-west-1) to generate access keys for the
`semmaphore-deploy-bas-style-kit-felnne-docs-stage` IAM user. This user and associated policy are managed by Terraform.

[2]
```shell
rm -f .rbenv-version .ruby-version
rbenv global 2.2
nvm use 4.2.1
source provisioning/data/semaphore-ci/set-environment.sh
declare -x JEKYLL_ENV=$PROJECT_ENVIRONMENT
pip install ansible
ansible-playbook provisioning/deploy-assets-prod-cd.yml --connection=local
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

$ gulp lint

$ jekyll build
```

To automatically build whenever changes are made to source files:

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ jekyll build --watch --force_polling
```

A local build of the documentation will be available from
[bas-style-kit-dev-web1.v.m](http://bas-style-kit-dev-web1.v.m).

### Staging - remote

#### End-user documentation

Pushing to the `develop` branch will automatically trigger SemaphoreCI, passing builds will then be deployed to the
preview documentation site, using Semaphore's Continuous Deployment facilities.

The `JEKYLL_ENV` will be automatically set to `staging` to ensure the documentation is built in the correct way.

The latest version of this preview documentation will be available from
[style-kit-preview.web.bas.ac.uk](http://style-kit-preview.web.bas.ac.uk/).

### Production - remote

#### End-user documentation

Pushing to the `master` branch will automatically trigger SemaphoreCI, passing builds will then be deployed to the
documentation site, using Semaphore's Continuous Deployment facilities.

The `JEKYLL_ENV` will be automatically set to `production` to ensure the documentation is built in the correct way.

The latest, and definitive, version of this documentation will be available from
[style-kit.web.bas.ac.uk](http://style-kit.web.bas.ac.uk/).

#### Distribution assets

Pushing to the `master` branch will also automatically trigger SemaphoreCI to deploy distribution assets, i.e. the
`dist` directory, to the *production* environment of the BAS CDN [1]

[1] Note: This service should already exist and is out of the scope of this project. See the BAS CDN Project for more
information.

## Contributing

This project welcomes contributions, see `CONTRIBUTING` for our general policy.

## Releases

See the *developer* documentation for instructions on how to create and manage releases.

## Acknowledgements

The vast majority of this project is based on the amazing [Bootstrap](http://getbootstrap.com) project.

90% of any credit for this project should go to Boostrap's [authors and contributors](http://getbootstrap.com/about/).

The original Bootstrap licensing statement is shown below,
see their original `LICENSE-BOOTSTRAP-MIT` further licensing information.

> Code and documentation copyright 2011-2015 Twitter, Inc. Code released under
[the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE).
Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).

The authors of this project are incredibly grateful for their work.

## License

Copyright 2015 NERC BAS. Except where otherwise stated, Code is licensed under the MIT License, Documentation is
licensed under the Creative Commons Public License v3.0. See `LICENSE.md` for details.
