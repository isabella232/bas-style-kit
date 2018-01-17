'use strict';
/*eslint-env node */

var fs   = require("fs"),
    del  = require('del'),
    path = require('path');

var gulp         = require('gulp'),
    pump         = require('pump'),
    log          = require('fancy-log'),
    map          = require('map-stream'),
    pug          = require('gulp-pug'),
    sass         = require('gulp-sass'),
    data         = require('gulp-data'),
    rename       = require('gulp-rename'),
    cssprefixer  = require('gulp-class-prefix'),
    frontmatter  = require('front-matter-pug'),
    autoprefixer = require('gulp-autoprefixer');

const config = {
  'sources': {
    'source': path.join('.', 'src'),
    'stylesheets': path.join('.', 'src', 'assets', 'stylesheets'),
    'images': path.join('.', 'src', 'assets', 'images'),
    'samples': path.join('.', 'src', 'samples')
  },
  'destinations': {
    'public': path.join('.', 'public'),
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
  'samples': [],
  'collections': {}
}

// Task definitions
//
// Tasks build from specific to general. It's likely you will want to run the more generic tasks.

gulp.task('clean--css', cleanCss);
gulp.task('clean--img', cleanImg);
gulp.task('clean--samples', cleanSamples);

gulp.task('build--css-testbed', buildCssTestbed);
gulp.task('build--samples', buildSamples);
gulp.task('build--samples-index', buildSampleIndex);

gulp.task('copy--img-testbed', copyImagesTestbed);

gulp.task('build--css', gulp.parallel(
  'build--css-testbed'
));
gulp.task('copy--img', gulp.parallel(
  'copy--img-testbed'
));

gulp.task('clean', gulp.parallel(
  'clean--css',
  'clean--img',
  'clean--samples'
));
gulp.task('build', gulp.parallel(
  'build--css',
  gulp.series(
    'build--samples',
    'build--samples-index'
  )
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

function cleanSamples(done) {
  del([
      path.join(config.destinations.samples)
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

function buildSamples(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.samples, '*.pug')
      ]),
      data(function(file) {
        var content = frontmatter(String(file.contents));
        file.contents = new Buffer(content.body);

        // Add sample number from file name as custom attribute
        var fileName = file.basename.split('--');
        if (fileName.length != 2) {
          throw new Error('Sample file [' + fileName + '] does not fit the expected name format [123--sample-name]');
        }
        if (!("sample" in content.attributes)) {
          content.attributes.sample = {}
        }
        content.attributes.sample.sample_number = fileName[0]

        return content.attributes;
      }),
      map(indexer),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join(config.destinations.samples))
    ],
    done
  );
}

function buildSampleIndex(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.source, 'index.pug')
      ]),
      data(function(file) {

        return {
          'samples': runtime.samples,
          'collections': runtime.collections
        };
      }),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join(config.destinations.public))
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


// Sample processing functions

var indexer = function indexer(file, cb) {
  if (!('sample' in file.data)) {
    throw new Error('Sample file [' + file.basename + '] does not have sample attribute and cannot be indexed');
  }

  // Index each sample's metadata
  runtime.samples.push(file.data.sample);

  // Add each sample to any collections it should belong too (specified by the sample)
  if ('collections' in file.data) {
    file.data.collections.forEach(function(collection) {
        if (!(collection in runtime.collections)) {
          runtime.collections[collection] = []
        }
        runtime.collections[collection].push(file.data.sample);
    });
  }

  cb(null, file);
}
