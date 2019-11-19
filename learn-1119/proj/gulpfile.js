var gulp = require("gulp");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var guitl = require('gulp-util');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var paths = {
  pages: ['src/*.html']
};

// Watchify启动Gulp并保持运行状态
var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {}
}))
.plugin(tsify)
.transform('babelify', {
  presets: ['es2015'],
  extensions: ['.ts']
});

// 模板文件迁移
gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

// 文件操作
function boundle () {
  return watchedBrowserify
          .bundle()
          .pipe(source('bundle.js'))
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(uglify())
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest("dist"));
}


gulp.task("default", gulp.series('copy-html', boundle));

watchedBrowserify.on('update', boundle);
watchedBrowserify.on('log', guitl.log)