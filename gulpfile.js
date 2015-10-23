// Node modules

var del = require('del');
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var yaml = require('yamljs');
var mkdirp = require('mkdirp');

// Gulp modules

var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
var csscomb = require('gulp-csscomb');
var minifycss = require('gulp-minify-css');
var rename = require("gulp-rename");
var gulpUtil = require('gulp-util');
var runSequence = require('run-sequence');

// Variables

var sources = {
  'stylesheets': path.join('.', 'less'),
  'openSans': path.join('.', 'node_modules', 'open-sans-fontface'),
  'gillSans': path.join('.', 'fonts', 'gill-sans'),
  'fontAwesome': path.join('.', 'node_modules', 'font-awesome'),
  'bootstrap': path.join('.', 'node_modules', 'bootstrap'),
  'mapglyphs': path.join('.', 'fonts', 'mapglyphs'),
  'devicons': path.join('.', 'node_modules', 'devicons')
};
var destinations = {
  'dist': path.join('.', 'dist'),
  'jekyll': path.join('.', 'documentation', 'end-users'),
  'docsDist': path.join('.', 'documentation', 'end-users', 'dist'),
  'jekyllData': path.join('.', 'documentation', 'end-users', '_data'),
  'css': path.join('css'),
  'fonts': path.join('fonts')
};
var configs = {
  env: {
    debug: false
  },
  less: {
    strictMath: true
    // Less source-maps are not supported by the gulp-less plugin, therefore gulp-sourcemaps is used instead
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
  },
  csslint: {
    csslintrc: '.csslintrc'
  },
  minifycss: {
    compatibility: 'ie8'
  },
  tasks: {
    dataFaGlyphs: {
      glyphClassSourceFile: path.join(sources.fontAwesome, 'less', 'icons.less'),
      glyphClassRegex: /\@fa-var-([a-zA-Z0-9-]+)/,
      glyphClassSrcPreix: "@fa-var-",
      jekyllDataFileDir: path.join(destinations.jekyllData),
      jekyllDataFileName: "fontawesomeicons.yml"
    },
    dataMgGlyphs: {
      glyphClassSourceFile: path.join(sources.stylesheets, 'map-glyphs', 'icons.less'),
      glyphClassRegex: /\.map-([a-zA-Z0-9-]+)/,
      glyphClassSrcPreix: ".map-",
      jekyllDataFileDir: path.join(destinations.jekyllData),
      jekyllDataFileName: "mapglyphsicons.yml"
    },
    dataDiGlyphs: {
      glyphClassSourceFile: path.join(sources.stylesheets, 'devicons', 'icons.less'),
      glyphClassRegex: /\.devicons-([a-zA-Z0-9-_]+)/,
      glyphClassSrcPreix: ".devicons-",
      jekyllDataFileDir: path.join(destinations.jekyllData),
      jekyllDataFileName: "deviconsicons.yml"
    }
  }
};

// Tasks

gulp.task('bsk-less-only', function() {
  return gulp.src(path.join(sources.stylesheets, 'bas-style-kit.less'))
    .pipe(less(configs.less))
    .pipe(gulp.dest(destinations.css))
    .pipe(gulp.dest(path.join(destinations.dist, destinations.css)))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.css)));
});
gulp.task('bsk-less-no-min', function() {
  return gulp.src(path.join(sources.stylesheets, 'bas-style-kit.less'))
    .pipe(sourcemaps.init())
    .pipe(less(configs.less))
    .pipe(autoprefixer(configs.autoprefixer))
    .pipe(csscomb())
    .pipe(csslint(configs.csslint.csslintrc))
    .pipe(csslint.reporter())
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(destinations.dist, destinations.css)))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.css)));
});
gulp.task('bsk-less-min', function() {
  return gulp.src(path.join(sources.stylesheets, 'bas-style-kit.less'))
    .pipe(sourcemaps.init())
    .pipe(less(configs.less))
    .pipe(autoprefixer(configs.autoprefixer))
    .pipe(csscomb())
    .pipe(csslint(configs.csslint.csslintrc))
    .pipe(csslint.reporter())
    .pipe(minifycss(configs.minifycss))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(destinations.dist, destinations.css)))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.css)));
});

gulp.task('bootstrap-bsk-less-only', function() {
  return gulp.src(path.join(sources.stylesheets, 'bootstrap-bsk.less'))
    .pipe(less(configs.less))
    .pipe(gulp.dest(destinations.css))
    .pipe(gulp.dest(path.join(destinations.dist, destinations.css)))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.css)));
});
gulp.task('bootstrap-bsk-less-no-min', function() {
  return gulp.src(path.join(sources.stylesheets, 'bootstrap-bsk.less'))
    .pipe(sourcemaps.init())
    .pipe(less(configs.less))
    .pipe(autoprefixer(configs.autoprefixer))
    .pipe(csscomb())
    .pipe(csslint(configs.csslint.csslintrc))
    .pipe(csslint.reporter())
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(destinations.dist, destinations.css)))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.css)));
});
gulp.task('bootstrap-bsk-less-min', function() {
  return gulp.src(path.join(sources.stylesheets, 'bootstrap-bsk.less'))
    .pipe(sourcemaps.init())
    .pipe(less(configs.less))
    .pipe(autoprefixer(configs.autoprefixer))
    .pipe(csscomb())
    .pipe(csslint(configs.csslint.csslintrc))
    .pipe(csslint.reporter())
    .pipe(minifycss(configs.minifycss))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(path.join(destinations.dist, destinations.css)))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.css)));
});

gulp.task('fonts-opensans', function() {
  return gulp.src(
    [
            path.join(sources.openSans, 'fonts', '**/*.*'),
      '!' + path.join(sources.openSans, 'fonts', '**/*.svg')
    ])
    .pipe(gulp.dest(path.join(destinations.dist, destinations.fonts, 'open-sans')))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.fonts, 'open-sans')));
});
gulp.task('fonts-gillsans', function() {
  return gulp.src(
    [
            path.join(sources.gillSans, '**/*.*'),
      '!' + path.join(sources.gillSans, '**/*.svg')
    ])
    .pipe(gulp.dest(path.join(destinations.dist, destinations.fonts, 'gill-sans')))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.fonts, 'gill-sans')));
});
gulp.task('fonts-fontawesome', function() {
  return gulp.src(
    [
            path.join(sources.fontAwesome, 'fonts', '**/*.*'),
      '!' + path.join(sources.fontAwesome, 'fonts', '**/*.svg')
    ])
    .pipe(gulp.dest(path.join(destinations.dist, destinations.fonts, 'font-awesome')))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.fonts, 'font-awesome')));
});
gulp.task('fonts-mapglyphs', function() {
  return gulp.src(
    [
            path.join(sources.mapglyphs, '**/*.*'),
      '!' + path.join(sources.mapglyphs, '**/*.svg')
    ])
    .pipe(gulp.dest(path.join(destinations.dist, destinations.fonts, 'map-glyphs')))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.fonts, 'map-glyphs')));
});
gulp.task('fonts-devicons', function() {
  return gulp.src(
    [
            path.join(sources.devicons, 'fonts', '**/*.*'),
      '!' + path.join(sources.devicons, 'fonts', '**/*.svg')
    ])
    .pipe(gulp.dest(path.join(destinations.dist, destinations.fonts, 'devicons')))
    .pipe(gulp.dest(path.join(destinations.docsDist, destinations.fonts, 'devicons')));
});

gulp.task('jekyll-data-fa', function() {
  var classes = [];

  // Get lines from Font Awesome's icons.less file to determine available glyph classes
  var fontAwesomeGlyphFile = fs.readFileSync(configs.tasks.dataFaGlyphs.glyphClassSourceFile, 'utf8');
  var fontAwesomeGlyphLines = fontAwesomeGlyphFile.split('\n');

  // For each line from the file check if it defines a glyph class using a regex
  for (var i = 0, len = fontAwesomeGlyphLines.length; i < len; i++) {

    var re = configs.tasks.dataFaGlyphs.glyphClassRegex;
    var str = fontAwesomeGlyphLines[i];
    var match;

    if ((match = re.exec(str)) !== null) {
      if (match.index === re.lastIndex) {
          re.lastIndex++;
      }

      // Strip off the common prefix and add to array
      var className = match[0].replace(configs.tasks.dataFaGlyphs.glyphClassSrcPreix, '');
      classes.push(className);
    }
  }

  // Sort classes array by alphabetical order for cleanness
  classes = classes.sort();

  // Convert classes array to yaml
  var classesYml = yaml.stringify(classes, 4);

  // Ensure output file directory exists
  mkdirp(configs.tasks.dataFaGlyphs.jekyllDataFileDir, function (err) {
    if (err)
    {
      gulpUtil.error(err);
    } else
    {
      // Write out Jekyll data file
      fs.writeFile(
        path.join(configs.tasks.dataFaGlyphs.jekyllDataFileDir, configs.tasks.dataFaGlyphs.jekyllDataFileName),
        classesYml,
        function(err) {
          if(err)
          {
            gulpUtil.error(err);
          } else
          {
            gulpUtil.log('Font Awesome classes file written - containing ' + classes.length + ' icon classes');
          }
        }
      );
    }
  });

  //Debug - enable using configs.env.debug = true
  if (configs.env.debug == true) {
    gulpUtil.log('Found ' + fontAwesomeGlyphLines.length + ' lines in icons.less');
    gulpUtil.log('Found ' + classes.length + ' icon classes in icons.less');
    gulpUtil.log('Class 4 looks like: ' + classes[3]);
    gulpUtil.log('Yaml output looks like: ' + classesYml);
  }

  return false;
});
gulp.task('jekyll-data-mg', function() {
  var classes = [];

  // Get lines from Map Glyphs's icons.less file to determine available glyph classes
  var mapGlyphFile = fs.readFileSync(configs.tasks.dataMgGlyphs.glyphClassSourceFile, 'utf8');
  var mapGlyphLines = mapGlyphFile.split('\n');

  // For each line from the file check if it defines a glyph class using a regex
  for (var i = 0, len = mapGlyphLines.length; i < len; i++) {

    var re = configs.tasks.dataMgGlyphs.glyphClassRegex;
    var str = mapGlyphLines[i];
    var match;

    if ((match = re.exec(str)) !== null) {
      if (match.index === re.lastIndex) {
          re.lastIndex++;
      }

      // Strip off the common prefix and add to array
      var className = match[0].replace(configs.tasks.dataMgGlyphs.glyphClassSrcPreix, '');
      classes.push(className);
    }
  }

  // Sort classes array by alphabetical order for cleanness
  classes = classes.sort();

  // Convert classes array to yaml
  var classesYml = yaml.stringify(classes, 4);

  // Ensure output file directory exists
  mkdirp(configs.tasks.dataMgGlyphs.jekyllDataFileDir, function (err) {
    if (err)
    {
      gulpUtil.error(err);
    } else
    {
      // Write out Jekyll data file
      fs.writeFile(
        path.join(configs.tasks.dataMgGlyphs.jekyllDataFileDir, configs.tasks.dataMgGlyphs.jekyllDataFileName),
        classesYml,
        function(err) {
          if(err)
          {
            gulpUtil.error(err);
          } else
          {
            gulpUtil.log('Map Glyphs classes file written - containing ' + classes.length + ' icon classes');
          }
        }
      );
    }
  });

  //Debug - enable using configs.env.debug = true
  if (configs.env.debug == true) {
    gulpUtil.log('Found ' + mapGlyphLines.length + ' lines in icons.less');
    gulpUtil.log('Found ' + classes.length + ' icon classes in icons.less');
    gulpUtil.log('Class 4 looks like: ' + classes[3]);
    gulpUtil.log('Yaml output looks like: ' + classesYml);
  }

  return false;
});
gulp.task('jekyll-data-di', function() {
  var classes = [];

  // Get lines from Devicon's icons.less file to determine available glyph classes
  var deviconsFile = fs.readFileSync(configs.tasks.dataDiGlyphs.glyphClassSourceFile, 'utf8');
  var deviconsLines = deviconsFile.split('\n');

  // For each line from the file check if it defines a glyph class using a regex
  for (var i = 0, len = deviconsLines.length; i < len; i++) {

    var re = configs.tasks.dataDiGlyphs.glyphClassRegex;
    var str = deviconsLines[i];
    var match;

    if ((match = re.exec(str)) !== null) {
      if (match.index === re.lastIndex) {
          re.lastIndex++;
      }

      // Strip off the common prefix and add to array
      var className = match[0].replace(configs.tasks.dataDiGlyphs.glyphClassSrcPreix, '');
      classes.push(className);
    }
  }

  // Sort classes array by alphabetical order for cleanness
  classes = classes.sort();

  // Convert classes array to yaml
  var classesYml = yaml.stringify(classes, 4);

  // Ensure output file directory exists
  mkdirp(configs.tasks.dataDiGlyphs.jekyllDataFileDir, function (err) {
    if (err)
    {
      gulpUtil.error(err);
    } else
    {
      // Write out Jekyll data file
      fs.writeFile(
        path.join(configs.tasks.dataDiGlyphs.jekyllDataFileDir, configs.tasks.dataDiGlyphs.jekyllDataFileName),
        classesYml,
        function(err) {
          if(err)
          {
            gulpUtil.error(err);
          } else
          {
            gulpUtil.log('Devicons classes file written - containing ' + classes.length + ' icon classes');
          }
        }
      );
    }
  });

  //Debug - enable using configs.env.debug = true
  if (configs.env.debug == true) {
    gulpUtil.log('Found ' + deviconsLines.length + ' lines in icons.less');
    gulpUtil.log('Found ' + classes.length + ' icon classes in icons.less');
    gulpUtil.log('Class 4 looks like: ' + classes[3]);
    gulpUtil.log('Yaml output looks like: ' + classesYml);
  }

  return false;
});

// Utility tasks

gulp.task('clean', function() {
  return del([
    path.join(destinations.dist, '**/*'),
    path.join(destinations.docsDist, 'css', 'bas-style-kit.css'),
    path.join(destinations.docsDist, 'css', 'bas-style-kit.min.css'),
    path.join(destinations.docsDist, 'css', 'maps', 'bas-style-kit.css.map'),
    path.join(destinations.docsDist, 'css', 'maps', 'bas-style-kit.min.css.map'),
    path.join(destinations.docsDist, 'css', 'bootstrap-bsk.css'),
    path.join(destinations.docsDist, 'css', 'bootstrap-bsk.min.css'),
    path.join(destinations.docsDist, 'css', 'maps', 'bootstrap-bsk.css.map'),
    path.join(destinations.docsDist, 'css', 'maps', 'bootstrap-bsk.min.css.map'),
    path.join(destinations.docsDist, 'fonts', '**/*'),
    path.join(configs.tasks.dataFaGlyphs.jekyllDataFileDir, configs.tasks.dataFaGlyphs.jekyllDataFileName),
    path.join(configs.tasks.dataMgGlyphs.jekyllDataFileDir, configs.tasks.dataMgGlyphs.jekyllDataFileName),
    path.join(configs.tasks.dataDiGlyphs.jekyllDataFileDir, configs.tasks.dataDiGlyphs.jekyllDataFileName)
  ]);
});

// Combined tasks

gulp.task('less', [
  'bsk-less-no-min',
  'bsk-less-min',
  'bootstrap-bsk-less-no-min',
  'bootstrap-bsk-less-min'
]);

gulp.task('fonts', [
  'fonts-opensans',
  'fonts-gillsans',
  'fonts-fontawesome',
  'fonts-mapglyphs',
  'fonts-devicons'
]);

gulp.task('jekyll-data', [
  'jekyll-data-fa',
  'jekyll-data-mg',
  'jekyll-data-di'
]);

// Special tasks

gulp.task('default', function(callback) {
  runSequence(
    'clean',
    'fonts',
    'less',
    'jekyll-data',
    callback);
});
