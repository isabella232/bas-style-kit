# BAS Style Kit

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

End-user documentation for the BAS Style Kit, covering what it includes and how to use it is available at:
[style-kit.web.bas.ac.uk](https://style-kit.web.bas.ac.uk). This README covers how this project is developed.

## Overview

The BAS Style Kit is a CSS and JavaScript framework, incorporating the BAS brand to establish a consistent visual
design across BAS services and websites. It aims to build-in technical and accessibility best practice where practical.

The Style Kit is based on the official Sass port of [Bootstrap 3](http://getbootstrap.com) and consists of:

* BAS colour schemes and fonts
* customised version of the Bootstrap framework (using Sass variable overrides)
* custom variants of Bootstrap components
* additional components inspired by other frameworks or organisations

## Usage

These instructions show how to setup a development environment for the Style Kit.
See [style-kit.web.bas.ac.uk](https://style-kit.web.bas.ac.uk) for end-user documentation.

### Docker Compose

[Git](https://git-scm.com), [Docker](https://www.docker.com/community-edition) and Docker Compose [1] are required run
this project locally [2].

1. clone this project `git clone https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit.git`
2. change to the project root `cd bas-style-kit`
2. run `docker-compose up` [2]

This will create two containers:

1. an *app* instance running NodeJS to run gulp tasks, which generates the Style Kit CSS, JS and the *Testbed*
2. a *web* instance running Nginx for accessing the *Testbed* at [localhost:9000/testbed](http://localhost:9000/testbed).

See the *Gulp tasks* and *Testbed* sub-sections for more information.

[1]

To install Git and Docker:

**On macOS**

```shell
$ brew install git
$ brew cask install docker
```

**On Windows**

* Install Docker and Git using their respective installers

[2]

If you have access to the [BAS GitLab](https://gitlab.data.bas.ac.uk) instance, you will need to authenticate to use the
BAS private Docker registry initially:

```
docker login docker-registry.data.bas.ac.uk
```

Otherwise, you will need to build the image for this project locally:

```
$ docker-compose build app
```

[3]

If you don't have access to the [BAS GitLab](https://gitlab.data.bas.ac.uk) instance, you will need to clone from the
*GitHub mirror* instead using:

```
$ git clone https://github.com/antarctica/bas-style-kit.git
```

### Gulp tasks

The [Gulp](http://gulpjs.com/) task runner is used for tasks such as copying font files, compiling Sass to CSS
and generating the *Testbed*.

See `gulpfile.js` for tasks this project supports.

To run a gulp task `foo`:

```shell
$ docker-compose run app ./node_modules/gulp/bin/gulp.js foo
```

For example, to run all linting tasks:

```shell
$ docker-compose run app ./node_modules/gulp/bin/gulp.js lint
```

**Note:** This will run the *app* container only, it will not start the *web* container.

### SRI

[Sub-Resource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) is a
security feature using file hashing to prevent remote resources (for example, from a CDN) being poisoned.

A set of Gulp tasks are provided to compute these values for Style Kit assets, saved as a JSON file.

### Testbed

To aid developing styles within the Style Kit, a 'Testbed' is included. This contains a number of atomic 'samples',
written as [Nunjuck](https://mozilla.github.io/nunjucks/) templates, designed to demonstrate individual styles.

Where a logical grouping of samples exists, a 'collection' is defined containing those samples. For example ordered and
unordered lists are individual samples, but are both part of the *lists* collection. Samples can be, but typically are
not, part of multiple collections.

Samples are numbered, but these do not imply any order, and may not be congruous for a set of related styles.

E.g. Samples for lists may be samples *0001*, *0003*, *0030* and *0500* with gaps corresponding to unrelated samples,
or samples which have been removed. Collections are intended for creating curated sets of samples.

A Gulp task, `testbed`, is used to render the Testbed templates to HTML and generate the Style Kit's assets.

A hosted instance of the testbed for the *master* branch is available at:
[bas-style-kit-testbed.s3-website-eu-west-1.amazonaws.com/master/testbed/index.html](https://bas-style-kit-testbed.s3-website-eu-west-1.amazonaws.com/master/testbed/index.html).

## Developing

### CSS Styles

CSS styles within the Style Kit are written using [Sass](http://sass-lang.com/), a CSS preprocessor offering features
such as variables, mixins and intuitive nesting.

The Style Kit is distributed as a single CSS file, but is made up of multiple parts:

1. `assets/stylesheets/bootstrap-bsk.scss` - customised version of the Bootrstap 3 official Sass port
2. `assets/stylesheets/fonts-bsk.scss` - custom web-fonts used within the Style Kit
3. `assets/stylesheets/bas-style-kit.scss` - custom styles, components and variables that make up the Style Kit

Gulp is used to compile these styles into regular CSS, in one file. Additional tasks are used to:

* improve the compatibility of the generated CSS with older browsers, or for newer features requiring vendor prefixes
* add a global prefix, `bsk-` to all CSS classes to act as a namespace - i.e. `.foo` becomes `.bsk-foo`
* combine separate, layer specific, files into one, removing duplicate or superseded rules
* ordering properties within rules in a consistent order
* minifying styles to give compressed and non-compressed versions
* generating CSS source maps to allow compiled and transformed styles to be traced back to their source files
* copy fonts to the location in `dist/` expected by `fonts-bsk.scss`

Bootstrap and any fonts required are expressed as dependencies in `package.json` for when the Style Kit is used as a
Node package. The [BAS CDN](https://gitlab.data.bas.ac.uk/WSF/bas-cdn) hosts fonts and combined styles for use in the
browser.

#### Fix classes

In some cases workarounds are needed to cater for certain use-cases, for example when using a brand image and brand
text together in a navbar.

These classes are termed 'fix' classes within the Style Kit and use a conventional `fix-` prefix (`bsk-fix` with the
global prefix) for consistency. This convention **MUST** be used for all fix classes.

E.g. a class `.navbar-brand-img-txt` becomes `fix-navbar-brand-img-txt` or `bsk-fix-navbar-brand-img-txt` with the
Global Prefix applied.

**Note:** Fix classes are not considered bugs, as they are usually used for situations where there is no optimal
solution without either causing large amounts of duplication, or restricting users in how other classes/features can be
used.

#### Bootstrap overrides

In rare cases, core Bootstrap styles need to be overridden within the context of the BAS Style Kit. This only done where
the relevant Bootstrap styles cannot be overridden any other way, usually as a result of how rules take precedence.

Overriding a Bootstrap style requires taking a copy of the Bootstrap styles and changing them directly. Where changes
are made to these styles in Bootstrap, they will need to be 'back-ported' to our copy.

**Note:** This practice is considered a bug, see this
[issue](https://trello.com/c/YRhYrux6/128-remove-the-need-for-bootstrap-overrides) for more information.

### Images

The Style Kit includes images for:

* `assets/images/bas-logo` - the full BAS logo (roundel and text)
* `assets/images/bas-roundel` - the BAS roundel
* `assets/images/ogl-symbol` - the Open Government License (OGL) symbol

Gulp is used to copy these images into `dist/`.

#### Image formats

By convention, all images should use the PNG format and extension (`.png`).

### JavaScript

The Style Kit is distributed as a single JS file, but is made up of multiple parts:

1. `assets/javascripts/bootstrap-overrides/*.js` - customised versions of Bootrstap 3 plugins
2. `assets/javascripts/bas-style-kit/*.js` - custom plugins for use with the Style Kit

Gulp is used to combine these scripts into one file. Additional tasks are used to:

* minifying scripts to give compressed and non-compressed versions

#### JavaScript dependencies

jQuery is a dependency of all JavaScript plugins. Some plugins depend on other external scripts for specific
functionality, such as managing cookies or auto-complete inputs.

These dependencies are expressed in `package.json` for when the Style Kit is used as a Node package, and the
[BAS CDN](https://gitlab.data.bas.ac.uk/WSF/bas-cdn) when used directly in a browser.

**Note:** This project uses [Yarn](https://yarnpkg.com/lang/en/) instead of
[NPM](https://docs.npmjs.com/getting-started/what-is-npm) for installing dependencies within the `app` Docker image.
This still uses the NPM package registry.

### Design resources

Some extra resources, such as colour charts, used to help design the Style Kit are included in `resources/`.

To edit these resources you will need to install these fonts locally:

* [Open Sans](https://fonts.google.com/specimen/Open+Sans)

### Updating dependencies

If `package.json`, `.csscomb.json`, `.stylelintrc.yml`, `.eslintrc.yml` or `gulpfile.js` are changed, the project Docker
image will need to be rebuilt and pushed to the private BAS Docker Repository [1].

```shell
$ cd bas-style-kit/

$ docker-compose build app
$ docker-compose push app
```

During each *alpha* release dependencies should be updated to their latest versions and conflicts resolved.

* the `app` Docker image should use the latest Node LTS release (as don't rely on cutting edge Node features)
* JavaScript dependencies should be updated to their latest versions (using `package.json`)
* this includes Bootstrap and any web-fonts used (i.e. Font Awesome)

Dependencies listed in `package.json` can be checked using tools such as
[Daivd-DM](https://david-dm.org/antarctica/bas-style-kit?type=dev) to identify outdated versions.

[1] The first time you use this registry, you will need to authenticate using:
`docker login docker-registry.data.bas.ac.uk`

## Testing

### Integration tests

Linting is used to ensure Sass styles and JavaScript follow a set of standard conventions. They will be executed
automatically through *Continuous Integration*:

* [StyleLint](https://stylelint.io) is used for checking Sass styles
* [ESlint](https://eslint.org) is used for checking JavaScript styles

To run tests manually run the `lint` Gulp task.

### Continuous Integration

The BAS GitLab instance is used for
[Continuous Integration](https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit/pipelines) using settings defined in
`.gitlab-ci.yml`.

### Review Apps

The BAS GitLab instance is used to provide [Review Apps](https://docs.gitlab.com/ce/ci/review_apps/) for merge requests
into the *master* branch. These review apps use the *Testbed* to review changes and prevent regressions.

Review Apps use a set of conventional jobs and stages, settings for these jobs are defined in `.gitlab-ci.yml`. GitLab
will show links to Review App instances within each merge request.

## Provisioning

[Git](https://git-scm.com), [Terraform](https://terrafrom.io) [1] and permissions to the
[BAS AWS](https://gitlab.data.bas.ac.uk/WSF/bas-aws) environment are required to provision resources for this project.

```shell
$ git clone https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit.git
$ cd bas-style-kit/provisioning/terraform

$ terraform plan
$ terraform apply
```

During provisioning, an AWS IAM user will be created with least-privilege permissions to enable access to resources
used by this project.

Access credentials for this user will need to generated manually through the AWS Console and set as secret variables
within GitLab. See the `.gitlab-ci.yml` file for specifics on how to do this.

**Note:** Commit all Terraform state files to this repository.

[1] To install Git and Terraform:

**On macOS**

```shell
$ brew install git
$ brew cask install terraform
```

**On Windows**

* Install Terraform and Git using their respective installers

## Continuous Deployment

The BAS GitLab instance is used for
[Continuous Deployment](https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit/pipelines) using settings defined in
`.gitlab-ci.yml`.

Deployment tasks can be triggered manually for any tagged commits to:

* deploy the contents of `/dist` to the [BAS CDN](https://gitlab.data.bas.ac.uk/WSF/bas-cdn)
* deploy a Zip archive of `/dist` to the [BAS Packages Service](https://gitlab.data.bas.ac.uk/WSF/bas-packages)

**Note:** Due to caching, deployed changes may not appear for up to 1 hour.

## Issue tracking

This project uses a public [issue tracker](https://trello.com/b/0Mhzizpk/bas-style-kit).

## Branching model

There is only one long-term branch in this repository, *master*, which represents a working, stable, version of the
project, but is not necessarily the released version.

All changes are made in feature branches, merged into the Master branch when ready. Multiple branches may be active at
any one time, and **MUST** therefore be rebased on *master* before they are merged.

As needed, releases are made using a release branch (see the *Release procedures* section for more information).
This is then merged with *master* and tagged, allowing *Continuous Deployment* tasks to be ran.

## GitHub mirror

A read-only mirror of this project's repository is maintained on GitHub, to allow use by those outside of BAS.

Merge requests **WILL NOT** be accepted on this mirror.

## Release procedures

1. create a release branch
2. remove `-develop` from version string in:
    * `package.json`
    * `docker-compose.yml` - `app` Docker image
    * `.gitlab-ci.yml` - default Docker image
3. build & push the docker image
4. close release in `CHANGELOG.md`
5. merge release branch with master and tag with version
6. copy SRI values into the Style Kit Documentation project [1]
7. re-publish NPM package
8. push commits and tags to GitHub mirror

[1]

This is currently a manual process described in the relevant
[project documentation](https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit-docs/README.md).

### Publishing NPM package

```shell
$ docker-compose run app ash
$ gulp release
$ npm login
$ npm publish
```

To preview the contents of the NPM package:

```shell
$ docker-compose run app ash
$ gulp release
$ npm pack
```

**Note:** This project includes a `.npmignore` file to exclude additional files from NPM packages.

### After release

1. bump version, and add `-develop` prefix to version string in:
    * `package.json`
    * `docker-compose.yml` - `app` Docker image
    * `.gitlab-ci.yml` - default Docker image
2. build & push the docker image

This is to guard against updating the Docker image for a released version.

## Feedback

The maintainer of this project is the BAS Web & Applications Team, they can be contacted at:
[webapps@bas.ac.uk](mailto:webapps@bas.ac.uk).

## Acknowledgements

The vast majority of this project is based on the [Bootstrap](http://getbootstrap.com) project.

90% of any credit for this project should go to Boostrap's [authors and contributors](http://getbootstrap.com/about/).

The original Bootstrap licensing statement is shown below,
see their original `LICENSE-BOOTSTRAP-MIT` for further licensing information.

> Code and documentation copyright 2011-2015 Twitter, Inc. Code released under
[the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE).
Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).

The authors of this project are incredibly grateful for their work.

## Licence

Copyright 2018 NERC BAS.

Unless stated otherwise, all documentation is licensed under the Creative Commons Public License - version 3.
All code is licensed under the MIT license.

Copies of these licenses are included within this project.
