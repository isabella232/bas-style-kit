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
    zip          = require('gulp-zip'),
    sass         = require('gulp-sass'),
    data         = require('gulp-data'),
    rename       = require('gulp-rename'),
    through      = require('through2'),
    sassvars     = require('gulp-sass-variables'),
    cssprefixer  = require('gulp-class-prefix'),
    frontmatter  = require('front-matter-pug'),
    autoprefixer = require('gulp-autoprefixer');

const config = {
  'sources': {
    'source': path.join('.', 'src'),
    'stylesheets': path.join('.', 'src', 'assets', 'stylesheets'),
    'images': path.join('.', 'src', 'assets', 'images'),
    'samples': path.join('.', 'src', 'samples'),
    'public': path.join('.', 'public')
  },
  'destinations': {
    'root': path.join('.'),
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
      'prefix': 'app-'
    }
  }
};

var runtime = {
  'samples': [],
  'collections': {},
  'version': process.env.TESTBED_VERSION
}

// Task definitions
//
// Tasks build from specific to general. It's likely you will want to run the more generic tasks.

gulp.task('clean--css', cleanCss);
gulp.task('clean--img', cleanImg);
gulp.task('clean--samples', cleanSamples);
gulp.task('clean--public-archive', cleanPublicArchive);

gulp.task('build--css-testbed', buildCssTestbed);
gulp.task('build--individual-samples', buildSamples);
gulp.task('build--sample-redirects', buildSampleRedirects);
gulp.task('build--samples-index', buildSampleIndex);
gulp.task('build--legal-pages', buildLegalPages);

gulp.task('copy--img-testbed', copyImagesTestbed);

gulp.task('build--css', gulp.parallel(
  'build--css-testbed'
));
gulp.task('copy--img', gulp.parallel(
  'copy--img-testbed'
));

gulp.task('archive--public', archivePublic);

gulp.task('build--samples', gulp.series(
  'build--individual-samples',
  'build--sample-redirects',
  'build--samples-index',
  'build--legal-pages'
));

gulp.task('watch', watchBuild);

gulp.task('clean', gulp.parallel(
  'clean--css',
  'clean--img',
  'clean--samples',
  'clean--public-archive'
));
gulp.task('build', gulp.parallel(
  'build--css',
  'build--samples',
  'build--legal-pages'
));
gulp.task('copy', gulp.parallel(
  'copy--img'
));
gulp.task('archive', gulp.parallel(
  'archive--public'
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

function cleanPublicArchive(done) {
  del([
    path.join(config.destinations.root, 'bas-style-kit-testbed.zip')
  ]);
  done();
}

function buildCssTestbed(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.stylesheets, 'testbed.scss'),
        path.join(config.sources.stylesheets, 'testbed-samples.scss')
      ]),
      sassvars({
        '$testbed_version': runtime.version
      }),
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

        // Add testbed version as custom attribute
        content.attributes.testbed_version = runtime.version;

        // Add sample number from file name as custom attribute
        var fileName = file.basename.split('--');
        if (fileName.length != 2) {
          throw new Error('Sample file [' + fileName + '] does not fit the expected name format [1234--sample-name]');
        }
        if (!("sample" in content.attributes)) {
          content.attributes.sample = {}
        }
        content.attributes.sample.sample_number = fileName[0];

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

function buildSampleRedirects(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.samples, '*.pug')
      ]),
      data(function(file) {
        var attributes = {};

        // Add testbed version as custom attribute
        attributes.testbed_version = runtime.version;

        // Add sample file name without an extension as custom attribute for target in sample redirect file
        attributes.sample_file_name = file.basename.split('.')[0];

        // Add sample number from sample file name to name sample redirect file
        var fileName = file.basename.split('--');
        if (fileName.length != 2) {
          throw new Error('Sample file [' + fileName + '] does not fit the expected name format [1234--sample-name]');
        }
        attributes.sample_number = fileName[0];

        file.contents = new Buffer(`
          <!DOCTYPE html>
          <html lang="en-GB">
            <head>
              <meta charset="utf-8">
              <title>Redirecting&hellip;</title>
              <link rel="canonical" href="./${attributes.sample_file_name}.html">
              <meta http-equiv="refresh" content="0; url=./${attributes.sample_file_name}.html">
              <meta name="robots" content="noindex">
            </head>
            <body>
              <h1>Redirecting&hellip;</h1>
              <a href="./${attributes.sample_file_name}.html">Click here if you are not redirected.</a>
              <script>location="./${attributes.sample_file_name}.html"</script>
            </body>
          </html>`);

        return attributes;
      }),
      through.obj(function(file, enc, cb) {
        // Gulp rename doesn't allow accessing dynamic properties (i.e. from gulp-data) so we have to
        // manually manipulate the file object to rename it.
        //
        // source: https://github.com/hparra/gulp-rename/issues/54#issuecomment-131412099
        file.basename = file.data.sample_number + '.html';
        cb(null, file);
      }),
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
          'collections': runtime.collections,
          'testbed_version': runtime.version
        };
      }),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join(config.destinations.public))
    ],
    done
  );
}

function buildLegalPages(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.source, 'legal', '*.pug')
      ]),
      data(function(file) {
        return {
          'testbed_version': runtime.version
        };
      }),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join(config.destinations.public, 'legal'))
    ],
    done
  );
}

function copyImagesTestbed(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.images, '*.jpg'),
        path.join(config.sources.images, '*.png')
      ]),
      gulp.dest(path.join(config.destinations.assets, config.destinations.img))
    ],
    done
  );
}

function archivePublic(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.public, '**/*.*')
      ]),
      zip('bas-style-kit-testbed.zip'),
      gulp.dest(path.join(config.destinations.root))
    ],
    done
  );
}

function watchBuild(done) {
  gulp.watch(
    [
      path.join(config.sources.source, '**/*.*')
    ],
    gulp.parallel('build')
  );
  done();
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
