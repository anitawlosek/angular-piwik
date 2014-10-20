// Include gulp
var gulp = require('gulp');

// Plugins
var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('build', ['lint'], function() {
    return gulp.src('src/**/*.js')
        .pipe(plugins.concat('angular-piwik.js'))
        .pipe(gulp.dest('build'))
        .pipe(plugins.rename('angular-piwik.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('test', function() {
    return gulp.src('tests/**/*.spec.js')
        .pipe(plugins.karma({
            configFile: 'tests/karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/*.js', ['build']);
});

// Default Task
gulp.task('default', ['test', 'lint', 'build', 'watch']);