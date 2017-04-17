# BAS Style Kit - Change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][unreleased]

### Added

* [Infrastructure] Significantly improving NPM support
* [Infrastructure] Documenting GitHub mirror

### Fixed

* [Infrastructure] Preventing review apps for tagged releases during CI
* [Infrastructure] Removing 'v' from version tags when publishing to the production CDN

### Changed

* [Infrastructure] Ignoring testbed sources from Git archives

## [0.2.0] - 2017-04-17

### Changed - BREAKING!

* [Infrastructure] Switching from Less to Sass preprocessor - compiled css remains compatible
* [Infrastructure] Gulp tasks heavily refactored
* [Infrastructure] Switching from 'develop/master' to 'master/tagged-master' branching model
* [Infrastructure] Semaphore CI/CD removed in favour of GitLab CI/CD
* [Infrastructure] Terraform environments removed in favour of a single set of configuration files

### Removed - BREAKING!

* [Infrastructure] Ansible provisioning removed
* [Style] Compiled CSS is no longer included in this project - download from the BAS CDN if this is needed
* [Documentation] Style Kit documentation is now maintained in an external project

### Added

* [Style] Page background and text colours are now explicitly listed as variables in this project (values are unchanged)
* [Infrastructure] Docker support using a project image and Docker compose
* [Infrastructure] Gulp tasks updated to support Docker workflow ('develop' task)
* [Infrastructure] Testbed added, using isolated samples to develop and preview styles
* [Infrastructure] SRI support for generated assets in a new 'process' CI stage

### Fixed

* [Style] Using brand images and text together were previously incompatible, a fix class address this
* [Style] Border radius on small/large form group inputs
* [Style] Padding on input group buttons to match height of inputs
* [Infrastructure] Wrong class name used for default buttons in testbed samples
* [Infrastructure] Language statistics in GitHub
* [Infrastructure] Names of BAS Package Service buckets
* [Infrastructure] Correcting name of `CHANGELOG.md` file

### Changed

* [Style] Font Awesome updated to 4.6
* [Style] Open-Sans web-font is now imported using its bundled Sass styles
* [Infrastructure] Using CSSNano instead of MinifyCSS to minify CSS styles
* [Infrastructure] README additions, improvements, refactoring and fixes
* [Infrastructure] Updating NPM modules
* [Infrastructure] Updating licensing file dates

### Removed

* [Infrastructure] Rsync related files, as these were never used as is now redundant due to Docker

## [0.1.0] - 2015-10-27

### Changed - BREAKING!

* [Styles] Linting tasks split out from other high level tasks to aid with split between CI and CD,
use `gulp lint` to run all linting tasks together
* [Documentation] URLs changed to meet WSF-1 (Hostnames and DNS records) standard
* [Documentation] A new method of hosting older documentation versions is used

### Added

* [Documentation] Jekyll plugin to show current revision in site footer if an environment variable is set
* [Infrastructure] Ansible Vault files and SSL certificates are now sourced from the BAS Credential Store project
* [Infrastructure] AWS CloudFront is added to the staging documentation static site, to support custom SSL
* [Infrastructure] Support for Continuous Integration and Continuous Deployment for production environments
* [Infrastructure] AWS S3 and CloudFront static website hosting used for production end-user documentation
* [Infrastructure] Continuous deployment added for copying distributed assets for each version to the BAS CDN

### Fixed

* [Documentation] CDN links in the basic template
* [Documentation] Repository URL links in the footer

### Changed

* [Styles] Less gulp tasks refactored to make them less repetitive, this also means they now rely on each other,
however if the `gulp less` task is run there should be no noticeable difference
* [Documentation] CDN links updated to new provider
* [Infrastructure] Developer documentation additions, improvements, refactoring and fixes
* [Infrastructure] README additions, improvements, refactoring and fixes - particularly environment requirements
* [Infrastructure] Jekyll Gem is now pinned to 2.5.3 to prevent version 3 being installed - this is a known issue

### Removed

* [Styles] Support for Glyphicons is now removed, having been previously deprecated
* [Infrastructure] Support for staging environments using DigitalOcean is removed, having been previously deprecated

## [0.1.0-beta] - 2015-10-16

### Changed - BREAKING!

* [Styles] Due to reaching the IE selector limit, it is now required to produce a customised Bootstrap build,
this will need to included wherever the Style Kit is used
* [Styles] The modified 24 column grid is removed in favour of the standard 12 column Bootstrap grid and optional
BSK 24 column grid. These grids can be used together (within rows, or nested), the 'extra large' breakpoint is
available in both grids
* [Infrastructure] AWS S3/Cloudfront backed CDN replaces Azure, CDN URLs have therefore changed

### Deprecated

* [Styles] Support for Glyphicons is deprecated in favour of Font Awesome, it will be removed in the next release
* [Infrastructure] Staging environments using DigitalOcean is deprecated in favour AWS S3 static website hosting

### Added

* [Styles] Gill Sans is now added for select elements (headings) and contexts (nav-bars) in line with the public
website and the BAS brand
* [Styles] The BAS brand colour is added as a Less variable for general use
* [Styles] Missing styles for BSK navbar variants
* [Infrastructure] Support for Continuous Integration and Continuous Deployment for staging environments
* [Infrastructure] AWS S3 static website hosting is now used for end-user documentation in the staging environment

### Fixed

* [Styles] Underlining in captions within inverted BSK thumbnails
* [Styles] Z-index for purchase symbol, now doesn't float over the top of navbars
* [Styles] Refining breakpoints for the image purchase component
* [Styles] Added additional styles for the extra-small breakpoint
* [Styles] WebStorm warnings about not implicitly referencing variables from other files in Less
* [Styles] Using `import (reference)` to import mixins rather than just `import`, this will have no noticeable effect
* [Documentation] Source download link updated to current release tag, not develop branch
* [Documentation] Corrected licensing text in the site footer

### Changed

* [Styles] Following feedback from Helpful Technology styles for tables, drop-downs and some colour variations updated
* [Styles] The BSK colour colour-scheme now includes the BAS brand colour, other blue shades are based off this colour
* [Styles] A border radius of 0 is now set to override the bootstrap default, the BSK specific variable has been removed
* [Styles] BSK buttons no longer have a border to match the style used on the public website
* [Styles] Light grey background added to BSK default buttons
* [Styles] Updating to Font Awesome 4.4
* [Styles] Rewriting footer breakpoints to be mobile first
* [Styles] Background of syntax highlighting sections in end-user documentation uses a shade of BSK grey shade
* [Styles] Proof of concepts for error pages have been moved to the scratch directory where they belong
* [Infrastructure] Significantly updating the developer documentation by refactoring sections from the README
* [Infrastructure] README additions, improvements, refactoring and fixes
* [Infrastructure] Jekyll variables are now set only in the main Jekyll `_config.yml` file

### Removed

* [Styles] `bsk-grey` and `bsk-grey-dark` have been removed from the BSK greyscale colour scheme
* [Styles] Unused variants of the OpenSans font family are removed to reduce download footprint
* [Styles] Support for SVG fonts is removed as all supported devices and browsers can use an alternative
* [Infrastructure] The `provisioned.yml` Jekyll data file is no longer needed (i.e. for provisioning)

## [0.1.0-alpha] - 2015-07-30

### Added

* Initial version - based on Bootstrap 3.3.5 and styles developed for the BAS Public Website