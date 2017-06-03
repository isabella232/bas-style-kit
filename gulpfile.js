'use strict';
/*eslint-env node */

var         fs = require("fs"),
           del = require('del'),
          path = require('path');

var        sri = require('gulp-sri'),
           zip = require('gulp-zip'),
          base = require('gulp-base'),
          csso = require('gulp-csso'),
          gulp = require('gulp'),
          sass = require('gulp-sass'),
          nano = require('gulp-cssnano'),
          util = require('gulp-util'),
        concat = require('gulp-concat'),
        rename = require('gulp-rename'),
       csscomb = require('gulp-csscomb'),
       pkginfo = require('pkginfo')(module, 'version'),
      nunjucks = require('gulp-nunjucks'),
     styleLint = require('gulp-stylelint'),
    sourcemaps = require('gulp-sourcemaps'),
   cssbeautify = require('gulp-cssbeautify'),
   cssprefixer = require('gulp-class-prefix'),
   runsequence = require('run-sequence'),
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
    },
    'cssprefixer': {
      'prefix': 'bsk-'
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

function getBasePath() {
  if (process.env.CI_BUILD_REF_NAME) {
    return '/' + process.env.CI_BUILD_REF_NAME + '/';
  } else {
    return '/';
  }
}

// Atomic Tasks
// Do one thing and one thing only
// --------------------------------------------------

// Sass compilation

gulp.task('atomic--compile-sass-bas-style-kit', () => {
  return gulp.src(path.join(config.sources.stylesheets, 'styles-bsk.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('atomic--compile-sass-bootstrap-bsk', () => {
  return gulp.src(path.join(config.sources.stylesheets, 'bootstrap-bsk.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

gulp.task('atomic--compile-sass-fonts-bsk', () => {
  return gulp.src(path.join(config.sources.stylesheets, 'fonts-bsk.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)));
});

// Auto-prefixing

gulp.task('atomic--autoprefix-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--autoprefix-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--autoprefix-fonts-bsk', ['atomic--compile-sass-fonts-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'fonts-bsk.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// CSS prefixing (name-spacing)

gulp.task('atomic--cssprefix-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.css'))
    .pipe(cssprefixer(config.modules.cssprefixer.prefix))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--cssprefix-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(cssprefixer(config.modules.cssprefixer.prefix))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// CSS comb

gulp.task('atomic--comb-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.css'))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--comb-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--comb-fonts-bsk', ['atomic--compile-sass-fonts-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'fonts-bsk.css'))
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Minify CSS

gulp.task('atomic--minify-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.css'))
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--minify-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--minify-fonts-bsk', ['atomic--compile-sass-fonts-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'fonts-bsk.css'))
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// CSS restructing (merging)

gulp.task('atomic--restructure-bas-style-kit-no-min', ['atomic--concat-bas-style-kit-no-min'], () => {
  return gulp.src(path.join(config.sources.css, 'bas-style-kit.css'))
    // .pipe(csso({
    //   debug: true
    // }))
    // Undo minifying
    .pipe(cssbeautify())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--restructure-bas-style-kit-min', ['atomic--concat-bas-style-kit-min'], () => {
  return gulp.src(path.join(config.sources.css, 'bas-style-kit.min.css'))
    // .pipe(csso({
    //   debug: true
    // }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// CSS source-maps
// As source-maps cannot be created from already minified files, this task technically does two things

gulp.task('atomic--sourcemaps-bas-style-kit', ['atomic--compile-sass-bas-style-kit'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.css'))
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sourcemaps-bootstrap-bsk', ['atomic--compile-sass-bootstrap-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sourcemaps-fonts-bsk', ['atomic--compile-sass-fonts-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'fonts-bsk.css'))
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Copying

gulp.task('atomic--copy-webfont-gill-sans', () => {
  return gulp.src(
    [
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.eot'),
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.ttf'),
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.woff'),
      path.join(config['sources']['gill-sans'], 'fonts', '**/*.woff2')
    ])
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'gill-sans')));
});

gulp.task('atomic--copy-webfont-open-sans', () => {
  return gulp.src(
    [
      path.join(config['sources']['open-sans'], 'fonts', '**/*.eot'),
      path.join(config['sources']['open-sans'], 'fonts', '**/*.ttf'),
      path.join(config['sources']['open-sans'], 'fonts', '**/*.woff'),
      path.join(config['sources']['open-sans'], 'fonts', '**/*.woff2')
    ])
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'open-sans')));
});

gulp.task('atomic--copy-webfont-font-awesome', () => {
  return gulp.src(
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

// Concat
// By necessity these tasks must do multiple things, but it does so in the most minimal way possible

gulp.task('atomic--concat-bas-style-kit-no-min', [
    'atomic--compile-sass-bas-style-kit',
    'atomic--compile-sass-bootstrap-bsk',
    'atomic--compile-sass-fonts-bsk'
  ], () => {
  return gulp.src([
      path.join(config.sources.css, 'styles-bsk.css'),
      path.join(config.sources.css, 'bootstrap-bsk.css'),
      path.join(config.sources.css, 'fonts-bsk.css')
    ])
    .pipe(concat('bas-style-kit.css'))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--concat-bas-style-kit-min', [
    'atomic--minify-bas-style-kit',
    'atomic--minify-sass-bootstrap-bsk',
    'atomic--minify-sass-fonts-bsk'
  ], () => {
  return gulp.src([
      path.join(config.sources.css, 'styles-bsk.min.css'),
      path.join(config.sources.css, 'bootstrap-bsk.min.css'),
      path.join(config.sources.css, 'fonts-bsk.min.css')
    ])
    .pipe(concat('bas-style-kit.min.css'))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Linting

gulp.task('atomic--lint-sass-bas-style-kit', () => {
  return gulp.src([
    path.join(config.sources.stylesheets, 'bas-style-kit', '**/*.scss'),
    path.join(config.sources.stylesheets, 'styles-bsk.scss')
  ])
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

gulp.task('atomic--lint-sass-fonts-bsk', () => {
  return gulp.src([
    path.join(config.sources.stylesheets, 'fonts', '**/*.scss'),
    path.join(config.sources.stylesheets, 'fonts-bsk.scss')
  ])
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
// These tasks must operate on the final output of a build process, and therefore rely on combined tasks

gulp.task('atomic--sri-styles-bsk-css', ['build--styles-bas-style-kit-only-no-min'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.css'))
    .pipe(sri({
      'fileName': 'styles-bsk.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-styles-bsk-css-min', ['build--styles-bas-style-kit-only-min'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.min.css'))
    .pipe(sri({
      'fileName': 'styles-bsk.min.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bootstrap-bsk-css', ['build--styles-bootstrap-bsk-only-no-min'], () => {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(sri({
      'fileName': 'bootstrap-bsk.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bootstrap-bsk-css-min', ['build--styles-bootstrap-bsk-only-min'], () => {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.min.css'))
    .pipe(sri({
      'fileName': 'bootstrap-bsk.min.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-fonts-bsk-css', ['build--styles-fonts-bsk-only-no-min'], () => {
  return gulp.src(path.join(config.sources.css, 'fonts-bsk.css'))
    .pipe(sri({
      'fileName': 'fonts-bsk.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-fonts-bsk-css-min', ['build--styles-fonts-bsk-only-min'], () => {
  return gulp.src(path.join(config.sources.css, 'fonts-bsk.min.css'))
    .pipe(sri({
      'fileName': 'fonts-bsk.min.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bas-style-kit-css', ['build--styles-bas-style-kit-no-min'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.css'))
    .pipe(sri({
      'fileName': 'bas-style-kit.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('atomic--sri-bas-style-kit-css-min', ['build--styles-bas-style-kit-min'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.min.css'))
    .pipe(sri({
      'fileName': 'bas-style-kit.min.css.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Archiving

gulp.task('atomic--archive-dist', () => {
  return gulp.src(path.join(config.sources.dist, '**/*.*'))
    .pipe(zip('bas-style-kit-' + module.exports.version + '.zip'))
    .pipe(gulp.dest(path.join(config.destinations.distArchive)))
});

// Cleaning

gulp.task('atomic--clean-dist', () => {
  return del([
      path.join(config.destinations.dist, '**/*')
  ]);
});

gulp.task('atomic--clean-templates', () => {
  return del([
    path.join(config.destinations.testbed, '**/*')
  ]);
});

gulp.task('atomic--clean-dist-archive', () => {
  return del([
      path.join(config.destinations.distArchive)
  ]);
});

// Template compilation

gulp.task('atomic--compile-testbed-samples', () => {
  var basePath = getBasePath();

  return gulp.src(path.join(config.sources.testbed, 'samples', '*.njk'))
    .pipe(base(path.join(config.sources.testbed)))
    .pipe(nunjucks.compile({
      data_base_path: basePath
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(path.join(config.destinations.testbed)));
});

gulp.task('atomic--compile-testbed-collections', () => {
  var basePath = getBasePath();

  return gulp.src(path.join(config.sources.testbed, 'collections', '*.njk'))
    .pipe(base(path.join(config.sources.testbed)))
    .pipe(nunjucks.compile({
      data_base_path: basePath
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(path.join(config.destinations.testbed)));
});

gulp.task('atomic--compile-testbed-index', () => {
  var collections = getTestbedCollectionsMetadata(path.join(config.sources.testbed, 'collections'), 'array');
  var samples = getTestbedSamplesMetadata(path.join(config.sources.testbed, 'samples'), 'array');
  var basePath = getBasePath();

  return gulp.src(path.join(config['sources']['testbed'], 'index.njk'))
    .pipe(base(path.join(config.sources.testbed)))
    .pipe(nunjucks.compile({
      data_collections: collections,
      data_samples: samples,
      data_base_path: basePath
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(path.join(config.destinations.testbed)));
});

// Compound Tasks
// These tasks DO NOT build upon atomic tasks - i.e. they are duplicates/independent
// --------------------------------------------------

gulp.task('build--styles-bas-style-kit-only-no-min', ['atomic--cssprefix-bas-style-kit'], () => {
  return gulp.src(path.join(config.sources.css, 'styles-bsk.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    // .pipe(csso({
    //   debug: true
    // }))
    // Undo minifying
    .pipe(cssbeautify())
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('build--styles-bas-style-kit-only-min', ['atomic--lint-sass-bas-style-kit'], () => {
  return gulp.src(path.join(config.sources.stylesheets, 'styles-bsk.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssprefixer(config.modules.cssprefixer.prefix))
    .pipe(autoprefixer(config.modules.autoprefixer))
    // .pipe(csso({
    //   debug: true
    // }))
    .pipe(csscomb())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('build--styles-bootstrap-bsk-only-no-min', ['atomic--cssprefix-bootstrap-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'bootstrap-bsk.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    // .pipe(csso({
    //   debug: true
    // }))
    // Undo minifying
    .pipe(cssbeautify())
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('build--styles-bootstrap-bsk-only-min', () => {
  return gulp.src(path.join(config.sources.stylesheets, 'bootstrap-bsk.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssprefixer(config.modules.cssprefixer.prefix))
    .pipe(autoprefixer(config.modules.autoprefixer))
    // .pipe(csso({
    //   debug: true
    // }))
    .pipe(csscomb())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('build--styles-fonts-bsk-only-no-min', ['atomic--autoprefix-fonts-bsk'], () => {
  return gulp.src(path.join(config.sources.css, 'fonts-bsk.css'))
    // .pipe(csso({
    //   debug: true
    // }))
    // Undo minifying
    .pipe(cssbeautify())
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('build--styles-fonts-bsk-only-min', () => {
  return gulp.src(path.join(config.sources.stylesheets, 'fonts-bsk.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssprefixer(config.modules.cssprefixer.prefix))
    .pipe(autoprefixer(config.modules.autoprefixer))
    // .pipe(csso({
    //   debug: true
    // }))
    .pipe(csscomb())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// Combined

gulp.task('build--styles-bas-style-kit-no-min', [
    'atomic--cssprefix-bas-style-kit',
    'atomic--cssprefix-bootstrap-bsk',
    'atomic--compile-sass-fonts-bsk'
  ], () => {
  return gulp.src([
      path.join(config.sources.css, 'bootstrap-bsk.css'),
      path.join(config.sources.css, 'fonts-bsk.css'),
      path.join(config.sources.css, 'styles-bsk.css')
    ])
    .pipe(concat('bas-style-kit.css'))
    // .pipe(csso({
    //   debug: true
    // }))
    // Undo minifying
    .pipe(cssbeautify())
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

gulp.task('build--styles-bas-style-kit-min', [
    'atomic--cssprefix-bootstrap-bsk',
    'atomic--compile-sass-fonts-bsk',
    'atomic--cssprefix-bas-style-kit'
  ], () => {
  return gulp.src([
      path.join(config.sources.css, 'styles-bsk.css'),
      path.join(config.sources.css, 'bootstrap-bsk.css'),
      path.join(config.sources.css, 'fonts-bsk.css')
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('bas-style-kit.min.css'))
    .pipe(autoprefixer(config.modules.autoprefixer))
    // .pipe(csso({
    //   debug: true
    // }))
    .pipe(csscomb())
    .pipe(nano())
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(config.destinations.dist, config.destinations.css)))
});

// This task assumes the relevant CSS tasks have already been run
gulp.task('build--sri-bas-style-kit', () => {
  return gulp.src([
      path.join(config.sources.css, 'styles-bsk.css'),
      path.join(config.sources.css, 'styles-bsk.min.css'),
      path.join(config.sources.css, 'bootstrap-bsk.css'),
      path.join(config.sources.css, 'bootstrap-bsk.min.css'),
      path.join(config.sources.css, 'fonts-bsk.css'),
      path.join(config.sources.css, 'fonts-bsk.min.css'),
      path.join(config.sources.css, 'bas-style-kit.css'),
      path.join(config.sources.css, 'bas-style-kit.min.css')
    ])
    .pipe(sri({
      'fileName': 'bas-style-kit.sri.json'
    }))
    .pipe(gulp.dest(path.join(config.destinations.dist)))
});

// High Level Tasks
// These tasks DO build upon compound and atomic tasks
//

gulp.task('styles', [
    'build--styles-bas-style-kit-only-no-min',
    'build--styles-bootstrap-bsk-only-no-min',
    'build--styles-fonts-bsk-only-no-min',
    'build--styles-bas-style-kit-no-min'
  ], () => {});

gulp.task('styles-prod', [
    'build--styles-bas-style-kit-only-min',
    'build--styles-bootstrap-bsk-only-min',
    'build--styles-fonts-bsk-only-min',
    'build--styles-bas-style-kit-min'
  ], () => {});

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
  'atomic--lint-sass-bas-style-kit',
  'atomic--lint-sass-fonts-bsk'
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
  runsequence(
    'clean',
    'styles',
    'styles-prod',
    'build--sri-bas-style-kit',
    'lint',
    'fonts',
    'testbed'
  );
});

gulp.task('release', () => {
  runsequence(
    'clean',
    [
      'styles',
      'styles-prod'
    ],
    'atomic--archive-dist'
  );
});
