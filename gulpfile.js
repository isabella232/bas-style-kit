'use strict';
/*eslint-env node */

var         fs = require("fs"),
           del = require('del'),
          path = require('path');

var        sri = require('gulp-sri'),
           zip = require('gulp-zip'),
          base = require('gulp-base'),
          gulp = require('gulp'),
          sass = require('gulp-sass'),
          nano = require('gulp-cssnano'),
          util = require('gulp-util'),
         watch = require('gulp-watch'),
        rename = require('gulp-rename'),
       csscomb = require('gulp-csscomb'),
       pkginfo = require('pkginfo')(module, 'version'),
      nunjucks = require('gulp-nunjucks'),
     styleLint = require('gulp-stylelint'),
    sourcemaps = require('gulp-sourcemaps'),
   runSequence = require('run-sequence'),
  autoprefixer = require('gulp-autoprefixer');

const config = {
  'sources': {
    'stylesheets': path.join('.', 'assets', 'stylesheets'),
    'bootstrap-sass': path.join('.', 'node_modules', 'bootstrap-sass'),
    'gill-sans': path.join('.', 'assets', 'webfonts', 'gill-sans'),
    'open-sans': path.join('.', 'node_modules', 'open-sans-fontface'),
    'font-awesome': path.join('.', 'node_modules', 'font-awesome'),
    'dist': path.join('.', 'dist'),
    'css': path.join('.', 'dist', 'css'),
    'testbed': path.join('.', 'testbed')
  },
  'destinations': {
    'dist': path.join('.', 'dist'),
    'distArchive': path.join('.', 'dist-archive'),
    'css': path.join('.', 'css'),
    'fonts': path.join('.', 'fonts'),
    'testbed': path.join('.', 'testbed', 'rendered')
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

// Data generation functions
// --------------------------------------------------

function getTestbedCollectionsMetadata(collectionsPath, dataStructure) {
  var collectionFiles = fs.readdirSync(collectionsPath);
  var collectionsArray = collectionFiles.map((collection) => {
    // Make [name.ext] into [name]
    var collectionName = collection.split('.')[0];

    var collection = {
      'name': collectionName
    }
    return collection;
  });

  if (dataStructure == 'array') {
    return collectionsArray;
  } else {
    return undefined;
  }
};
function getTestbedSamplesMetadata(samplesPath, dataStructure) {
  var sampleFiles = fs.readdirSync(samplesPath);
  var samplesById = {};
  var samplesArray = sampleFiles.map((sample) => {
    // Split 0000-name.ext into [0000, name.ext]
    var sampleSplit = sample.split('--');
    if (sampleSplit.length != 2) {
      util.log(util.colors.red('Sample file [' + sample + '] could not be processed because it doesn\'t fit the expected name format'));
      return sample;
    }

    // Make [name.ext] into [name]
    sampleSplit[1] = sampleSplit[1].split('.')[0];

    var sample = {
      'id': sampleSplit[0],
      'name': sampleSplit[1]
    }
    samplesById[sample['id']] = sample;
    return sample;
  });

  if (dataStructure == 'array') {
    return samplesArray;
  } else if (dataStructure == 'objectById') {
    return samplesById;
  } else {
    return undefined;
  }
};

// Atomic Tasks
// Do one thing and one thing only
// --------------------------------------------------

// Sass compilation

gulp.task('atomic--compile-sass-bas-style-kit', () => {
  gulp.src(path.join(config.sources.stylesheets, 'bas-style-kit.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('atomic--compile-sass-bootstrap-bsk', () => {
  gulp.src(path.join(config.sources.stylesheets, 'bootstrap-bsk.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

// Auto-prefixing

gulp.task('atomic-autoprefix-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], () => {
  gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic-autoprefix-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], () => {
  gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// CSS comb

gulp.task('atomic-comb-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], () => {
  gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic-comb-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], () => {
  gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Minify CSS

gulp.task('atomic-minify-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], () => {
  gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic-minify-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], () => {
  gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// CSS source-maps
// As source-maps cannot be created from already minified files, this task technically does two things

gulp.task('atomic-sourcemaps-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], () => {
  gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic-sourcemaps-bootstrap-bsk', ['atomic--compile-sass-bas-style-kit'], () => {
  gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Web font copying

gulp.task('atomic--copy-webfont-gill-sans', () => {
  gulp.src(
    [
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.eot'),
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.ttf'),
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.woff'),
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.woff2')
    ])
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'gill-sans')));
});

gulp.task('atomic--copy-webfont-open-sans', () => {
  gulp.src(
    [
            path.join(config['sources']['open-sans'], 'fonts', '**/*.eot'),
            path.join(config['sources']['open-sans'], 'fonts', '**/*.ttf'),
            path.join(config['sources']['open-sans'], 'fonts', '**/*.woff'),
            path.join(config['sources']['open-sans'], 'fonts', '**/*.woff2')
    ])
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'open-sans')));
});

gulp.task('atomic--copy-webfont-font-awesome', () => {
  gulp.src(
    [
      path.join(config['sources']['font-awesome'], 'fonts', '**/*.eot'),
      path.join(config['sources']['font-awesome'], 'fonts', '**/*.ttf'),
      path.join(config['sources']['font-awesome'], 'fonts', '**/*.woff'),
      path.join(config['sources']['font-awesome'], 'fonts', '**/*.woff2')
    ])
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'font-awesome')));
});

gulp.task('atomic--copy-templates-assets', () => {
  return gulp.src(path.join(config['sources']['testbed'], 'assets', '**/*.*'))
    .pipe(gulp.dest(path.join(config.destinations.testbed, 'testbed-assets')));
});

// Linting

gulp.task('atomic--lint-sass-bas-style-kit', () => {
  gulp.src(path.join(config.sources.stylesheets, '**/*.scss'))
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

gulp.task('atomic--sri-bas-style-kit-css', ['atomic--compile-sass-bas-style-kit'], () => {
  gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    .pipe(sri({
      'fileName': 'bas-style-kit.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bootstrap-bsk-css', ['atomic--compile-sass-bootstrap-bsk'], () => {
  gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(sri({
      'fileName': 'bootstrap-bsk.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bas-style-kit-css-min', ['atomic-sourcemaps-bas-style-kit'], () => {
  gulp.src(path.join(config.sources.css, 'bas-style-kit.min.css'))
    .pipe(sri({
      'fileName': 'bas-style-kit.min.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bootstrap-bsk-css-min', ['atomic-sourcemaps-bootstrap-bsk'], () => {
  gulp.src(path.join(config.sources.css, 'bootstrap-bsk.min.css'))
    .pipe(sri({
      'fileName': 'bootstrap-bsk.min.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Archiving

gulp.task('atomic--archive-dist', () => {
  gulp.src(path.join(config.sources.dist, '**/*.*'))
    .pipe(zip('bas-style-kit-' + module.exports.version + '.zip'))
    .pipe(gulp.dest(path.join(config.destinations.distArchive)))
});

// Cleaning

gulp.task('atomic--clean-dist', () => {
  del([
      path.join(config.destinations.dist, '**/*')
  ]);
});

gulp.task('atomic--clean-templates', () => {
  return del([
    path.join(config.destinations.testbed, '**/*')
  ]);
});

gulp.task('atomic--clean-dist-archive', () => {
  del([
      path.join(config.destinations.distArchive)
  ]);
});

// Template compilation

gulp.task('atomic--compile-testbed-samples', () => {
  return gulp.src(path.join(config.sources.testbed, 'samples', '*.njk'))
    .pipe(base(path.join(config.sources.testbed)))
    .pipe(nunjucks.compile())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(path.join(config.destinations.testbed)));
});

gulp.task('atomic--compile-testbed-collections', () => {
  return gulp.src(path.join(config.sources.testbed, 'collections', '*.njk'))
    .pipe(base(path.join(config.sources.testbed)))
    .pipe(nunjucks.compile())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(path.join(config.destinations.testbed)));
});

gulp.task('atomic--compile-testbed-index', () => {
  var collections = getTestbedCollectionsMetadata(path.join(config.sources.testbed, 'collections'), 'array');
  var samples = getTestbedSamplesMetadata(path.join(config.sources.testbed, 'samples'), 'array');

  return gulp.src(path.join(config['sources']['testbed'], 'index.njk'))
    .pipe(base(path.join(config.sources.testbed)))
    .pipe(nunjucks.compile({
      data_collections: collections,
      data_samples: samples
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(path.join(config.destinations.testbed)));
});

// Compound Tasks
// These tasks DO NOT build upon atomic tasks - i.e. they are duplicates/independent
// --------------------------------------------------

gulp.task('build--styles-bas-style-kit-no-min', () => {
    gulp.src(path.join(config.sources.stylesheets, 'bas-style-kit.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('build--styles-bas-style-kit-min', () => {
    gulp.src(path.join(config.sources.stylesheets, 'bas-style-kit.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(csscomb())
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('build--styles-bootstrap-bsk-no-min', () => {
    gulp.src(path.join(config.sources.stylesheets, 'bootstrap-bsk.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('build--styles-bootstrap-bsk-min', () => {
    gulp.src(path.join(config.sources.stylesheets, 'bootstrap-bsk.scss'))
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
gulp.task('build--sri-combined', () => {
    gulp.src([
      path.join(config.sources.css, 'bas-style-kit.css'),
      path.join(config.sources.css, 'bas-style-kit.min.css'),
      path.join(config.sources.css, 'bootstrap-bsk.css'),
      path.join(config.sources.css, 'bootstrap-bsk.min.css')
    ])
    .pipe(sri())
    .pipe(gulp.dest(path.join(config.destinations.dist)));
})

gulp.task('watch--lint-styles-bas-style-kit-no-min', () => {
  watch(path.join(config.sources.stylesheets, '**/*.scss'), function () {
    runSequence(
      'atomic--lint-sass-bas-style-kit',
      'build--styles-bas-style-kit-no-min'
    );
  });
});

// High Level Tasks
// These tasks DO build upon compound and atomic tasks
//

gulp.task('styles', ['build--styles-bas-style-kit-no-min'], () => {
  util.log(util.colors.yellow('Note: \'bootstrap-bsk\' styles ' + util.colors.underline('are not') + ' (re)compiled, either:'));
  util.log(util.colors.yellow('- call \'gulp build--styles-bootstrap-bsk-no-min\' if you just want these styles as well'));
  util.log(util.colors.yellow('- call \'gulp release\' if want to build all compressed & uncompressed files for distribution'));
  util.log(util.colors.blue('Note: (Re)Compiled styles ' + util.colors.underline('are not') + ' compressed'));
});

gulp.task('styles-prod', ['build--styles-bas-style-kit-min'], () => {
  util.log(util.colors.yellow('Note: \'bootstrap-bsk\' styles ' + util.colors.underline('are not') + ' (re)compiled, either:'))
  util.log(util.colors.yellow('- call \'gulp build--styles-bootstrap-bsk-min\' if you just want these styles as well'));
  util.log(util.colors.yellow('- call \'gulp release\' if want to build all compressed & uncompressed files for distribution'));
  util.log(util.colors.blue('Note: (Re)Compiled styles ' + util.colors.underline('are') + ' compressed'))
});

gulp.task('clean', [
  'atomic--clean-dist',
  'atomic--clean-dist-archive',
  'atomic--clean-templates'
], () => {});

gulp.task('fonts', [
  'atomic--copy-webfont-gill-sans',
  'atomic--copy-webfont-open-sans',
  'atomic--copy-webfont-font-awesome'
], () => {});

gulp.task('lint', [
  'atomic--lint-sass-bas-style-kit'
], () => {});

gulp.task('testbed', [
  'atomic--compile-testbed-collections',
  'atomic--compile-testbed-samples',
  'atomic--compile-testbed-index',
  'atomic--copy-templates-assets'
], () => {});

// Even Higher Level Tasks
// These tasks DO build upon high level, compound and atomic tasks
//

gulp.task('develop', () => {
  runSequence(
    'clean',
    'build--styles-bas-style-kit-no-min',
    'build--styles-bootstrap-bsk-no-min',
    'fonts',
    'lint',
    'testbed',
    'watch--lint-styles-bas-style-kit-no-min'
  );
});

gulp.task('release', () => {
  runSequence(
    'clean',
    [
      'build--styles-bas-style-kit-no-min',
      'build--styles-bas-style-kit-min',
      'build--styles-bootstrap-bsk-no-min',
      'build--styles-bootstrap-bsk-min',
      'fonts'
    ],
    'build--sri-combined',
    'atomic--archive-dist'
  );
});
