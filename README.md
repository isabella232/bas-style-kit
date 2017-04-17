# BAS Style Kit

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

End-user documentation for the BAS Style Kit, documenting what it includes, and how to use it to build websites and
web-applications is available at: [style-kit.web.bas.ac.uk](https://style-kit.web.bas.ac.uk).

## Overview

The BAS Style Kit is a CSS framework, incorporating the BAS brand, to establish a consistent visual design across
BAS services and websites. It aims to build-in best practice at a technical and accessibility level.

The Style Kit is based on the official Sass port of the [Bootstrap 3](http://getbootstrap.com) and consists of:

* BAS colour schemes and fonts
* customised version of the Bootstrap framework (using Sass variable overrides)
* custom variants of Bootstrap components
* additional components inspired by other frameworks or organisations

## Usage

End-user documentation for the BAS Style Kit, documenting what it includes, and how to use it to build websites and
web-applications is available at: [style-kit.web.bas.ac.uk](https://style-kit.web.bas.ac.uk).

### Docker Compose

1. `docker-compose up`

This will create two containers:

1. A NodeJS instance running the `docker` gulp task, which generates the Style Kit and the Testbed
2. A Nginx instance exposing the generated Style Kit and Testbed

The Testbed will be exposed on your local machine at: `http://localhost:9000/testbed`

See the *Gulp* and *Testbed* sub-sections for more information.

### Gulp tasks

[Gulp](http://gulpjs.com/) is a NodeJS task runner, used for tasks such as copying font files, compiling Sass to CSS
and generating the Testbed.

See `gulpfile.js` for tasks this project supports.

To run a gulp task `foo`:

```shell
$ docker-compose run app gulp foo
```

For example, to run all linting tasks:

```shell
$ docker-compose run app gulp lint
```

**Note:** This will run the NodeJS container only, it will not start the Nginx container.

### SRI

[Sub-Resource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) is a
security feature that enables browsers to verify that files they fetch (for example, from a CDN) are delivered without
unexpected manipulation. It works by allowing you to provide a cryptographic hash that a fetched file must match.

A set of Gulp tasks are provided to compute these values for Style Kit assets, saved as a JSON file.

During deployment of tagged releases, this file will need to be copied into the
[Documentation project](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit-docs) for users to reference.

This is currently a manual process described in the relevant
[README](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit-docs/blob/master/README.md).

### Testbed

To aid developing styles within the Style Kit a 'Testbed' is included. This contains a number of atomic 'samples',
written as [Nunjuck](https://mozilla.github.io/nunjucks/) templates, designed to demonstrate individual styles.

Where a logical grouping of samples exists, a 'collection' is defined containing those samples. For example ordered and
unordered lists are individual samples, but are both within the *lists* collection.

Samples are numbered, but these have no implied ordering, and may not be congruous for a set of related styles.

E.g. Lists may be samples *0001*, *0003*, *0030* and *0500* with gaps corresponding to unrelated samples, or samples
which have been removed. Collections are intended as the way to create curated sets of samples.

A Gulp task, `testbed`, is used to render the Testbed templates to HTML and generate the Style Kit's assets in one
command.

## Developing

[Git](https://git-scm.com) and [Docker](https://www.docker.com/products/docker) [1] are required to build this project
locally.

To update the Docker image for this project, access to the private
[BAS Docker Registry](https://docker-registry.data.bas.ac.uk) [2] is also required.

```shell
$ git clone https://gitlab.data.bas.ac.uk/BSK/bas-style-kit.git
$ cd bas-style-kit

$ docker-compose up
```

**Note:** If you don't have access to the BAS Private Docker Registry, you will need to build the project Docker image
locally first using `docker-compose build`.

See the *Usage* section for how to use this project.

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

The current project version is used as part of the project Docker image tag to ensure the latest version is used by all
developers. Before rebuilding this image you **MUST** update this tag value in `docker-compose.yml` and `.gitlab-ci.yml`
first.

```shell
$ cd bas-style-kit/

$ docker-compose build app
$ docker-compose push app
```

[1] The first time you use this registry, you will need to authenticate using:
`docker login docker-registry.data.bas.ac.uk`

## Testing

### Integration tests

Integration tests are used for all endpoints in this project, ideally with all their possible failure modes.

To run tests manually run the `lint` Gulp task.

### Continuous Integration

The BAS GitLab instance is used for [Continuous Integration](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit/pipelines)
using settings defined in `.gitlab-ci.yml`.

### Review apps

The BAS GitLab instance is used to provide [review apps](https://docs.gitlab.com/ce/ci/review_apps/) for merge requests
into the *master* branch. These review apps use the Testbed to approve any changes and ensure regressions are not
introduced.

Review apps are integrated within GitLab, using a set of conventional jobs and stages. GitLab will show links to the
relevant review app within each merge request. Settings for these jobs are defined in `.gitlab-ci.yml`.

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

## Deployment

The BAS GitLab instance is used for [Continuous Deployment](https://gitlab.data.bas.ac.uk/BSK/bas-style-kit/builds)
using settings defined in `.gitlab-ci.yml`.

Deployments are currently triggered manually, but are automated once started.

After deployment, the contents of the `dist` directory will be available through:

* the development instance of the BAS CDN for commits to the *master* branch
* the production instance of the BAS CDN for tagged commits

**Note:** Due to caching, deployed changes may not appear for up to 1 hour.

## Issue tracking

This project uses issue tracking, see the [issue tracker](https://trello.com/b/0Mhzizpk/bas-style-kit) for more
information.

**Note:** Write access to this issue tracker is restricted. Contact the project maintainer to request access.

## Branching model

There is only one long-term branch in this repository, *master*, which represents a working, stable, version of the
project, but is not necessarily the released version.

All changes are made in other branches and merged into the Master branch when ready. Multiple branches may be active at
any one time, and **MUST** therefore be rebased on *master* before they are merged.

When required, a release is made using a release branch (see the *Release procedures* section for more information).
This is also merged with *master* and tagged. This triggers the relevant deployment tasks to release a new version.

## Release procedures

1. create a release branch
2. remove `-develop` from version string in:
    * `package.json`
    * `docker-compose.yml` - `app` Docker image
    * `.gitlab-ci.yml` - default Docker image
3. build & push the docker image
4. close release in `CHANGELOG.md`
5. merge release branch with master and tag with version
6. copy SRI values into the Style Kit Documentation project

### After release

1. bump version, and add `-develop` prefix to version string in:
    * `package.json`
    * `docker-compose.yml` - `app` Docker image
    * `.gitlab-ci.yml` - default Docker image
2. build & push the docker image

This is to guard against updating the Docker image for a released version.

## Feedback

The maintainer of this project is the BAS Web & Applications Team, they can be contacted at: webapps@bas.ac.uk.

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
