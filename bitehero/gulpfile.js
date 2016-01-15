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
    del: ['./www/**/*']
};

gulp.task('clean', function () {
    return del(paths.del);
});

/* Every changes on the files inside scss folder, it will compile
 * the *.scss files into css and copy them to www/css directory */
gulp.task('sass', function (done) {
    gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css'))
        .on('end', function () {
            gulp.src('./app/css/**/*.scss')
                .pipe(sass())
                .on('error', sass.logError)
                .pipe(gulp.dest('./app/css'))
                .on('end', done);
        });
});

/* Every changes on the templates folder, all html files inside it
 * will be compiled into templates.js file. It must be copied on app and www folders */
gulp.task('templatecache', function (done) {
    gulp.src('./app/templates/**/*.html')
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('./app/js'))
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
});

/* Every changes on the img folder will reflect to www folder */
gulp.task('img', function (done) {
    gulp.src('./app/img/**/*')
        .pipe(gulp.dest('./www/img'))
        .on('end', done);
});

/* Every changes on the fonts folder will reflect to www folder */
gulp.task('fonts', function (done) {
    gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest('./www/fonts'))
        .on('end', done);
});

/* All libraries will just be copied to www folder */
gulp.task('lib', function (done) {
    gulp.src('./app/lib/**/*')
        .pipe(gulp.dest('./www/lib'))
        .on('end', done);
});

/* Copy html files from the root of app folder */
gulp.task('html-copy', function (done) {
    gulp.src('./app/*.html')
        .pipe(gulp.dest('./www'))
        .on('end', done);
});

/* Copy css files from the app folder */
gulp.task('css-copy', function (done) {
    gulp.src('./app/css/**/*.css')
        .pipe(gulp.dest('./www/css'))
        .on('end', done);
});

/* Copy js files from the app folder */
gulp.task('js-copy', function (done) {
    gulp.src('./app/js/**/*.js')
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
});

/* User Ref looks at the root html files, i.e.: index.html.
 * It check the build tag and combine group files.
 * It should be copied on the www folder. */
gulp.task('useref', function (done) {
    gulp.src('./www/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./www'))
        .on('end', done);
});

/* This ensure that all dependency injection code will not cause error
 *  when minified. On every changes must be update the www folder. */
gulp.task('ng_annotate', function (done) {
    gulp.src('./www/js/**/*.js')
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
});

/* Copy js files from the app folder */
gulp.task('final-clean', function (done) {
    del(['./www/js/**/*.js', '!./www/js/app.js', './www/css/**/*.css', '!./www/css/style.css']);
    done();
});

/* Default task. To use, just run: gulp */
gulp.task('default', function (done) {
    runSequence('clean',
        ['sass', 'templatecache', 'img', 'fonts', 'lib'],
        ['html-copy', 'css-copy', 'js-copy'],
        'useref',
        'ng_annotate',
        'final-clean',
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
