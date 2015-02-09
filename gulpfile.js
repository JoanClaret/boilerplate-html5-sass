var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var fontName = 'Icons';

gulp.task('sass', function() {
	return gulp.src('scss/styles.scss')
  .pipe(sourcemaps.init())
	.pipe(sass({compress: false}).on('error', gutil.log))
	.pipe(minifyCSS({keepBreaks: false}))
  .pipe(sourcemaps.write())
	.pipe(gulp.dest('css'));
});

gulp.task('watch', ['sass'], function() {
  gulp.watch('scss/**/*.scss', ['sass']);
});
 
gulp.task('iconfont', function(){
  gulp.src(['images/svg/*.svg']) // svg folder
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'scss/lib/icons-template/_icons.scss', // The template path
      targetPath: '../scss/lib/_icons.scss', // The path where the (S)CSS file should be saved, relative to the path used in gulp.dest()
      fontPath: '../../fonts/' // Directory of font files relative to generated (S)CSS file (optional, defaults to ./).
    }))
    .pipe(iconfont({
      fontName: fontName
     }))
    .pipe(gulp.dest('fonts/'));
});