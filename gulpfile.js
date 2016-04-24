'use strict';
/*eslint-env node */

// Gulp task runner configuration

// Setup

var       path = require('path');

var       gulp = require('gulp'),
          sass = require('gulp-sass'),

// Configuration

var config = {
  'sources': {
    'stylesheets': path.join('.', 'assets', 'stylesheets'),
    'bootstrap-sass': path.join('.', 'node_modules', 'bootstrap-sass')
  },
  'destinations': {
    'dist': path.join('.', 'dist'),
    'css': path.join('.', 'css')
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
