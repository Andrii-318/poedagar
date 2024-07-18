import gulp from "gulp";
import dartSass from "sass";
import gulpDartSass from "gulp-dart-sass";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import cleanCSS from "gulp-clean-css";
import { deleteAsync } from "del";
import { mkdirp } from "mkdirp";

const sass = gulpDartSass(dartSass);

// Шляхи до ваших файлів
const paths = {
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/styles/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/scripts/",
  },
};

// Задача для очищення папки dist
function clean() {
  return deleteAsync(["dist"]);
}

// Задача для створення необхідних папок
function createFolders() {
  return Promise.all([mkdirp(paths.styles.dest), mkdirp(paths.scripts.dest)]);
}

// Задача для обробки CSS
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(cleanCSS())
    .pipe(concat("styles.min.css"))
    .pipe(gulp.dest(paths.styles.dest));
}

// Задача для мінімізації та конкатенації JS
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

// Задача для спостереження за змінами
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(
  clean,
  createFolders,
  gulp.parallel(styles, scripts),
  watch
);

export { clean, createFolders, styles, scripts, watch, build };

// Додавання завдання за замовчуванням
gulp.task("default", build);
