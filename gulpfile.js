const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

gulp.task("styles", function () {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/scripts/**/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", function () {
  gulp.watch("src/styles/**/*.scss", gulp.series("styles"));
  gulp.watch("src/scripts/**/*.js", gulp.series("scripts"));
});

gulp.task("default", gulp.series("styles", "scripts", "watch"));
