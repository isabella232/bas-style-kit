# BAS Style Kit - Developer documentation

## Fonts

The BAS Style Kit includes a number of web-fonts to provide typographic styling and icon-font libraries:

* [Open Sans](https://www.google.com/fonts/specimen/Open+Sans) - Base typographic font
* [Gill Sans](http://www.fonts.com/font/monotype/gill-sans) - Brand typographic font
* [Font Awesome](http://fontawesome.io) - Base icon-font for general purposes/actions in projects
* [Map Glyphs](http://mapglyphs.com) - Icon-font for states, countries, continents and globes
* [Devicons](http://vorillaz.github.io/devicons) - Icon-font for logos of technology frameworks, tools and services

Font file locations and font-family declarations are defined through the BAS Style Kit's Less/CSS styles.

### Gulp tasks

Note: See this project's documentation on [Gulp|../gulp.md] if you are unfamiliar with its use within this project.

`fonts` is a high level task to copy fonts to their relevant locations.

Behind the scenes these tasks are called in parallel:
`[fonts-opensans | fonts-gillsans | fonts-fontawesome | fonts-mapglyphs | fonts-devicons]`.

Individual font files can be copied if needed using:

* `fonts-opensans` - For Open Sans
* `fonts-gillsans` - For Gill Sans
* `fonts-fontawesome` - For Font Awesome
* `fonts-mapglyphs` - For Map Glyphs
* `fonts-devicons` - For Devicons

### Gill Sans

Gill Sans is the BAS brand font and is used in the BAS logo. It requires a license for use and therefore not
distributed publicly

BAS pays for a subscription to use this font within BAS projects, subject to a limit of 250,000 page views within a 30
day rolling period. This limit applies across all websites and applications that use fonts under the BAS subscription.

This font subscription is with [Fonts.com](https://wwww.fonts.com) and is paid for by the BAS Communications Team.
If we would like access to this subscription or have questions related to licensing, please create use the information
in the *Issue Tracker* section of the Project Management documentation.

### Map Glyphs

Map Glyphs is not distributed publicly and requires a license for attribution free usage.

BAS has paid for attribution free usage when used in official projects and bundles the font within the Style Kit.

### Gulp tasks for icon font Jekyll data files

Note: See this project's documentation on [Gulp|../gulp.md] if you are unfamiliar with its use within this project.

To display the dizzying array of icons within icon fonts, a set of Gulp tasks are used to parse the icon classes into a
Jekyll data file. Where possible, icons are linked to the detail page on their respective provider's site.

`jekyll-data` is a high level task to generated data files for all icon fonts.

Behind the scenes these tasks are called in parallel: `[jekyll-data-fa | jekyll-data-mg | jekyll-data-di]`.

Individual font data files can be generated if needed using:

* `jekyll-data-fa` - For Font Awesome
* `jekyll-data-mg` - For Map Glyphs
* `jekyll-data-di` - For Devicons
