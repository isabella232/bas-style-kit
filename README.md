# BAS Style Kit

Master: [![Build Status](https://semaphoreci.com/api/v1/antarctica/bas-style-kit/branches/master/badge.svg)](https://semaphoreci.com/antarctica/bas-style-kit)
Develop: [![Build Status](https://semaphoreci.com/api/v1/antarctica/bas-style-kit/branches/develop/badge.svg)](https://semaphoreci.com/antarctica/bas-style-kit)

[![Node dependencies status](https://david-dm.org/antarctica/bas-style-kit.svg)](https://david-dm.org/antarctica/bas-style-kit)

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

Documentation for this project is available at: [style-kit.web.bas.ac.uk](https://style-kit.web.bas.ac.uk).

**This project uses version 0.1.0 of the Base flavour of the BAS Base Project - Pristine**.

**Note:** Production instances of this project are currently **NOT** supported.

## Overview

* the BAS Style Kit is a CSS framework, written in Sass, with a number of JavaScript components
* it is based on Bootstrap 3 and consists of:
    * a customised version of the Bootstrap framework (using variable overrides)
    * a series of additional styles which extend Boostrap components with custom variants
    * a series of additional styles which define entirely new components based on other CSS frameworks or to suit 
    BAS specific needs
* the Style Kit implements the BAS brand through the use of specific colour schemes and fonts
* documentation on how to use this project is maintained in a separate project, 
[BAS Style Kit Docs](https://stash.ceh.ac.uk/projects/BSK/repos/bas-style-kit-docs/browse) [1]
* pre-compiled CSS, JavaScript and WebFont assets are hosted on the BAS CDN for improved availability

[1] If external a read-only mirror of this repository can be found on 
[GitHub](https://github.com/antarctica/bas-style-kit-docs).

## Setup

To bring up a local development environment:

1. ensure you meet all the
[requirements](https://paper.dropbox.com/doc/BAS-Base-Project-Pristine-Base-Flavour-Usage-ZdMdHHzf8xB4HjxcNuDXa#:h=Environment---local-developmen)
to bring up a local development environment
2. checkout this project locally `$ git clone ssh://git@stash.ceh.ac.uk:7999/bsk/bas-style-kit.git`
3. `$ cd bas-style-kit/provisioning/site-development-local`
4. `$ vagrant up`
5. `$ cd ..` (back to *provisioning*)
6. `$ ansible-playbook site-development-local.yml`
7. `$ cd ..` (back to *bas-style-kit-docs*)

To bring up the staging environment:

1. ensure you meet all the 
[requirements](https://paper.dropbox.com/doc/BAS-Base-Project-Pristine-Base-Flavour-Usage-ZdMdHHzf8xB4HjxcNuDXa#:h2=Environment---staging-(static-)
to bring up a staging environment for static websites [1]
2. checkout this project locally `$ git clone ssh://git@stash.ceh.ac.uk:7999/bsk/bas-style-kit.git`
3. `$ cd bas-style-kit/provisioning/site-staging`
4. `$ terraform plan`
5. `$ terraform apply`
6. `$ cd ../..` (back to *provisioning*)
7. commit Terraform state to project repository
8. if not already added, create a new project in [SemaphoreCI](https://semaphoreci.com/) using the *develop* branch of 
the Project Repository and associate with the *antarctica* organisation
9. if the project already exists, but not this branch, check the settings below are correct and add the *develop* branch
as a new build branch manually
10. in the settings for this project set the *Build Settings* to:
    * Language: *JavaScript*
    * Version: *node.js 5.8.0*
11. for the *setup* thread enter these commands: [2]
12. for *Thread #1* rename to *Lint* with these commands: [3]
13. set the Branches settings to:
    * Build new branches: `Never`
14. Once the initial Continuous Integration build is complete, and is successful, retrieve AWS IAM access credentials 
for the `semmaphore-deploy-bas-style-kit-stage-semaphore-cd` user
15. Add a new deployment server:
    * Kind: AWS S3
    * Strategy: Automatic
    * Branch: Develop
    * Credentials: [as per retrieved credentials]
    * Region: Ireland (eu-west-1)
    * Directory to upload: *dist*
    * Build commands: [4]
    * S3 Index Document: *index.html*
    * S3 Bucket: *bas-cdn-dev*
    * Server name: Staging
    * Server URL: Leave blank
16. Prior to the first deployment, edit the created server to edit the final build command as follows [5]

[1] Note: This project does not use a static website, but the software, services and credentials required are the same.

[2]
```shell
npm install -g gulp@^3.9
npm install
gulp clean
```

[3]
```shell
gulp lint
```

[4]
```shell
PROJECT_VERSION=$(node -p -e "require('/home/runner/bas-style-kit/package.json').version")
npm install -g gulp@^3.9
npm install
gulp clean
gulp release
aws s3 sync ./dist-archive s3://bas-packages-dev/zip/bas-style-kit/$PROJECT_VERSION/ --acl=public-read --delete
```

[5] For the line starting: `aws s3 sync $S3_DIRECTORY`

```shell
aws s3 sync $S3_DIRECTORY s3://$S3_BUCKET_NAME/bas-style-kit/$PROJECT_VERSION/ --acl=public-read --delete
```

To bring up the production environment:

1. ensure you meet all the
[requirements](https://paper.dropbox.com/doc/BAS-Base-Project-Pristine-Base-Flavour-Usage-ZdMdHHzf8xB4HjxcNuDXa#:h=Environment---production)
to bring up a production environment
2. checkout this project locally `$ git clone ssh://git@stash.ceh.ac.uk:7999/bsk/bas-style-kit.git`
3. `$ cd bas-style-kit/provisioning/site-production`
4. `$ terraform plan`
5. `$ terraform apply`
6. `$ cd ..`
7. `$ ansible-playbook site-production.yml`
8. commit Terraform state to project repository

## Usage

To deploy changes to a local development environment:

* no action is needed as the project is mounted within the local virtual machine

To run task runner commands within a local development environment:

1. `$ cd site-development-local`
2. `$ vagrant ssh`
3. `$ cd /srv/apps/bas-style-kit`
4. `$ gulp [task]`

Where `[task]` is the task runner command to execute, e.g. `gulp release`.

To view changes to styles using a set of bundled templates within a local development environment:

1. `$ cd site-development-local`
2. `$ vagrant ssh`
3. `$ cd /srv/apps/bas-style-kit`
4. `$ http-server -p 9000`

Visit: [bas-style-kit-dev-node1.v.m](http://bas-style-kit-dev-node1.v.m/http) to see a the index of examples.

To deploy changes to the staging environment:

1. commit project changes to project repository

Continuous Deployment will automatically detect these changes and deploy them into staging.

To deploy changes to a production environment:

1. commit project changes to project repository
2. `$ ansible-playbook app-deploy-production.yml`

## Developing

### Version control

This project uses version control. The project repository is located at:
`ssh://git@stash.ceh.ac.uk:7999/bsk/bas-style-kit.git`

Write access to this repository is restricted. Contact the project maintainer to request access.

A read-only mirror of this repository is maintained on GitHub, located at:
`https://github.com/antarctica/bas-style-kit.git`

### Tests

This project uses manual and automated testing.

## Feedback

The maintainer of this project is BAS Web & Applications Team, they can be contacted at: webapps@bas.ac.uk.

This uses issue tracking for feedback. The project issue tracker is located at:
`https://jira.ceh.ac.uk/BSK`

## Acknowledgements

The vast majority of this project is based on the [Bootstrap](http://getbootstrap.com) project.

90% of any credit for this project should go to Boostrap's [authors and contributors](http://getbootstrap.com/about/).

The original Bootstrap licensing statement is shown below,
see their original `LICENSE-BOOTSTRAP-MIT` further licensing information.

> Code and documentation copyright 2011-2015 Twitter, Inc. Code released under
[the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE).
Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).

The authors of this project are incredibly grateful for their work.

## Licence

Copyright 2016 NERC BAS.

Unless stated otherwise, all documentation is licensed under the Creative Commons Public License - version 3.
All code is licensed under the MIT license.

Copies of these licenses are included within this project.
