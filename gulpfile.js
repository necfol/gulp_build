var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var wiredep = require('wiredep').stream;
var $ = gulpLoadPlugins();
gulp.task('default', ['build_css', 'build_js', 'inject', 'help'], function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch('./src/css/*.scss', ['build_css', 'inject'])
        .on('change', reload);
    gulp.watch('./src/js/*.js', ['build_js', 'inject'])
        .on('change', reload);
    gulp.watch('./*.html')
        .on('change', reload);
});
gulp.task('build_css', function () {
    gulp.src('./src/css/*.scss')
        .pipe($.sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('build_js', function () {
    gulp.src('./src/js/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('inject', function () {
    var target = gulp.src('./index.html');
    var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});

    return target.pipe($.inject(sources))
        .pipe(gulp.dest('./'));
});
gulp.task('help', $.taskListing)
