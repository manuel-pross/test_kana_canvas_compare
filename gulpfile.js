const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();

// compile scss into css + minify
function style() {
    // find scss
    return gulp.src('./src/scss/style.scss')
    // pass through sass compile
    .pipe(sass().on('error', sass.logError))
    // bundle css
    .pipe(concatCss("style.css"))
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

// minify Imgs
function minifyImgs() {
    return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images'))
}

// copy fonts
function fonts() {
    gulp.src(['./src/fonts/**/*']).
    pipe(gulp.dest('dist/assets/fonts'));
}

// copy icons
function icons() {
    gulp.src(['./src/icons/**/*']).
    pipe(gulp.dest('dist/assets/icons'));
}

// live-server
function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./src/html/**/*.html', html);
    gulp.watch('./src/images/*', minifyImgs);
    gulp.watch('./src/fonts/*', fonts);
    gulp.watch('./src/icons/*', icons);
    gulp.watch('./src/html/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('./src/images/*').on('change', browserSync.reload);
    gulp.watch('./src/fonts/*').on('change', browserSync.reload);
    gulp.watch('./src/icons/*').on('change', browserSync.reload);
}

exports.watch = watch;