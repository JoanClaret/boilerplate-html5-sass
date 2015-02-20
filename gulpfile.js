var gulp = require('gulp');							// La madre del cordero
var sass = require('gulp-sass');  					// SASS compiler
var minifyCSS = require('gulp-minify-css'); 		// CSS minify
var gutil = require('gulp-util');           		// Utility functions for gulp plugins (for example beep on errors)
var sourcemaps = require('gulp-sourcemaps');		// Identify source selectors with browser
var iconfont = require('gulp-iconfont');			// Generate icon fonts from several SVG icons
var iconfontCss = require('gulp-iconfont-css');		// Generate necessary css files to use iconfont
var fontName = 'Icons';								
var livereload = require('gulp-livereload');		// Automatically reload browser when saving a file
var notify = require('gulp-notify');				// Sweet notifications on your desktop
var plumber = require('gulp-plumber');				// Prevent pipe breaking caused by errors from gulp plugins


// Error handling

var onError = function (err) {
	gutil.beep();
	console.log( err );
	return notify().write(err);
};

// Tasks

gulp.task('sass', function() {
	return gulp.src('scss/styles.scss')
	.pipe( plumber({ errorHandler: onError }) )
	.pipe(sourcemaps.init())
	.pipe(sass({compress: false}).on('error', gutil.log))
	.pipe(minifyCSS({keepBreaks: false}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('css'))
	.pipe(livereload())
});


gulp.task('watch', ['sass'], function() {
	livereload.listen();
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