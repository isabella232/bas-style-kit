# BAS Style Kit - Developer documentation

## Less & CSS styles

### Less styles

As the BAS Style Kit is based on Bootstrap we use the same CSS preprocessor, [Less](http://lesscss.org/),
to ensure we can easily extend this framework to meet our needs without changing core Bootstrap features.

The BAS Style Kit does require a custom build of Bootstrap, as we need to change a number of Bootstrap variables [1].

This results in two key files:

* `less/bas-style-kit.less` - which is compiled to `dist/css/bas-style-kit.css` and to `dist/css/bas-style-kit.min.css`
* `less/bootstrap-bsk.less` - which is compiled to `dist/css/bootstrap-bsk.css` and to `dist/css/bootstrap-bsk.min.css`

Both these files **MUST** be included to use the Style Kit.

The Style Kit uses a similar structure and naming convention as to Bootstrap, his ensures any familiarity with
Bootstrap's structure can be reused within the BAS Style Kit, even if the styles themselves will be different.

E.g. if we extend Bootstrap's `grid.less` we will use create a `grid.less` with our customisations and additions.

If we need to modify a core bootstrap variable we will do this in our `variables.less` file,
we do not modify styles directly in Bootstrap.

All our Less files are located in the `less` directory, with `less/bas-style-kit.less` as the main entry point.
This is file simply imports other files that make up the BAS Style Kit styles. `variables.less` is the second most
important file, and likely where you may want to make changes. Various Bootstrap mixins are imported for our own
purposes and to avoid duplicating where we don't need to.

[1] Doing this within a single file generates too many classes for Internet Explorer 9 or below to process.

[2] Use this file instead of the standard Bootstrap css file. There is no benefit in including both the default and our
custom file.

### Gulp tasks

Note: See this project's documentation on [Gulp|../gulp.md] if you are unfamiliar with its use within this project.

`gulp less` is a high level task to perform Less compilation, processing and output of both minified and non-minified
CSS files.

Behind the scenes these tasks are called in parallel: `gulp [less-min | less-no-min]`.

`gulp less-no-min` is a compound task which will:

* Compile `less/bas-style-kit.less` and `less/bootstrap-bsk.less` into CSS
* Run compiled CSS through [autoprefixer](https://github.com/postcss/autoprefixer)
* Run compiled CSS through [csslint](http://csslint.net/) & [csscomb](http://csscomb.com/) - see *linting* for more
* Include [CSS source maps](http://blog.teamtreehouse.com/introduction-source-maps) for compiled CSS files
* Output compiled, processed CSS files and CSS maps to `dist/css` and `documentation/end-users/dist/css`

`gulp less-min` is a compound task which will, in addition to the steps performed in `gulp less-no-min`,:

* Minify the CSS using [clean-css](https://github.com/jakubpawlowicz/clean-css) and append a `.min` filename suffix
* Include [CSS source maps](http://blog.teamtreehouse.com/introduction-source-maps) for compiled minified CSS files
* Output compiled, minified CSS files and CSS maps to `dist/css` and `documentation/end-users/dist/css`

`gulp less-only` is an an alternative task which will:

* Compile `less/bas-style-kit.less` and `less/bootstrap-bsk.less` into CSS only

### CSS linting

Compiled CSS is ran through the same linting tools Bootstrap uses,
[csslint](http://csslint.net/) & [csscomb](http://csscomb.com/), and uses the same setting files (except where noted).

Errors are reported to the terminal.

#### Known errors

These errors are known and accepted for the reasons given here:

* `[GENERAL] Too many @font-face declarations (10). Too many different web fonts in the same stylesheet. (font-faces)`
  * This is caused by the large number of variants for the Open Sans web-font
  * Ideally a number of these variants can be dropped preventing this error
  * See [BASWEB-431](https://jira.ceh.ac.uk/browse/BASWEB-431) for details
