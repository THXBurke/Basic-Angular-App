const gulp = require('gulp');
const protractor = require('gulp-protractor').protractor;
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cp = require('child_process');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const mongoUri = 'mongodb://localhost/test_mvserver';
var children = [];

var serverFiles = ['../server.js', '../lib/**/*.js', '../test/**/*.js'];
var clientFiles = ['app/**/*.js', 'server.js', 'gulpfile.js', 'test/**/*.js'];

gulp.task('sass:dev', () => {
  return gulp.src('./app/style/sass/style.sass')
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: require('node-neat').includePaths
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./app/css'));
});

gulp.task('css:dev', ['sass:dev'], () => {
  gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('lint:server', () => {
  return gulp.src(serverFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});
gulp.task('lint:client', () => {
  return gulp.src(clientFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
.pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./build'));

});

gulp.task('webpack:mugstest', () => {
  gulp.src('test/unit/mugs/test_entry.js')
  .pipe(webpack(require('./webpack.config.js')
  ))
  .pipe(gulp.dest('./karma_bundles/mugs'));
});

gulp.task('webpack:vinyltest', () => {
  gulp.src('test/unit/vinyl/test_entry.js')
  .pipe(webpack(require('./webpack.config.js')
  ))
  .pipe(gulp.dest('./karma_bundles/vinyl'));
});

gulp.task('webpack:errorstest', () => {
  gulp.src('test/unit/entry.js')
  .pipe(webpack(require('./webpack.config.js')
))
.pipe(gulp.dest('./karma_bundles/errors'));
});

gulp.task('webpack:resourcetest', () => {
  gulp.src('test/unit/entry.js')
  .pipe(webpack(require('./webpack.config.js')
))
.pipe(gulp.dest('./karma_bundles/resources'));
});

gulp.task('webpack:counttrackertest', () => {
  gulp.src('test/unit/entry.js')
  .pipe(webpack(require('./webpack.config.js')
))
.pipe(gulp.dest('./karma_bundles'));
});

gulp.task('protractor:e2etest', () => {
  gulp.src('test/integration/mugs/spec.js')
  .pipe(protractor({
    configFile: 'test/integration/mugs/config.js'
  }))
  .on('end', () => {
    children.forEach((child) => {
      child.kill('SIGTERM');
    });
  });
});

gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
.pipe(gulp.dest('./build'));

});

gulp.task('lint:files', ['lint:client', 'lint:server']);
gulp.task('integration:test', ['startservers:test', 'protractor:e2etest']);
gulp.task('buid:css', ['sass']);
gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev', 'lint:files']);
gulp.task('default', ['build:dev']);
