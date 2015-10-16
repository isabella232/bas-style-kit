# BAS Style Kit - Developer documentation

## Fonts

The BAS Style Kit includes a number of web-fonts to provide typographic styling and icon-font libraries:

* [Open Sans](https://www.google.com/fonts/specimen/Open+Sans) - Base typographic font
* [Gill Sans](http://www.fonts.com/font/monotype/gill-sans) - Brand typographic font
* [Font Awesome](http://fontawesome.io) - Base icon-font for general purposes/actions in projects
* [Map Glyphs](http://mapglyphs.com) - Icon-font for states, countries, continents and globes
* [Devicons](http://vorillaz.github.io/devicons) - Icon-font for logos of technology frameworks, tools and services
* [Glyphicons Halflings](http://glyphicons.com/) - Icon-font included with Bootstrap, **NOT** supported here

Font file locations and font-family declarations are defined through the BAS Style Kit's Less/CSS styles.

### Gulp tasks

Note: See this project's documentation on [Gulp|../gulp.md] if you are unfamiliar with its use within this project.

`gulp fonts` is a high level task to copy fonts to their relevant locations.

Behind the scenes these tasks are called in parallel:
`gulp [fonts-opensans | fonts-gillsans | fonts-fontawesome | fonts-mapglyphs | fonts-devicons | fonts-glyphicons]`.

Individual font files can be copied if needed using:

* `gulp fonts-opensans` - For Open Sans
* `gulp fonts-gillsans` - For Gill Sans
* `gulp fonts-fontawesome` - For Font Awesome
* `gulp fonts-mapglyphs` - For Map Glyphs
* `gulp fonts-devicons` - For Devicons
* `gulp fonts-glyphicons` - For Glyphicons

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

### Glyphicons

Bootstrap includes a default icon web-font, Glyphicons Halflings.

Note: This font is deprecated and will be removed in the next release of the Style Kit.

This font is **NOT** supported within the BAS Style Kit and **SHOULD NOT** be used.
Font Awesome, or any of the other speciality icon fonts, **SHOULD** be used instead.

As Bootstrap uses Glyphicons by default, references it its web-font files are included in the pre-compiled CSS.
As we don't modify this CSS, it is not possible to remove such references. To avoid browser warnings over references to
these missing web-fonts they are copied into the `dist` directories of this project using `gulp fonts-glyphicons`.
This is not ideal as they are placed directly within the `fonts` directory, rather than in a name-spaced directory.

### Gulp tasks for icon font Jekyll data files

Note: See this project's documentation on [Gulp|../gulp.md] if you are unfamiliar with its use within this project.

To display the dizzying array of icons within icon fonts, a set of Gulp tasks are used to parse the icon classes into a
Jekyll data file. Where possible, icons are linked to the detail page on their respective provider's site.

`gulp jekyll-data` is a high level task to generated data files for all icon fonts.

Behind the scenes these tasks are called in parallel: `gulp [jekyll-data-fa | jekyll-data-mg | jekyll-data-di]`.

Individual font data files can be generated if needed using:

* `gulp jekyll-data-fa` - For Font Awesome
* `gulp jekyll-data-mg` - For Map Glyphs
* `gulp jekyll-data-di` - For Devicons

Note: There is no task for Glyphicons as this icon font is not supported by this project.
