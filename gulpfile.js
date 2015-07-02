var gulp 			= require('gulp');
var autoprefixer 	= require('gulp-autoprefixer');
var browserSync 	= require('browser-sync').create();
var imagemin        = require('gulp-imagemin');
var minifycss       = require('gulp-minify-css');
var uglify 			= require('gulp-uglify');
var rename          = require('gulp-rename');
var size   			= require('gulp-size');

// SERVEUR
//-----------------------------------------------
gulp.task('serve', function() {
    browserSync.init({
        server : {
            baseDir : './'
        }
    });
    
    gulp.watch('./css/*.css', ['styles']);
    gulp.watch('./*html').on('change', browserSync.reload);
    
})

// SURVEILLANCE
//-----------------------------------------------

gulp.task('watch', function() {
   // Watch .js files
  gulp.watch('js/*.js', ['js']);
   // Watch .scss files
  gulp.watch('css/*.css', ['styles']);
   // Watch image files
  gulp.watch('images/*', ['images']);
 });

// STYLES
//-----------------------------------------------
gulp.task('styles', function() {
    gulp.src('./css/*.css')
    .pipe(
        autoprefixer({
            browsers : ['> 5%', 'IE 9']
        })
    )
	.pipe(
		minifycss({
			keepSpecialComments: 0
		})
	)
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/min'));
});


// IMAGES
//----------------------------------------------

gulp.task('images', function() {
  return gulp.src('./images/*')
    .pipe(
	  imagemin({
		  optimizationLevel: 3,
		  progessive: true,
		  interlaced: true
	  })
  )
    .pipe(gulp.dest('./images/compressed/'))
});

// JS
//----------------------------------------------
gulp.task('js', function() {
	gulp.src('./js/*.js')
	.pipe(
	  uglify()
	)
    .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./js/min'))
});

gulp.task('default', ['styles', 'images', 'js', 'watch'] );