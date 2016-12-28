# BAS Style Kit

Master: [![Build Status](https://semaphoreci.com/api/v1/antarctica/bas-style-kit/branches/master/badge.svg)](https://semaphoreci.com/antarctica/bas-style-kit)
Develop: [![build status](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit/badges/develop/build.svg)](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit/commits/develop)

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

End-user documentation for the BAS Style Kit, documenting what it includes, and how to use it to build websites and
web-applications is available at: [style-kit.web.bas.ac.uk](https://style-kit.web.bas.ac.uk).

**Note:** Production instances of this project are currently **NOT** supported.

## Overview

The BAS Style Kit is a CSS framework, incorportating the BAS brand, to establish a consistent visual design across
BAS services and websites. It aims to build-in best practice at a technical and accessibility level.

The Style Kit is based on the official Sass port of the [Bootstrap 3](http://getbootstrap.com) and consists of:

* BAS colour schemes and fonts
* customised version of the Bootstrap framework (using Sass variable overrides)
* custom variants of Bootstrap components
* additional components inspired by other frameworks or organisations

## Setup

**Note:** This section is outdated and should not be relied upon.

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

**Note:** This section is outdated and should not be relied upon.

To deploy changes to the staging environment:

1. commit project changes to project repository

Continuous Deployment will automatically detect these changes and deploy them into staging.

To deploy changes to a production environment:

1. commit project changes to project repository
2. `$ ansible-playbook app-deploy-production.yml`

## Developing

[Git](https://git-scm.com), [Docker](https://www.docker.com/products/docker) [1] and access to the private
[BAS Docker Registry](https://docker-registry.data.bas.ac.uk) [2] are required to build this project locally.

```shell
$ git clone -b develop https://bitbucket.org/antarctica/bas-style-kit.git
$ cd bas-style-kit

$ docker-compose up
```

This will bring up two docker containers. The first runs the `docker` gulp task automatically when changes are made to
files within `/assets`. The second hosts the test-bed using Nginx, available at [localhost:9000](http://localhost:9000).

When finished, exit the Docker Compose using `ctrl` + `c`, then run `docker-compose down`.

To run another gulp `[Task]`:

```shell
$ docker-compose run app gulp [Task]
```

**Note:** This will not start the testbed Nginx container.

[1] To install Git and Docker:

**On macOS**

```shell
$ brew install git
$ brew cask install docker
```

**On Windows**

* Install Docker and Git using their respective installers

[2] The first time you use this registry, you will need to authenticate using:
`docker login docker-registry.data.bas.ac.uk`

### Updating dependencies

If `package.json`, `.csscomb.json`, `.stylelintrc.yml` or `gulpfile.js` are changed, the project Docker image will need
to be rebuilt and pushed to the private BAS Docker Repository [1].

The current date is used as part of the project Docker image tag to ensure the latest version is used by all developers.
Before rebuilding this image you **MUST** update this tag value in `docker-compose.yml` and `.gitlab-ci.yml` first.

```shell
$ cd bas-style-kit/

$ docker-compose build app
$ docker-compose push app
```

[1] The first time you use this registry, you will need to authenticate using:
`docker login docker-registry.data.bas.ac.uk`

## Continuous Integration

The BAS GitLab instance is used for [Continuous Integration](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit/builds)
using settings defined in `.gitlab-ci.yml`, using these jobs and stages.

| Stage   | Job                | Trigger                             | Type      | Notes                                              |
| ------- | ------------------ | ----------------------------------- | --------- | -------------------------------------------------- |
| Build   | `compile-sass`     | Commits to the *develop* branch [1] | Automatic | See `gulpfile.js` for details of what is performed |
| Build   | `compile-sass-min` | Commits to the *develop* branch [1] | Automatic | See `gulpfile.js` for details of what is performed |
| Build   | `copy-fonts`       | Commits to the *develop* branch [1] | Automatic | See `gulpfile.js` for details of what is performed |
| Lint    | `lint-sass`        | `compile-sass` passes               | Automatic | See `gulpfile.js` for details of what is performed |

**Note:** Ensure you commit changes to the `develop` branch only.

[1] To commit to the develop branch, use the BAS GitLab remote [2]:

```shell
$ git add foo.bar
$ git commit -m "..."
$ git push bas-gl
```

[2] To add the BAS GitLab as a Git remote:

```shell
$ cd bas-style-kit/
$ git remote add bas-gl https://gitlab.data.bas.ac.uk/BSK/bas-style-kit.git
```

## Continuous Deployment

The BAS GitLab instance is used for [Continuous Deployment](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit/builds)
using settings defined in `.gitlab-ci.yml`, using these jobs and stages.

**Note:** Due to caching, deployed changes may not appear for up to 30 minutes.

| Stage   | Job                       | Trigger                                                     | Type      | Notes                              |
| ------- | ------------------------- | ----------------------------------------------------------- | --------- | ---------------------------------- |
| Package | `package-dist`            | `lint-sass` passes                                          | Automatic | -                                  |
| Deploy  | `s3-snapshot-development` | `package-dist` passes with a commit to the `develop` branch | Automatic | [1]                                |
[1] And then available from the *development* instance of the BAS Packages Service.

## Provisioning development environment

[Terraform](https://terrafrom.io) [1] and access to the
[BAS Packages Service](https://bitbucket.org/antarctica/bas-packages-service) and
[BAS CDN](https://bitbucket.org/antarctica/bas-cdn) projects are required to provision resources for this project [2].

Provisioned resources are defined in Terraform configuration files and arranged in multiple environments:

* `provisioning/site-all` - defines resources shared by all environments
* `provisioning/site-dev` - defines resources used by the development environment
Each environment is similar, but functions independently, except for the `site-all` environment, which all environments
depend on. The instructions below show how to configure the development environment, but they apply equally to all.

**Warning!** Take care before running `terraform apply` on the production environment. All substantial changes **MUST**
be tested in development first.

**Note:** As all environments depend on resources defined in the `site-all` environment, you **MUST** run provisioning
for this first.

```shell
$ cd provisioning/site-all
$ terraform plan
$ terraform apply

$ cd ../site-dev
$ terraform plan
$ terraform apply
```

During provisioning, an AWS IAM user will be created with least-privilege permissions to enable Continuous Deployment.
Access credentials for this user will need to generated manually through the AWS Console and set as secret variables.

See the `.gitlab-ci.yml` file for specifics on which user to generate credentials for, and what to name them.

**Note:** Commit all Terraform state files to this repository.

[1] https://www.terraform.io/downloads.html

[2] Contact the [BAS Web & Applications Team](mailto:webapps@bas.ac.uk) if you don't yet have access.

## Feedback

The maintainer of this project is BAS Web & Applications Team, they can be contacted at:
[webapps@bas.ac.uk](mailto:webapps@bas.ac.uk).

The issue tracker for this project is available at: https://trello.com/b/0Mhzizpk/bas-style-kit

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
