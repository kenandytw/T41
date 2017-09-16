var laravelElixir = require('laravel-elixir');
// gulp
var gulp           = require('gulp'),
    gulpUglify     = require('gulp-uglify'),
    gulpSass       = require('gulp-sass'),
    gulpPlumber    = require('gulp-plumber'),
    gulpLivereload = require('gulp-livereload'),
    gulpImagemin   = require('gulp-imagemin'),
    gulpNotify     = require("gulp-notify"),
    gulpFilesize   = require('gulp-filesize'),
    gulpConcat     = require('gulp-concat'),
    gulpUtil       = require('gulp-util'),
    gulpMinifyCSS  = require('gulp-minify-css'),
    gulpRename     = require('gulp-rename'),
    gulpCleanCSS   = require('gulp-clean-css'),
    gulpCSSMin     = require('gulp-cssmin'),
    gulpCompass    = require('gulp-compass'),
    compass   = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    combineMq = require('gulp-combine-mq');


gulp.task('compass',function(){
    return gulp.src('./style/scss/*.scss')
        .pipe(compass({
//        sourcemap: true,
        time: true,
        css: './style/css/',
        sass: './style/scss/',
        style: 'compact' //nested, expanded, compact, compressed
    }))
        .pipe(gulp.dest('./style/css/'));
}); 

gulp.task('watch',function(){
    gulp.watch('./style/**/*.scss',['compass']);
});

gulp.task('prefixer', function(){
    gulp.src('./style/css/*.css')
        .pipe(autoprefixer({
        cascade: false
    }))
        .pipe(gulp.dest('./style/css'))
});

gulp.task('combineMq', function () {
    return gulp.src('./style/css/*.css')
        .pipe(combineMq({
        beautify: false
    }))
        .pipe(gulp.dest('./style/css'));
});

//gulp.task('style',['compass','combineMq','prefixer']);


gulp.task('default', ['compass','combineMq','prefixer']);

