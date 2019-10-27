'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-csso');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
// const uglify = require('gulp-uglify');
//const babel = require('gulp-babel'); concat    .pipe(uglify())

function clear () {
    return del('docs/*');
}

function styles () {
    return gulp.src('./src/sass/style.scss')
               .pipe(plumber())
               .pipe(sass())
               .pipe(postcss([ autoprefixer({ grid: 'autoplace' }) ]))
               .pipe(gulp.dest('./src/css'))
               .pipe(minify())
               .pipe(gulp.dest('./docs/css'))
               .pipe(browserSync.stream());
}

// function scripts() {
//     return gulp.src([
//             'src/js/libs/stickyfill.min.js',
//             'src/js/libs/tiny-slider.min.js',
//             'src/js/scripts.js'
//         ])
//          .pipe(plumber())
//.pipe(babel())
//         .pipe(concat('main.js'))
// .pipe(uglify({
//     toplevel: true
// }))
//         .pipe(gulp.dest('src/js'));
// 

function img () {
    return gulp.src('./src/img/**/*')
            //    .pipe(imagemin([
            //         imagemin.optipng({optimizationLevel: 3}),
            //         imagemin.jpegtran({progressive: true}),
            //         imagemin.svgo({
            //             plugins: [
            //                 {removeViewBox: true},
            //                 {cleanupIDs: false}
            //             ]
            //         })
            //    ]))
               .pipe(gulp.dest('./docs/img'));
}

function html () {
    return gulp.src('./src/*.html')
               .pipe(gulp.dest('./docs'));
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './docs/'
        },
        // tunnel: true
    });

    gulp.watch('./src/css/**/*.css', styles);
    // gulp.watch('./src/*.html', html);
}

let build = gulp.series(clear, gulp.parallel(styles, img, html));

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
