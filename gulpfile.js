const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');

// concatenate, minify, and copy all of projects JavaScript files into all.min.js file
gulp.task("scripts", () => {
  gulp.src("./js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("all.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/scripts"));
});

// compile the project’s SCSS files into CSS, then concatenate and minify into an all.min.css file
gulp.task("styles", () => {
  gulp.src("./sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(concat("all.min.css"))
    .pipe(sass())
    .pipe(csso())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/styles"));
});

// optimize the size of the project’s JPEG and PNG files
gulp.task("images", () =>
  gulp.src("./images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/content"))
);
