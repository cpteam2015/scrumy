/**
 * Created by xhitedev on 11/14/15.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var browserify = require('browserify');
var watchify = require('watchify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var coffee_reactify = require('coffee-reactify');

var shell = require('gulp-shell');

gulp.task('default', ['browserify', 'ruby']);

gulp.task('ruby', shell.task([
    'rackup'
]));

gulp.task('browserify', function(){
    browserifyShare();
});

function browserifyShare(){
    var b = browserify({
        entries: './app/js/main.cjsx',
        debug: true,
        extensions: ['.cjsx'],
        transform: [coffee_reactify]
    });

    //b = watchify(b);

    b.on('error', gutil.log);

    b.on('update', function(){
        bundleShare(b);
    });

    bundleShare(b);
}

function bundleShare(b) {
    b.bundle()
        .pipe(source('bundle.js'))
        //.pipe(buffer())
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./app/public/js/'));
}
