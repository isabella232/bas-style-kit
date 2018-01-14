'use strict';
/*eslint-env node */

var fs   = require("fs"),
    del  = require('del'),
    path = require('path');

var gulp         = require('gulp'),
    pump         = require('pump'),
    log          = require('fancy-log'),
    map          = require('map-stream'),
    sass         = require('gulp-sass'),
    data         = require('gulp-data'),
    cssprefixer  = require('gulp-class-prefix'),
    frontmatter  = require('front-matter'),
    autoprefixer = require('gulp-autoprefixer');

const config = {
  'sources': {
    'stylesheets': path.join('.', 'src', 'assets', 'stylesheets'),
    'images': path.join('.', 'src', 'assets', 'images'),
    'samples': path.join('.', 'src', 'samples')
  },
  'destinations': {
    'assets': path.join('.', 'public', 'assets'),
    'css': path.join('css'),
    'img': path.join('img'),
    'samples': path.join('.', 'public', 's')
  },
  'modules': {
    'autoprefixer': {
      browsers: [
        "Android >= 4.4",
        "Chrome >= 45",
        "Firefox >= 38",
        "Explorer >= 11",
        'Edge >= 12',
        "iOS >= 9",
        "Opera >= 30",
        "Safari >= 9"
      ],
      cascade: false,
      remove: true
    },
    'cssprefixer': {
      'prefix': 'bsk-tb-'
    }
  }
};

var runtime = {
  'samples': []
}

// Task definitions
//
// Tasks build from specific to general. It's likely you will want to run the more generic tasks.

gulp.task('clean--css', cleanCss);
gulp.task('clean--img', cleanImg);

gulp.task('build--css-testbed', buildCssTestbed);

gulp.task('copy--img-testbed', copyImagesTestbed);

gulp.task('index--samples', indexSamples);

gulp.task('build--css', gulp.parallel(
  'build--css-testbed'
));
gulp.task('copy--img', gulp.parallel(
  'copy--img-testbed'
));

gulp.task('clean', gulp.parallel(
  'clean--css',
  'clean--img',
));
gulp.task('build', gulp.parallel(
  'build--css'
));
gulp.task('copy', gulp.parallel(
  'copy--img'
));


// Tasks

function cleanCss(done) {
  del([
      path.join(config.destinations.assets, config.destinations.css)
  ]);
  done();
}

function cleanImg(done) {
  del([
      path.join(config.destinations.assets, config.destinations.img)
  ]);
  done();
}

function buildCssTestbed(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.stylesheets, 'testbed-bsk.scss')
      ]),
      sass().on('error', sass.logError),
      cssprefixer(config.modules.cssprefixer.prefix),
      autoprefixer(config.modules.autoprefixer),
      gulp.dest(path.join(config.destinations.assets, config.destinations.css))
    ],
    done
  );
}

function copyImagesTestbed(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.images, '*.jpg')
      ]),
      gulp.dest(path.join(config.destinations.assets, config.destinations.img))
    ],
    done
  );
}

function indexSamples(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.samples, '*.pug')
      ]),
      data(function(file) {
        var content = frontmatter(String(file.contents));
        file.contents = new Buffer(content.body);

        // Get sample number as custom attribute
        var fileName = file.basename.split('--');
        if (fileName.length != 2) {
          throw new Error('Sample file [' + fileName + '] does not fit the expected name format');
        }
        content.attributes['sample_number'] = fileName[0]

        return content.attributes;
      }),
      map(indexer)
    ],
    done
  );
}


// Custom functions for processing samples

var indexer = function indexer(file, cb) {
  runtime.samples.push(file.data);

  // Debug
  // console.log(file.path);
  // console.log(file.data);
  console.log(runtime.samples);

  cb(null, file);
}
