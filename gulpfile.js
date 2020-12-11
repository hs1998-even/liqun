//导入模块
let {src,dest,watch} = require('gulp');
let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let concat = require('gulp-concat');

//创建任务
//复制
function fnCopyIndex(){
    return src('./src/index.html')
    .pipe(dest('./dist'));
}
//css
function fnCss(){
    return src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(cssnano())
    .pipe (rename({suffix : '.min'}))
    .pipe(dest('./dist/css'))
}
//js 
function fnJs(){
    return src('./src/js/**/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'))
}
//lib
function fnLib(){
    return src('./src/lib/**/*.js')
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/lib'));
}
//img
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
//page
function fnPage(){
    return src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/pages'))
}
//监听
function fnWatch(){
    watch('./src/index.html',fnCopyIndex);
    watch('./src/sass/*.scss',fnCss);
    watch('./src/js/**/*.js',fnJs)
    watch('./src/img/*',fnImg);
    watch('./src/pages/*.html',fnPage);
}
//导出模块
exports.copyIndex = fnCopyIndex;
exports.css = fnCss;
exports.js = fnJs;
exports.img = fnImg;
exports.page = fnPage;
exports.lib = fnLib;
exports.default = fnWatch;