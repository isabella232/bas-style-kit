# BAS Style Kit - Change Log

* All notable changes to this role will be documented in this file
* This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)
* A [change log](https://jira.ceh.ac.uk/browse/BSK/?selectedTab=com.atlassian.jira.jira-projects-plugin:changelog-panel)
of Jira issues by version is automatically maintained.

## [Unreleased][unreleased]

## [0.1.0-beta] - 2015-10-16

## Changed - BREAKING!

* Due to reaching the IE selector limit, it is now required to produce a customised Bootstrap build, this will need to
included wherever the Style Kit is used
* The modified 24 column grid is removed in favour of the standard 12 column Bootstrap grid and optional BSK 24 column
grid. These grids can be used together (within rows, or nested), the 'extra large' breakpoint is available in both grids
* An AWS S3/Cloudfront backed CDN is now used which replaces Azure, CDN URLs have therefore changed and will need to be
updated

## Deprecated

* Support for staging environments using DigitalOcean is deprecated in favour AWS S3 static website hosting, it will be
removed in the next release
* Support for Glyphicons is deprecated in favour of Font Awesome, it will be removed in the next release

## Added

* Gill Sans is now added for select elements (headings) and contexts (nav-bars) in line with the public website and the
BAS brand
* The BAS brand colour is added as a Less variable for general use
* Support for Continuous Integration and Continuous Deployment for staging environments. It is planned to add support
for production environments in the future
* AWS S3 static website hosting is now used for end-user documentation in the staging environment
* Adding missing styles for BSK navbar variants

## Fixed

* Source download link updated to current release tag, not develop branch
* Correct licensing text in the site footer
* Fixed underlining in captions within inverted BSK thumbnails
* Fixing z-index for purchase symbol, now doesn't float over the top of navbars
* Refining breakpoints for the image purchase component
* Added additional styles for the extra-small breakpoint
* Fixing WebStorm warnings about not implicitly referencing variables from other files in Less
* Using `import (reference)` to import mixins rather than just `import`, this will have no noticeable effect

## Changed

* Following feedback from Helpful Technology styles for tables, drop-downs and some colour variations have been made
* The BSK colour colour-scheme now includes the BAS brand colour, and other blue shades are based off this colour
* A border radius of 0 is now set to override the bootstrap default, the BSK specific variable has been removed
* BSK buttons no longer have a border to match the style used on the public website
* Light grey background added to BSK default buttons
* Updating to Font Awesome 4.4
* Rewriting footer breakpoints to be mobile first
* Significantly updating the developer documentation by refactoring sections from the README
* README additions, improvements, refactoring and fixes
* Variables contained in the `provisioned.yml` Jekyll data file are now set in the main Jekyll `_config.yml` file, this
will have no effect on uses of the BSK
* The background of syntax highlighting sections in the end-user documentation now uses a shade of grey from the BSK
greyscale colour scheme
* Proof of concepts for error pages have been moved to the scratch directory where they belong

## Removed

* `bsk-grey` and `bsk-grey-dark` have been removed from the BSK greyscale colour scheme, there were not used so this is
not a breaking change. The Bootstrap greyscale colour scheme should be used where these variables were needed
* Unused variants of the OpenSans font family are removed to reduce download footprint, these variants were not used so
this change is non-breaking
* Support for SVG fonts is removed as all support devices and browsers can use an alternative, SVG fonts are very large
compared to other formats so were a priority to remove
* The `provisioned.yml` Jekyll data file is no longer needed (i.e. for provisioning) and its variables can be safely
kept in the main Jekyll `_config.yml` file instead

## [0.1.0-alpha] - 2015-07-30

### Added

* Initial version
