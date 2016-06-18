const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
// const gutil = require('gulp-util');
const cp = require('child_process');
const mongoUri = 'mongodb://localhost/test_mvserver';
var children = [];

var files = ['lib/**/*.js',
 'test/**/*.js',
  'models/**/*.js',
  'lib/**/*.js',
  'routes/**/*.js',
  'gulpfile.js',
  'server.js',
'_server.js'];

gulp.task('startservers:test', () => {
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('server.js', [], { env: { MONGO_URI: mongoUri } }));
});


gulp.task('mocha:vinyltest', ['startservers:test'], () => {
  return gulp.src(['./test/vinyl_test.js'], { read: false })
  .pipe(mocha({
    reporter: 'nyan'
  }))
  .on('end', () => {
    children.forEach((child) => {
      child.kill('SIGTERM');
    });
  });
});
gulp.task('mocha:mugstest', ['startservers:test'], () => {
  return gulp.src(['./test/mugs_test.js'], { read: false })
  .pipe(mocha({
    reporter: 'nyan'
  }))
  .on('end', () => {
    children.forEach((child) => {
      child.kill('SIGTERM');
    });

  });

});

gulp.task('lint:test', () => {
  return gulp.src('lint:test', () => {
    return gulp.src('./test/**/*.js')
    .pipe(eslint({
    }));
  });
});

gulp.task('lint:nontest', () => {
  return gulp.src(files)
  .pipe(eslint( {
    useEslintrc: false,
    warnFileIgnored: true,
    env: {
      'browser': true,
      'jquery': true,
      'es6': true,
      'node': true
    }
  }))
  .pipe(eslint.format());
});

gulp.task('watch-files', ['lint:test'], () => {
  gulp.watch(files, ['lint:test']);
  gulp.watch(files, ['lint:nontest']);
});


gulp.task('vinyl', ['startservers:test', 'mocha:mugstest']);
gulp.task('mugs', ['startservers:test', 'mocha:vinyltest']);

gulp.task('server', ['watch-files']);
gulp.task('default', ['server']);
