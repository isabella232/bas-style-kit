# BAS Style Kit - Change Log

* All notable changes to this role will be documented in this file
* This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)

## [Unreleased][unreleased]

### Infrastructure

#### Fixed

* All environments requirements section
* Minor README instruction errors for copying development SSL certificates

## [0.1.0] - 2015-10-27

### Styles

#### Changed - BREAKING!

* Linting tasks split out from other high level tasks to aid with split between CI and CD, use `gulp lint` to run all
linting tasks together

#### Changed

* Less gulp tasks refactored to make them less repetitive, this also means they now rely on each other, however if the
`gulp less` task is run there should be no noticeable difference

#### Removed

* Support for Glyphicons is now removed, having been previously deprecated

### Documentation

#### Changed - BREAKING!

* In line with WSF-1 (Hostnames and DNS records) documentation for this project is now available from new URLs
* A new method of hosting older versions is used in the documentation site, the site root is now always the latest
version with a subdirectory holding copies of previous versions for reference - NOTE there are known issues with this

#### Added

* Jekyll plugin to read current revision from environment variable, if set, in staging environments, displayed in footer

#### Fixed

* CDN links in the basic template
* Repository URL links in the footer

#### Changed

* CDN links updated to new provider

### Infrastructure

#### Added

* Ansible Vault files and SSL certificates are now sourced from the BAS Credential Store project
* AWS CloudFront is added to the staging documentation static site, to support custom SSL
* Support for Continuous Integration and Continuous Deployment for production environments
* AWS S3 and CloudFront static website hosting is now used for end-user documentation in the production environment
* Support for Continuous deployment is added for copying distributed assets for each version to the BAS CDN

#### Changed

* Developer documentation additions, improvements, refactoring and fixes
* README additions, improvements, refactoring and fixes - particularly requirements for each environment
* Jekyll Gem is now pinned to 2.5.3 to prevent version 3 being installed - this is a known issue

#### Removed

* Support for staging environments using DigitalOcean is removed, having been previously deprecated

## [0.1.0-beta] - 2015-10-16

### Styles

#### Changed - BREAKING!

* Due to reaching the IE selector limit, it is now required to produce a customised Bootstrap build, this will need to
included wherever the Style Kit is used
* The modified 24 column grid is removed in favour of the standard 12 column Bootstrap grid and optional BSK 24 column
grid. These grids can be used together (within rows, or nested), the 'extra large' breakpoint is available in both grids

#### Deprecated

* Support for Glyphicons is deprecated in favour of Font Awesome, it will be removed in the next release

#### Added

* Gill Sans is now added for select elements (headings) and contexts (nav-bars) in line with the public website and the
BAS brand
* The BAS brand colour is added as a Less variable for general use
* Adding missing styles for BSK navbar variants

#### Fixed

* Fixed underlining in captions within inverted BSK thumbnails
* Fixing z-index for purchase symbol, now doesn't float over the top of navbars
* Refining breakpoints for the image purchase component
* Added additional styles for the extra-small breakpoint
* Fixing WebStorm warnings about not implicitly referencing variables from other files in Less
* Using `import (reference)` to import mixins rather than just `import`, this will have no noticeable effect

#### Changed

* Following feedback from Helpful Technology styles for tables, drop-downs and some colour variations have been made
* The BSK colour colour-scheme now includes the BAS brand colour, and other blue shades are based off this colour
* A border radius of 0 is now set to override the bootstrap default, the BSK specific variable has been removed
* BSK buttons no longer have a border to match the style used on the public website
* Light grey background added to BSK default buttons
* Updating to Font Awesome 4.4
* Rewriting footer breakpoints to be mobile first
* The background of syntax highlighting sections in the end-user documentation now uses a shade of grey from the BSK
greyscale colour scheme
* Proof of concepts for error pages have been moved to the scratch directory where they belong

#### Removed

* `bsk-grey` and `bsk-grey-dark` have been removed from the BSK greyscale colour scheme, there were not used so this is
not a breaking change. The Bootstrap greyscale colour scheme should be used where these variables were needed
* Unused variants of the OpenSans font family are removed to reduce download footprint, these variants were not used so
this change is non-breaking
* Support for SVG fonts is removed as all support devices and browsers can use an alternative, SVG fonts are very large
compared to other formats so were a priority to remove

### Documentation

#### Fixed

* Source download link updated to current release tag, not develop branch
* Corrected licensing text in the site footer

### Infrastructure

#### Changed - BREAKING!

* An AWS S3/Cloudfront backed CDN is now used which replaces Azure, CDN URLs have therefore changed and will need to be
updated

#### Deprecated

* Support for staging environments using DigitalOcean is deprecated in favour AWS S3 static website hosting, it will be
removed in the next release

#### Added

* Support for Continuous Integration and Continuous Deployment for staging environments. It is planned to add support
for production environments in the future
* AWS S3 static website hosting is now used for end-user documentation in the staging environment

#### Changed

* Significantly updating the developer documentation by refactoring sections from the README
* README additions, improvements, refactoring and fixes
* Variables contained in the `provisioned.yml` Jekyll data file are now set in the main Jekyll `_config.yml` file, this
will have no effect on uses of the BSK

#### Removed

* The `provisioned.yml` Jekyll data file is no longer needed (i.e. for provisioning) and its variables can be safely
kept in the main Jekyll `_config.yml` file instead

## [0.1.0-alpha] - 2015-07-30

### Added

* Initial version - based on Bootstrap 3.3.5 and styles developed for the BAS Public Website
