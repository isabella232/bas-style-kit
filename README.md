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

For example, to run all linting tasks:

```shell
$ docker-compose run app gulp lint
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

The BAS GitLab instance is used for [Continuous Integration](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit/pipelines)
using settings defined in `.gitlab-ci.yml`.

## Review apps

The BAS GitLab instance is used to provide [review apps](https://docs.gitlab.com/ce/ci/review_apps/) for merge requests
into the *master* branch. These review apps use the Testbed to approve any changes and ensure regressions are not
introduced.

Review apps are integrated within GitLab, using a set of conventional jobs and stages. GitLab will show links to the
relevant review app within each merge request. Settings for these jobs are defined in `.gitlab-ci.yml`.

## Continuous Deployment
## Provisioning

[Git](https://git-scm.com) and [Terraform](https://terrafrom.io) [1] are required to provision resources for this
project.

Access to the [BAS Packages Service](https://bitbucket.org/antarctica/bas-packages-service) and
[BAS CDN](https://bitbucket.org/antarctica/bas-cdn) projects is also required [2].

```shell
$ git clone https://gitlab.data.bas.ac.uk/BSK/bas-style-kit.git
$ cd bas-style-kit/provisioning/terraform

$ terraform plan
$ terraform apply
```

During provisioning, an AWS IAM user will be created with least-privilege permissions to enable access to resources
used by this project.

Access credentials for this user will need to generated manually through the AWS Console and set as secret variables.

See the `.gitlab-ci.yml` file for specifics on which user to generate credentials for, and what to name them.

**Note:** Commit all Terraform state files to this repository.

[1] To install Git and Terraform:

**On macOS**

```shell
$ brew install git
$ brew cask install terraform
```

**On Windows**

* Install Terraform and Git using their respective installers

[2] Contact the [BAS Web & Applications Team](mailto:webapps@bas.ac.uk) if you don't yet have access.


The BAS GitLab instance is used for [Continuous Deployment](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit/builds)
using settings defined in `.gitlab-ci.yml`.


**Note:** Due to caching, deployed changes may not appear for up to 30 minutes.
After deployment, the contents of the `dist` directory will be available through:

* the development instance of the BAS CDN for commits to the *master* branch
* the production instance of the BAS CDN for tagged commits





## Branching model

There is only one long-term branch in this repository, *master*, which represents a working, stable, version of the
project, but is not necessarily the released version.

All changes are made in other branches and merged into the Master branch when ready. Multiple branches may be active at
any one time, and **MUST** therefore be rebased on *master* before they are merged.

When required, a release is made using a release branch (see the *Release procedures* section for more information).
This is also merged with *master* and tagged. This triggers the relevant deployment tasks to release a new version.


See the `.gitlab-ci.yml` file for specifics on which user to generate credentials for, and what to name them.




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

Copyright 2017 NERC BAS.

Unless stated otherwise, all documentation is licensed under the Creative Commons Public License - version 3.
All code is licensed under the MIT license.

Copies of these licenses are included within this project.
