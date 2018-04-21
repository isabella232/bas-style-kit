'use strict';
/*eslint-env node */

var del  = require('del'),
    path = require('path');

var gulp         = require('gulp'),
    pump         = require('pump'),
    sri          = require('gulp-sri'),
    zip          = require('gulp-zip'),
    sass         = require('gulp-sass'),
    comb         = require('gulp-csscomb'),
    nano         = require('gulp-cssnano'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    eslint       = require('gulp-eslint'),
    styleLint    = require('gulp-stylelint'),
    cssprefixer  = require('gulp-class-prefix'),
    autoprefixer = require('gulp-autoprefixer');

const config = {
  'sources': {
    'stylesheets': path.join('.', 'assets', 'stylesheets'),
    'javascripts': path.join('.', 'assets', 'javascripts'),
    'images': path.join('.', 'assets', 'images'),
    'bootstrap-sass': path.join('.', 'node_modules', 'bootstrap-sass'),
    'gill-sans': path.join('.', 'assets', 'webfonts', 'gill-sans'),
    'open-sans': path.join('.', 'node_modules', 'open-sans-fontface'),
    'font-awesome': path.join('.', 'node_modules', 'font-awesome'),
    'bas-style-kit-js': path.join('.', 'bas-style-kit', '**/*.js'),
    'bootstrap-overrides-js': path.join('.', 'bootstrap-overrides', '**/*.js'),
    'dist': path.join('.', 'dist'),
    'css': path.join('css'),
    'js': path.join('js'),
  },
  'destinations': {
    'root': path.join('.'),
    'dist': path.join('.', 'dist'),
    'css': path.join('css'),
    'fonts': path.join('fonts'),
    'js': path.join('js'),
    'img': path.join('img')
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
      'prefix': 'bsk-'
    }
  }
};


// Task definitions
//
// Tasks build from specific to general. It's likely you will want to run the more generic tasks.

gulp.task('clean--css', cleanCss);
gulp.task('clean--js', cleanJs);
gulp.task('clean--fonts', cleanFonts);
gulp.task('clean--img', cleanImg);
gulp.task('clean--dist-archive', cleanDistArchive);

gulp.task('build--css-style-kit', buildCssStyleKit);
gulp.task('build--css-bootstrap', buildCssBootstrap);
gulp.task('build--css-fonts', buildCssFonts);

gulp.task('concat--css', concatCss);
gulp.task('concat--js', concatJS);

gulp.task('minify--css', minifyCss);
gulp.task('minify--js', minifyJs);

gulp.task('copy--font--gill-sans', copyFontGillSans);
gulp.task('copy--font--open-sans', copyFontOpenSans);
gulp.task('copy--font--font-awesome', copyFontFontAwesome);

gulp.task('copy--img--bas-logo', copyImagesBasLogo);
gulp.task('copy--img--bas-roundel', copyImagesBasRoundel);
gulp.task('copy--img--ogl-symbol', copyImagesOglSymbol);

gulp.task('lint--sass', lintSass);
gulp.task('lint--js', lintJs);

gulp.task('sri', sriAll);

gulp.task('archive--dist', archiveDist);

gulp.task('watch', watchBuild);

gulp.task('build--css', gulp.series(
  gulp.parallel(
    'build--css-style-kit',
    'build--css-bootstrap',
    'build--css-fonts'
  ),
  'concat--css',
  'minify--css'
));
gulp.task('build--js', gulp.series(
  'concat--js',
  'minify--js'
));
gulp.task('copy--fonts', gulp.parallel(
  'copy--font--gill-sans',
  'copy--font--open-sans',
  'copy--font--font-awesome'
));
gulp.task('copy--img', gulp.parallel(
  'copy--img--bas-logo',
  'copy--img--bas-roundel',
  'copy--img--ogl-symbol'
));

gulp.task('clean', gulp.parallel(
  'clean--css',
  'clean--js',
  'clean--fonts',
  'clean--img',
  'clean--dist-archive'
));
gulp.task('build', gulp.parallel(
  'build--css',
  'build--js'
));
gulp.task('copy', gulp.parallel(
  'copy--fonts',
  'copy--img'
));
gulp.task('lint', gulp.parallel(
  'lint--sass',
  'lint--js'
));
gulp.task('archive', gulp.parallel(
  'archive--dist'
));

// Tasks

function cleanCss(done) {
  del([
      path.join(config.destinations.dist, config.destinations.css)
  ]);
  done();
}

function cleanJs(done) {
  del([
      path.join(config.destinations.dist, config.destinations.js)
  ]);
  done();
}

function cleanFonts(done) {
  del([
      path.join(config.destinations.dist, config.destinations.fonts)
  ]);
  done();
}

function cleanImg(done) {
  del([
      path.join(config.destinations.dist, config.destinations.img)
  ]);
  done();
}

function cleanDistArchive(done) {
  del([
    path.join(config.destinations.root, 'bas-style-kit.zip')
  ]);
  done();
}

function buildCssStyleKit(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.stylesheets, 'styles-bsk.scss')
      ]),
      sass().on('error', sass.logError),
      cssprefixer(config.modules.cssprefixer.prefix),
      autoprefixer(config.modules.autoprefixer),
      comb(),
      gulp.dest(path.join(config.destinations.dist, config.destinations.css))
    ],
    done
  );
}

function buildCssBootstrap(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.stylesheets, 'bootstrap-bsk.scss')
      ]),
      sass().on('error', sass.logError),
      cssprefixer(config.modules.cssprefixer.prefix),
      autoprefixer(config.modules.autoprefixer),
      comb(),
      gulp.dest(path.join(config.destinations.dist, config.destinations.css))
    ],
    done
  );
}

function buildCssFonts(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.stylesheets, 'fonts-bsk.scss')
      ]),
      sass().on('error', sass.logError),
      autoprefixer(config.modules.autoprefixer),
      comb(),
      gulp.dest(path.join(config.destinations.dist, config.destinations.css))
    ],
    done
  );
}

function concatCss(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.dist, config.sources.css, 'fonts-bsk.css'),
        path.join(config.sources.dist, config.sources.css, 'bootstrap-bsk.css'),
        path.join(config.sources.dist, config.sources.css, 'styles-bsk.css')
      ]),
      concat('bas-style-kit.css'),
      gulp.dest(path.join(config.destinations.dist, config.destinations.css))
    ],
    done
  );
}

function concatJS(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.javascripts, config.sources['bas-style-kit-js']),
        path.join(config.sources.javascripts, config.sources['bootstrap-overrides-js']),
      ]),
      concat('bas-style-kit.js'),
      gulp.dest(path.join(config.destinations.dist, config.destinations.js))
    ],
    done
  );
}

function minifyCss(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.dist, config.sources.css, 'bas-style-kit.css')
      ]),
      nano({
        minifyFontValues: false,
        discardUnused: false
      }),
      rename({suffix: '.min'}),
      gulp.dest(path.join(config.destinations.dist, config.destinations.css))
    ],
    done
  );
}

function minifyJs(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.dist, config.sources.js, 'bas-style-kit.js')
      ]),
      uglify(),
      rename({suffix: '.min'}),
      gulp.dest(path.join(config.destinations.dist, config.destinations.js))
    ],
    done
  );
}

function copyFontGillSans(done) {
  pump(
    [
      gulp.src([
          path.join(config.sources['gill-sans'], 'fonts', '**/*.eot'),
          path.join(config.sources['gill-sans'], 'fonts', '**/*.ttf'),
          path.join(config.sources['gill-sans'], 'fonts', '**/*.woff'),
          path.join(config.sources['gill-sans'], 'fonts', '**/*.woff2')
      ]),
      gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'gill-sans'))
    ],
    done
  );
}

function copyFontOpenSans(done) {
  pump(
    [
      gulp.src([
        path.join(config['sources']['open-sans'], 'fonts', '**/*.eot'),
        path.join(config['sources']['open-sans'], 'fonts', '**/*.ttf'),
        path.join(config['sources']['open-sans'], 'fonts', '**/*.woff'),
        path.join(config['sources']['open-sans'], 'fonts', '**/*.woff2')
      ]),
      gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'open-sans'))
    ],
    done
  );
}

function copyFontFontAwesome(done) {
  pump(
    [
      gulp.src([
        path.join(config['sources']['font-awesome'], 'fonts', '**/*.eot'),
        path.join(config['sources']['font-awesome'], 'fonts', '**/*.ttf'),
        path.join(config['sources']['font-awesome'], 'fonts', '**/*.woff'),
        path.join(config['sources']['font-awesome'], 'fonts', '**/*.woff2')
      ]),
      gulp.dest(path.join(config.destinations.dist, config.destinations.fonts, 'font-awesome'))
    ],
    done
  );
}

function copyImagesBasLogo(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.images, 'bas-logo', '*.png')
      ]),
      gulp.dest(path.join(config.destinations.dist, config.destinations.img, 'logos-symbols'))
    ],
    done
  );
}

function copyImagesBasRoundel(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.images, 'bas-roundel', '*.png')
      ]),
      gulp.dest(path.join(config.destinations.dist, config.destinations.img, 'logos-symbols'))
    ],
    done
  );
}

function copyImagesOglSymbol(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.images, 'ogl-symbol', '*.png')
      ]),
      gulp.dest(path.join(config.destinations.dist, config.destinations.img, 'logos-symbols'))
    ],
    done
  );
}

function lintSass(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.stylesheets, 'bas-style-kit', '**/*.scss'),
        path.join(config.sources.stylesheets, 'styles-bsk.scss'),
        path.join(config.sources.stylesheets, 'fonts', '**/*.scss'),
        path.join(config.sources.stylesheets, 'fonts-bsk.scss')
      ]),
      styleLint({
        syntax: 'scss',
        reporters: [
          {
            formatter: 'string',
            console: true
          }
        ]
      })
    ],
    done
  );
}

function lintJs(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources['bas-style-kit-js'])
      ]),
      eslint(),
      eslint.format(),
      eslint.failAfterError()
    ],
    done
  );
}

function sriAll(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.dist, config.sources.css, 'styles-bsk.css'),
        path.join(config.sources.dist, config.sources.css, 'bootstrap-bsk.css'),
        path.join(config.sources.dist, config.sources.css, 'fonts-bsk.css'),
        path.join(config.sources.dist, config.sources.css, 'bas-style-kit.css'),
        path.join(config.sources.dist, config.sources.css, 'bas-style-kit.min.css'),
        path.join(config.sources.dist, config.sources.js, 'bas-style-kit.js'),
        path.join(config.sources.dist, config.sources.js, 'bas-style-kit.min.js')
      ]),
      sri({
        'fileName': 'bas-style-kit.sri.json'
      })
    ],
    done
  );
}

function archiveDist(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.dist, '**/*.*')
      ]),
      zip('bas-style-kit.zip'),
      gulp.dest(path.join(config.destinations.root))
    ],
    done
  );
}

function watchBuild(done) {
  gulp.watch(
    [
      path.join(config.sources.stylesheets, '**/*.scss'),
      path.join(config.sources.javascripts, '**/*.js')
    ],
    gulp.parallel('build')
  );
  done();
}
