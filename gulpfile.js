// Node modules
var del = require('del');
var gulp = require('gulp');
var path = require('path');

// Gulp modules
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

// Variables
var sources = {
  'stylesheets': path.join('.', 'less')
};
var destinations = {
  'css': path.join('.', 'dist', 'css'),
  'docs': path.join('.', 'documentation', 'end-users')
};


// Atomic tasks - do only one thing

gulp.task('less', function() {
  return gulp.src(path.join(sources.stylesheets, 'bas-style-kit.less'))
    .pipe(sourcemaps.init())
    .pipe(less({
      strictMath: true
      // Less stylemaps are not supported by the gulp-less plugin, therefore gulp-sourcemaps is used
    }))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(destinations.css))
    .pipe(gulp.dest(path.join(destinations.docs, destinations.css)));
});
