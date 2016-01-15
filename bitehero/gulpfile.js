var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var del = require('del');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');

var paths = {
    sass: ['./scss/**/*.scss', './app/css/**/*.scss'],
    templatecache: ['./app/templates/**/*.html'],
    ng_annotate: ['./app/js/*.js'],
    useref: ['./app/*.html'],
    del: ['./www/**/*', './app/dist/**/*']
};

gulp.task('clean', function () {
    return del(paths.del);
});

/* CONVERT SASS TO CSS */
gulp.task('sass', function (done) {
    gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./app/dist/css'))
        .on('end', done);
});

/* CONVERT APP SASS TO CSS */
gulp.task('app-sass', function (done) {
    gulp.src('./app/css/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./app/dist/css'))
        .on('end', done);
});

/* CONVERT TEMPLATES TO TEMPLATECACHE AND PUT TO JS FOLDER */
gulp.task('templatecache', function (done) {
    gulp.src('./app/templates/**/*.html')
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('./app/dist/js'))
        .on('end', done);
});

/* COPY FONTS TO DIST FOLDER */
gulp.task('app-js-copy', function (done) {
    gulp.src('./app/js/**/*')
        .pipe(gulp.dest('./app/dist/js'))
        .on('end', done);
});

/* COPY FONTS TO DIST FOLDER */
gulp.task('app-fonts-copy', function (done) {
    gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest('./app/dist/fonts'))
        .on('end', done);
});

/* COPY IMAGES TO DIST FOLDER */
gulp.task('app-img-copy', function (done) {
    gulp.src('./app/img/**/*')
        .pipe(gulp.dest('./app/dist/img'))
        .on('end', done);
});

/* COPY LIB FORLDER TO DIST */
gulp.task('app-lib-copy', function (done) {
    gulp.src('./app/lib/**/*')
        .pipe(gulp.dest('./app/dist/lib'))
        .on('end', done);
});

/* COPY ROOT HTML FILES TO DIST FOLDER FOR USEREF LATER */
gulp.task('app-html-copy', function (done) {
    gulp.src('./app/*.html')
        .pipe(gulp.dest('./app/dist'))
        .on('end', done);
});

/* ANNOTATE JS FILES FOR USEREF */
gulp.task('ng_annotate', function (done) {
    gulp.src('./app/js/**/*.js')
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(gulp.dest('./app/dist/js'))
        .on('end', done);
});

/* IT IS TIME TO TRANSFER FILES TO WWW */
gulp.task('useref', function (done) {
    gulp.src('./app/dist/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./www'))
        .on('end', done);
});

/* COPY FILES */
gulp.task('www-js-copy', function (done) {
    gulp.src('./app/dist/js/app.js')
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
});

gulp.task('www-css-copy', function (done) {
    gulp.src('./app/dist/css/style.css')
        .pipe(gulp.dest('./www/css'))
        .on('end', done);
});

gulp.task('www-img-copy', function (done) {
    gulp.src('./app/dist/img/**/*')
        .pipe(gulp.dest('./www/img'))
        .on('end', done);
});

gulp.task('www-lib-copy', function (done) {
    gulp.src('./app/dist/lib/**/*')
        .pipe(gulp.dest('./www/lib'))
        .on('end', done);
});

gulp.task('www-fonts-copy', function (done) {
    gulp.src('./app/dist/fonts/**/*')
        .pipe(gulp.dest('./www/fonts'))
        .on('end', done);
});

/* Default task. To use, just run: gulp */
gulp.task('default', function (done) {
    runSequence('clean',
        ['sass', 'app-sass', 'templatecache', 'app-js-copy', 'app-fonts-copy', 'app-img-copy', 'app-lib-copy', 'app-html-copy'],
        ['www-js-copy', 'www-css-copy', 'www-img-copy', 'www-lib-copy', 'www-fonts-copy'],
        'ng_annotate',
        'useref',
        done);
});

/* Short-cut commands for android build and serve */
gulp.task('ia:build', function (done) {
    runSequence('default',
        'ionic:android',
        done);
});

gulp.task('ia:serve', function (done) {
    runSequence('default',
        'ionic:serve',
        done);
});

gulp.task('ia:run', function (done) {
    runSequence('default',
        'ionic:run',
        done);
});

/* Shell commands */
gulp.task('ionic:android', shell.task([
    'ionic build android'
]));

gulp.task('ionic:serve', shell.task([
    'ionic serve'
]));

gulp.task('ionic:run', shell.task([
    'ionic run android'
]));

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.templatecache, ['templatecache']);
    gulp.watch(paths.ng_annotate, ['ng_annotate']);
    gulp.watch(paths.useref, ['useref']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
