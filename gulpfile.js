// Node modules
var del = require('del');
var gulp = require('gulp');
var path = require('path');

// Gulp modules
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// Variables
var sources = {
  'stylesheets': path.join('.', 'less')
};
var destinations = {
  'css': path.join('.', 'dist', 'css'),
  'docs': path.join('.', 'documentation', 'end-users')
};
var configs = {
  less: {
    strictMath: true
    // Less stylemaps are not supported by the gulp-less plugin, therefore gulp-sourcemaps is used
  },
  autoprefixer: {
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
};


// Atomic tasks - do only one thing

gulp.task('less', function() {
  return gulp.src(path.join(sources.stylesheets, 'bas-style-kit.less'))
    .pipe(sourcemaps.init())
    .pipe(less(configs.less))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(destinations.css))
    .pipe(gulp.dest(path.join(destinations.docs, destinations.css)));
});

gulp.task('less-autoprefixer', function() {
  return gulp.src(path.join(sources.stylesheets, 'bas-style-kit.less'))
    .pipe(sourcemaps.init())
    .pipe(less(configs.less))
    .pipe(autoprefixer(configs.autoprefixer))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(destinations.css))
    .pipe(gulp.dest(path.join(destinations.docs, destinations.css)));
});
