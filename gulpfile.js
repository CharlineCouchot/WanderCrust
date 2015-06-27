var gulp 			= require('gulp');
var autoprefixer 	= require('gulp-autoprefixer');
var browserSync 	= require('browser-sync').create();
var imagemin 		= require('gulp-imagemin');
var uglify 			= require('gulp-uglify');
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
    .pipe(gulp.dest('./css/min'));
    .pipe(browserSync.stream());
});


// IMAGES
//----------------------------------------------

gulp.task('images', function() {
  return gulp.src('./images/')
    .pipe(
	  imagemin({
		  optimizationLevel: 3,
		  progessive: true,
		  interlaced: true
	  })
  )
    .pipe(gulp.dest('./images'))
    .pipe(size());
	.pipe(browserSync.stream());
});

// JS
//----------------------------------------------
gulp.task('js', function() {
	gulp.src('./js/*.js')
	.pipe(
	  uglify()
	)
	.pipe(gulp.dest('./js/min'))
	.pipe(size());
	.pipe(browserSync.stream());
});