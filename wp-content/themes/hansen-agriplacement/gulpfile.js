var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require("gulp-autoprefixer");
var browsersync = require('browser-sync').create();

gulp.task('default', function(){

});

gulp.task('sass', function(){
    return gulp.src("./assets/sass/app.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie <= 9'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../public/css'))
        .pipe(browsersync.stream());
});

gulp.task('js', function(){
    return gulp.src([        
        "./js/alertify.js",
        "./js/velocity.min.js",
        "./js/outdatedbrowser.min.js",
        "./js/breakpoints.js",
        "./js/hoverIntent.js",
        "./js/supersubs.js",
        "./js/superfish.js",
        "./js/slick.min.js",
        "./js/js.cookie.js",
        "./js/jquery.serialize-object.js",
        "./js/jquery.dynatable.js",
        "./js/requestAnimationFrame.js",
        "./js/responsive-tables.js",
        "./js/script.js",
    ])
    .pipe(babel().on('error',console.log))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js'))
});

gulp.task('start', function(){
    //gulp.watch(['./assets/sass/**/*.scss'], ['sass']);
    gulp.watch(['./js/**/*.js'], ['js']);
    //gulp.watch(['/views/**/*.blade.php'], function(){
    //    browsersync.reload();
    //});
});