var gulp = require('gulp');
var util = require('gulp-util');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var ks = require('kouto-swiss');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');

var path = {
  layouts: './src/layouts/**/*.jade',
  jade: './src/**/*.jade',
  stylus: './src/stylus/*.styl',
  stylusAll: './src/stylus/**/*.styl',
  scripts: './src/**/*.jsx',
  bundleEntry: './src/app.jsx',
  images: [
    './src/images/**/*.jpg',
    './src/images/**/*.png',
    './src/images/**/*.gif'
  ],
  svg: './src/images/**/*.svg',
  fonts: [
    './src/fonts/**/*.ttf',
    './src/fonts/**/*.svg',
    './src/fonts/**/*.eot',
    './src/fonts/**/*.woff'
  ],
  dest: {
    root: './www/',
    css: './www/css/',
    js: './www/js/',
    img: './www/img',
    fonts: './www/fonts'
  }
};

gulp.task('compile:html', function() {
  var locals = {
      env: (process.env.NODE_ENV || 'development')
  };

  var jadeOpts = {
    locals: locals
  };

  gulp.src([path.jade, '!'+path.layouts])
    .pipe(jade(jadeOpts))
    .pipe(gulp.dest(path.dest.root));
});

gulp.task('compile:css', function () {
  gulp.src(path.stylus)
    .pipe(stylus({
      use: [ks()]
    }))
    .pipe(gulp.dest(path.dest.css));
});

gulp.task("compile:js", function () {
  var t = browserify({
    entries: path.bundleEntry,
    extensions: ['.jsx'],
    debug: (process.env.NODE_ENV === 'development'),
    insertGlobals: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'));

  if (process.env.NODE_ENV === 'production') {
    t = t.pipe(uglify());
  }

  t = t.pipe(gulp.dest(path.dest.js));
});

gulp.task('compress:images', function() {
  gulp.src(path.images)
    .pipe(changed(path.dest.img))
    .pipe(gulp.dest(path.dest.img));
});

gulp.task('copy:fonts', function() {
  gulp.src(path.fonts)
    .pipe(changed(path.dest.fonts))
    .pipe(gulp.dest(path.dest.fonts));
});

gulp.task('build', ['compile:html', 'compile:css', 'compile:js', 'compress:images', 'copy:fonts']);

gulp.task('watch', function() {
  gulp.watch(path.jade, ['compile:html']);
  gulp.watch(path.stylusAll, ['compile:css']);
  gulp.watch(path.scripts, ['compile:js']);
  gulp.watch(path.images, ['compress:images']);
  gulp.watch(path.fontes, ['copy:fonts']);
});

gulp.task('default', ['build', 'watch']);
