// Include gulp
var gulp = require('gulp');

// Plugins
var jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    karma = require('gulp-karma');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Concatenate & Minify JS
gulp.task('build', ['lint'], function() {
    return gulp.src('src/**/*.js')
        .pipe(concat('angular-piwik.js'))
        .pipe(gulp.dest('build'))
        .pipe(rename('angular-piwik.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('test', function () {
    return gulp.src('some_test_tile')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('watch-test', function () {
    return gulp.src('some_test_tile')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'start'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['src/**/*.js'], ['build']);
    gulp.watch(['src/**/*.js', 'test/**/*.spec.js'], ['watch-test']);
});

// Default Task
gulp.task('default', ['test', 'lint', 'build', 'watch']);