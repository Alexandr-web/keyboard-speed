const { dest, parallel, src, watch } = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function html() {
  return src('src/*.html')
      .pipe(dest('docs/'))
      .pipe(browserSync.stream());
}

function styles() {
  return src(['src/scss/*.scss', '!src/scss/_*.scss'])
      .pipe(scss({ outputStyle: 'expanded' }))
      .pipe(autoprefixer({
          cascade: true,
          overrideBrowserslist: ['last 5 versions']
      }))
      .pipe(concat('main.css'))
      .pipe(dest('docs/css/'))
      .pipe(browserSync.stream());
}

function images() {
  return src('src/images/**/*')
      .pipe(dest('docs/images/'))
      .pipe(browserSync.stream());
}

function js() {
  return src('src/js/*.js')
      .pipe(webpack())
      .pipe(concat('main.js'))
      .pipe(dest('docs/js/'))
      .pipe(browserSync.stream());
}

function server() {
  browserSync.init({
      server: {
          baseDir: './docs/'
      }
  });
}

function watching() {
  watch('src/*.html', parallel(html));
  watch('src/scss/*.scss', parallel(styles));
  watch('src/images/**/*', parallel(images));
  watch('src/js/*.js', parallel(js));
}

exports.build = parallel(images, styles, html, js);
exports.default = parallel(exports.build, server, watching);