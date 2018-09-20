const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const del = require('del');
const connect = require('gulp-connect');

// concatenate, minify, and copy all of projects JavaScript files into all.min.js file
gulp.task("scripts", ["clean"], () => {
  return gulp.src("./js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("all.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/scripts"));
});

// compile the project’s SCSS files into CSS, then concatenate and minify into an all.min.css file
gulp.task("styles", ["clean"], () => {
  return gulp.src("./sass/global.scss")
    .pipe(sourcemaps.init())
    .pipe(concat("all.min.css"))
    .pipe(sass())
    .pipe(csso())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/styles"))
    .pipe(connect.reload());
});

// optimize the size of the project’s JPEG and PNG files
gulp.task("images", ["clean"], () => {
  return gulp.src("./images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/content"))
});

// copy index.html to dist
gulp.task("html", ["clean"], () => {
  return gulp.src("./index.html*")
    .pipe(gulp.dest("./dist/"))
});

// copy icons to dist
gulp.task("icons", ["clean"], () => {
  return gulp.src("./icons/**/*")
    .pipe(gulp.dest("./dist/icons"))
});

// delete all of the files and folders in the dist folder.
gulp.task("clean", () => {
  del('dist/*');
});

// watch sass files for changes
gulp.task("watch", () => {
  gulp.watch("./sass/**/*", ["build"]);
})


// run the clean, scripts, styles, and images tasks
gulp.task("build", ["scripts", "styles", "images", "html", "icons"]);

// Start a local server after all build tasks are complete
gulp.task("serve", ["build"], () => {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task("default", ["serve", "watch"])
