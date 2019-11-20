// Path
var path        = "localhost/sassuglify/";
// Vars
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var minifycss   = require('gulp-minify-css');
var uglify      = require('gulp-uglify');

gulp.task('browser-sync', function() {
    var files = ['**/*.php'];
    browserSync.init(files, {
    proxy: path,
    notify: false
    });
});

gulp.task('sass', function () {
    gulp.src('assets/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(minifycss())
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream:true}));
});

gulp.task('uglify', function() {
    gulp.src('assets/scripts/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('app/scripts'))
    .pipe(reload({stream:true}));
});

gulp.task('default', ['sass', 'uglify', 'browser-sync'], function () {
  gulp.watch("assets/styles/**/*.scss", ['sass']);
  gulp.watch("assets/scripts/**/*.js", ['uglify']);
});