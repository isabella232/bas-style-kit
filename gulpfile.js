'use strict';
/*eslint-env node */

//
// Gulp task runner configuration
// --------------------------------------------------

// Setup
//

var        del = require('del'),
          path = require('path');

var        sri = require('gulp-sri'),
          gulp = require('gulp'),
          sass = require('gulp-sass'),
          nano = require('gulp-cssnano'),
          util = require('gulp-util'),
        rename = require('gulp-rename'),
       csscomb = require('gulp-csscomb'),
     styleLint = require('gulp-stylelint'),
    sourcemaps = require('gulp-sourcemaps'),
   runSequence = require('run-sequence'),
  autoprefixer = require('gulp-autoprefixer');


// Configuration
//

var config = {
  'sources': {
    'stylesheets': path.join('.', 'assets', 'stylesheets'),
    'bootstrap-sass': path.join('.', 'node_modules', 'bootstrap-sass'),
    'gill-sans': path.join('.', 'assets', 'webfonts', 'gill-sans'),
    'open-sans': path.join('.', 'node_modules', 'open-sans-fontface'),
    'font-awesome': path.join('.', 'node_modules', 'font-awesome'),
    'css': path.join('.', 'dist', 'css')
  },
  'destinations': {
    'dist': path.join('.', 'dist'),
    'css': path.join('.', 'css'),
    'fonts': path.join('.', 'fonts')
  },
  'modules': {
    'autoprefixer': {
      browsers: [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
      ],
      cascade: false,
      remove: true
    }
  }
};


// Atomic Tasks
//
// Do one thing and one thing only

// Sass compilation

gulp.task('atomic--compile-sass-bas-style-kit', function() {
  return gulp.src(path.join(config.sources.stylesheets, 'bas-style-kit.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('atomic--compile-sass-bootstrap-bsk', function() {
  return gulp.src(path.join(config.sources.stylesheets, 'bootstrap-bsk.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

// Auto-prefixing

gulp.task('atomic-autoprefix-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], function() {
  return gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic-autoprefix-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], function() {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// CSS comb

gulp.task('atomic-comb-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], function() {
  return gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic-comb-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], function() {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Minify CSS

gulp.task('atomic-minify-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], function() {
  return gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic-minify-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], function() {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// CSS source-maps
// As source-maps cannot be created from already minified files, this task technically does two things

gulp.task('atomic-sourcemaps-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], function() {
  return gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic-sourcemaps-bootstrap-bsk', ['atomic--compile-sass-bas-style-kit'], function() {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Web font copying

gulp.task('atomic--copy-webfont-gill-sans', function() {
  return gulp.src(
    [
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.eot'),
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.ttf'),
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.woff'),
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.woff2')
    ])
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'gill-sans')));
});

gulp.task('atomic--copy-webfont-open-sans', function() {
  return gulp.src(
    [
            path.join(config['sources']['open-sans'], 'fonts', '**/*.eot'),
            path.join(config['sources']['open-sans'], 'fonts', '**/*.ttf'),
            path.join(config['sources']['open-sans'], 'fonts', '**/*.woff'),
            path.join(config['sources']['open-sans'], 'fonts', '**/*.woff2')
    ])
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'open-sans')));
});

gulp.task('atomic--copy-webfont-font-awesome', function() {
  return gulp.src(
    [
      path.join(config['sources']['font-awesome'], 'fonts', '**/*.eot'),
      path.join(config['sources']['font-awesome'], 'fonts', '**/*.ttf'),
      path.join(config['sources']['font-awesome'], 'fonts', '**/*.woff'),
      path.join(config['sources']['font-awesome'], 'fonts', '**/*.woff2')
    ])
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'font-awesome')));
});

// Linting

gulp.task('atomic--lint-sass-bas-style-kit', function() {
  return gulp.src(path.join(config.sources.stylesheets, '**/*.scss'))
    .pipe(styleLint({
      syntax: 'scss',
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ]
    }));
});

// Sub-Resource Integrity (SRI)

gulp.task('atomic--sri-bas-style-kit-css', ['atomic--compile-sass-bas-style-kit'], function() {
  return gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(sri({
      'fileName': 'bas-style-kit.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bootstrap-bsk-css', ['atomic--compile-sass-bootstrap-bsk'], function() {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(sri({
      'fileName': 'bootstrap-bsk.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bas-style-kit-css-min', ['atomic-sourcemaps-bas-style-kit'], function() {
  return gulp.src(path.join(config.sources.css, 'bas-style-kit.min.css'))
    .pipe(sri({
      'fileName': 'bas-style-kit.min.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bootstrap-bsk-css-min', ['atomic-sourcemaps-bootstrap-bsk'], function() {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.min.css'))
    .pipe(sri({
      'fileName': 'bootstrap-bsk.min.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Cleaning

gulp.task('atomic--clean-dist', function() {
  return del([
      path.join(config.destinations.dist)
  ]);
});


// Compound Tasks
//

gulp.task('build--styles-bas-style-kit-no-min', function() {
    return gulp.src(path.join(config.sources.stylesheets, 'bas-style-kit.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('build--styles-bas-style-kit-min', function() {
    return gulp.src(path.join(config.sources.stylesheets, 'bas-style-kit.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(csscomb())
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('build--styles-bootstrap-bsk-no-min', function() {
    return gulp.src(path.join(config.sources.stylesheets, 'bootstrap-bsk.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('build--styles-bootstrap-bsk-min', function() {
    return gulp.src(path.join(config.sources.stylesheets, 'bootstrap-bsk.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(csscomb())
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

// This task assumes the respective CSS files have been created by other tasks
gulp.task('build--sri-combined', function() {
    return gulp.src([
      path.join(config.sources.css, 'bas-style-kit.css'),
      path.join(config.sources.css, 'bas-style-kit.min.css'),
      path.join(config.sources.css, 'bootstrap-bsk.css'),
      path.join(config.sources.css, 'bootstrap-bsk.min.css')
    ])
    .pipe(sri())
    .pipe(gulp.dest(path.join(config.destinations.dist)));
})

// High Level Tasks
//

gulp.task('styles', ['build--styles-bas-style-kit-no-min'], function() {
  util.log(util.colors.yellow('Note: \'bootstrap-bsk\' styles ' + util.colors.underline('are not') + ' (re)compiled, either:'));
  util.log(util.colors.yellow('- call \'gulp build-styles-bootstrap-bsk-no-min\' if you just want these styles as well'));
  util.log(util.colors.yellow('- call \'gulp release\' if want to build all compressed & uncompressed files for distribution'));
  util.log(util.colors.blue('Note: (Re)Compiled styles ' + util.colors.underline('are not') + ' compressed'));
});

gulp.task('styles-prod', ['build--styles-bas-style-kit-min'], function() {
  util.log(util.colors.yellow('Note: \'bootstrap-bsk\' styles ' + util.colors.underline('are not') + ' (re)compiled, either:'))
  util.log(util.colors.yellow('- call \'gulp build-styles-bootstrap-bsk-min\' if you just want these styles as well'));
  util.log(util.colors.yellow('- call \'gulp release\' if want to build all compressed & uncompressed files for distribution'));
  util.log(util.colors.blue('Note: (Re)Compiled styles ' + util.colors.underline('are') + ' compressed'))
});

gulp.task('clean', [
  'atomic--clean-dist'
], function() {});

gulp.task('fonts', [
  'atomic--copy-webfont-gill-sans',
  'atomic--copy-webfont-open-sans',
  'atomic--copy-webfont-font-awesome'
], function() {});

gulp.task('release', function() {
  runSequence(
    'clean',
    [
      'build--styles-bas-style-kit-no-min',
      'build--styles-bas-style-kit-min',
      'build--styles-bootstrap-bsk-no-min',
      'build--styles-bootstrap-bsk-min',
      'fonts'
    ],
    'build--sri-combined'
  );
});

gulp.task('lint', [
  'atomic--lint-sass-bas-style-kit'
], function() {});
