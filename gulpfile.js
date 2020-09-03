const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
    // find scss
    return gulp.src('./src/scss/**/*.scss')
    // pass through sass compile
    .pipe(sass().on('error', sass.logError))
    // minify css
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // where to save compiled css
    .pipe(gulp.dest('dist/assets'))
    // stream changes to all browsers
    .pipe(browserSync.stream());
}

// minify HTML

function html() {
    return gulp.src('src/html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./src/html/**/*.html', html);
    gulp.watch('./src/html/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;