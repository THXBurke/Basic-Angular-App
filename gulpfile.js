const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('eslint');

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('lint: test', () => {
  return gulp.src('app/js/**/*.eslintrc')
  .pipe(eslint({
    'useEslintrc': true
  }))
  .pipe(eslint.format());
});

gulp.task('css:dev', () => {
  gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('default', ['build:dev']);
