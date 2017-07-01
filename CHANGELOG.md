# BAS Style Kit - Change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][unreleased]

### Changed - BREAKING!

* [Styles] A common 'bsk-' prefix now applies to all class names, including variants and Bootstrap styles
* [Styles] Removing override for large media breakpoint visibility classes, use `-lg` rather than `lg-x`
* [Styles] Font face declarations are now compiled as a separate `fonts-bsk.css` file to avoid the common namespace
* [Styles] `bas-style-kit.css` now contains all styles (inc. fonts and Bootstrap) as a single file
* [Styles] `bas-style-kit.scss` renamed to `styles-bsk.scss` to fit with other files
* [Infrastructure] Gulp tasks for processing CSS styles have been refactored and updated
* [Styles] Minimum supported browser versions changed - I.E. 8 and 9 are no longer officially supported
* [Styles] Classes for the standard grid are now styled `bsk-col-12-{breakpoint}-{width}`
* [Styles] Classes for the alternative grid are now styled `bsk-col-24-{breakpoint}-{width}`
* [Styles] The terms 'standard' and 'alternative' grid are now deprecated and should no longer be used
* [Styles] Base font size increased from `14px` to `16px`
* [Infrastructure] Testbed styles are now compiled with other Style Kit styles with reference to variables etc.
* [Styles] Correctly using a border-colour for primary buttons
* [Styles] Image Purchase component replaced by new Image Copyright component
* [Styles] Jumbotron text overlay class generalised to an overlay class (`bsk-jumbotron-overlay`)

### Removed - BREAKING!

* [Infrastructure] Gulp watch tasks have been removed
* [Styles] 'navbar-brand-img-fix' class removed as it appears to be redundent

### Added

* [Styles] A new `styles-bsk.css` contains just those styles that were previously part of the `bas-style-kit.css`
* [Styles] Adding testbed sample for responsive tables
* [Styles] Override styles for responsive utilities - this is considered a bug
* [Infrastructure] Significantly improving NPM support
* [Infrastructure] Documenting GitHub mirror
* [Infrastructure] Gulp tasks for processing new fonts styles file
* [Infrastructure] Adding a permentant instance of the testbed through the testbed S3 bucket using the master branch
* [Infrastructure] Improve coverage of Jumbotron within the Testbed with additional samples
* [Infrastructure] Adding experiment heading class to Testbed classes
* [Styles] Adding GDS colour pallets

### Fixed

* [Styles] Adding support for input groups with input group buttons and dropdowns
* [Styles] Correcting visibility samples to correctly hide or show elements
* [Styles] Navbar styles for forms with buttons no longer sit lower than form elements
* [Infrastructure] Preventing review apps for tagged releases during CI
* [Infrastructure] Removing 'v' from version tags when publishing to the production CDN
* [Infrastructure] Correcting the name of some atomic Gulp tasks to make them consistent
* [Infrastructure] Correcting the name of the run sequence Gulp plugin to make it consistent
* [Infrastructure] Correcting dependent task for `atomic--sourcemaps-bootstrap-bsk` Gulp task
* [Infrastructure] Correcting conventional icons in test alert samples
* [Infrastructure] Making grid macros suitable for both grid sizes
* [Infrastructure] The 'greyscale' colours in Bootstrap use 'gray' not 'grey', this was incorrect in the Testbed
* [Styles] Colours for the inverse jumbotron now use standard inverse component variables
* [Styles] Rounded images are now correctly rounded
* [Infrastructure] Invalid class attribute in BAS Style Kit 'colour' colour scheme
* [Infrastructure] Adding fake favicon for testbed to remove browser warnings
* [Infrastructure] Setting testbed sample/collection titles as page/HTML title
* [Styles] Navbar border variable set to the correct value, previously used '$navbar-color' incorrectly

### Changed

* [Infrastructure] Ignoring testbed sources from Git archives
* [Infrastructure] Updating location of spell checking settings due to plugin update
* [Infrastructure] Minor README file updates and clarifications
* [Infrastructure] Minor testbed layout changes
* [Infrastructure] Minor testbed content changes
* [Infrastructure] Upgrading to NodeJS 8 and NPM 5
* [Infrastructure] Pinning 'Font Awesome' package to a specific version
* [Infrastructure] Upgrading NPM package dependencies
* [Styles] Upgrading to Bootstrap SASS 3.3.7

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
