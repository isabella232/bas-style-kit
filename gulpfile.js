'use strict';
/*eslint-env node */

// Gulp task runner configuration

// Setup

var       path = require('path');

var       gulp = require('gulp'),
          sass = require('gulp-sass'),
     styleLint = require('gulp-stylelint'),

// Configuration

var config = {
  'sources': {
    'stylesheets': path.join('.', 'assets', 'stylesheets'),
    'bootstrap-sass': path.join('.', 'node_modules', 'bootstrap-sass'),
    'gill-sans': path.join('.', 'assets', 'webfonts', 'gill-sans'),
    'open-sans': path.join('.', 'node_modules', 'open-sans-fontface'),
    'font-awesome': path.join('.', 'node_modules', 'font-awesome')
  },
  'destinations': {
    'dist': path.join('.', 'dist'),
    'css': path.join('.', 'css'),
    'fonts': path.join('.', 'fonts')
  }
};

// Atomic Tasks

gulp.task('atomic-compile-bas-style-kit', function() {
  return gulp.src(path.join(config.sources.stylesheets, 'bas-style-kit.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('atomic-compile-bootstrap-bsk', function() {
  return gulp.src(path.join(config.sources.stylesheets, 'bootstrap-bsk.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

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
            path.join(config['sources']['open-sans'], 'fonts', '**/*.woff2'),
      '!' + path.join(config['sources']['open-sans'], 'fonts', 'ExtraBold*/*.*'),
      '!' + path.join(config['sources']['open-sans'], 'fonts', 'Semibold*/*.*')
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

