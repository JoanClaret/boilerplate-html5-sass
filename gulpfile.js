var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');


gulp.task('sass', function() {
	return gulp.src('scss/styles.scss')
	.pipe(sass({compress: false}).on('error', gutil.log))
	.pipe(minifyCSS({keepBreaks: false}))
	.pipe(gulp.dest('css'));
});


gulp.task('watch', ['sass'], function() {
  gulp.watch('scss/**/*.scss', ['sass']);
});

