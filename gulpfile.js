// Node modules
var del = require('del');
var gulp = require('gulp');
var path = require('path');

// Gulp modules
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

// Variables
var sources = {
    'stylesheets': path.join('.', 'less')
};
var destinations = {
    'css': path.join('.', 'dist', 'css')
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

// Compound tasks

/*
gulp.task('less', ['app-less', 'vendor-less']);
gulp.task('templates', ['app-handlebars-templates', 'app-handlebars-partials']);
gulp.task('copy-vendor', [
    'copy-bootstrap-less', 'copy-font-awesome-less', 'copy-font-awesome-fonts',
    'copy-bootstrap-vertical-tabs-css', 'copy-requirejs', 'copy-requirejs-domready',
    'copy-jquery',  'copy-jquery-map', 'copy-bootstrap-js', 'copy-handlebars',
    'copy-handlebars-swag', 'copy-match-height', 'copy-match-height', 'copy-enquire',
    'copy-store', 'copy-jqwidgets-js', 'copy-jqwidgets-locale-js', 'copy-jqwidgets-css'
]);
*/

/*
gulp.task('clean', function(cb) {

    return del([
        destinations.js,
        destinations.css,
        destinations.less,
        destinations.templates,
        destinations.partials,
        destinations.fonts,
        path.join('.', 'app', 'build')
    ], cb);
});
*/

/*
gulp.task('build', function(callback) {
    runSequence(
        'clean',
        'copy-vendor',
        ['less', 'templates'],
        callback
    );
});
*/

// Trigger task on file change
/*
gulp.task('watch', function() {
    gulp.watch(paths.stylesheets, ['app-less']);
    gulp.watch(paths.templates, ['app-handlebars-templates']);
    gulp.watch(paths.partials, ['app-handlebars-partials']);
});
*/
