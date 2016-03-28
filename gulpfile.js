var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect')

/*gulp.task('connect', function () {
    connect.server({
        root: 'src',
        port: 4000
    })
});

gulp.task('sass', function() {
        return gulp.src("src/app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/app/css"))
})

gulp.task('watch', function() {
    gulp.watch('src/app/scss/style.scss', ['sass'])
})

gulp.task('default', ['connect', 'watch'])*/

// Static Server + watching scss/html files
gulp.task('serve', ['wiredep','sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/app/scss/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch('bower.json', ['wiredep']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/app/css"))
    .pipe(browserSync.stream());
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('src/*.html')
    .pipe(wiredep({
      directory: 'src/bower_components'
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('default', ['serve']);