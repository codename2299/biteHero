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
    sass: ['./scss/**/*.scss'],
    templatecache: ['./app/templates/**/*.html'],
    ng_annotate: ['./app/js/*.js'],
    useref: ['./app/*.html'],
    del: ['./www/**/*']
};

gulp.task('clean', function () {
    return del(paths.del);
});

gulp.task('sass', function (done) {
    gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./app/css'))
        .on('end', done);
});

gulp.task('templatecache', function (done) {
    gulp.src('./app/templates/**/*.html')
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('./app/js'))
        .on('end', done);
});

gulp.task('img', function (done) {
    gulp.src('./app/img/**/*')
        .pipe(gulp.dest('./www/img'))
        .on('end', done);
});

gulp.task('fonts', function (done) {
    gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest('./www/fonts'))
        .on('end', done);
});

gulp.task('lib', function (done) {
    gulp.src('./app/lib/**/*')
        .pipe(gulp.dest('./www/lib'))
        .on('end', done);
});

gulp.task('useref', function (done) {
    gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./www'))
        .on('end', done);
});

gulp.task('ng_annotate', function (done) {
    gulp.src('./www/js/*.js')
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
});

gulp.task('build', function (done) {
    runSequence('clean',
        ['sass', 'templatecache', 'img', 'fonts', 'lib'],
        'useref',
        'ng_annotate',
        done);
});

gulp.task('build:ionic', function (done) {
    runSequence(['sass', 'templatecache', 'img', 'fonts', 'lib'],
        'useref',
        'ng_annotate',
        done);
});


gulp.task('build:serve', function (done) {
    runSequence('build', 'ionic:serve', done);
});

gulp.task('ionic:serve', shell.task([
    'ionic serve'
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
