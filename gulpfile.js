/**
 * gulpfile.js
 */

// gulpプラグインの読み込み
var path         = require('path');
var dev_dir      = '.';
var www_dir      = path.join(process.cwd(), 'dist');
var assets_dir   = path.join(process.cwd(), 'dist/assets');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss     = require('gulp-clean-css');
var rename       = require('gulp-rename');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var uglify       = require('gulp-uglify');
var webpack      = require('gulp-webpack');
var browserSync  = require('browser-sync');

// sass
gulp.task('sass', function() {
    gulp.src(dev_dir + '/sass/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.0'],
        cascade: false
      }))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/css/'));
});

// webpack
gulp.task('webpack', function() {
    gulp.src(dev_dir + '/js/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(assets_dir + '/js/'))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/js/'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
             baseDir: www_dir + '/',
             index  : 'index.html'
        }
    });
});

// watch
gulp.task('watch', function(){
    // browser-sync
    gulp.watch(assets_dir + '/js/*.js', ['browser-sync']);

    // css
    gulp.watch(dev_dir + '/sass/*.scss', ['sass'], function(event) {});

    // javascript
    gulp.watch(dev_dir + '/js/*.js', ['webpack'], function(event) {});
});

gulp.task('default', ['watch']);