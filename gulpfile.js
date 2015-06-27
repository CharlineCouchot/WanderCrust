var gulp = require('gulp');

var  autoprefixer = require('gulp-autoprefixer');
var  browserSync = require('browser-sync').create();

// SERVEUR
//-----------------------------------------------
gulp.task('serve', function() {
    browserSync.init({
        server : {
            baseDir : './'
        }
    });
    
    gulp.watch('./*css', ['styles']);
    gulp.watch('./*html').on('change', browserSync.reload);
    
})

// STYLES
//-----------------------------------------------
gulp.task('styles', function() {
    gulp.src('./*.css')
    .pipe(
        autoprefixer({
            browsers : ['> 5%', 'IE 9']
        })
    )
    .pipe(gulp.dest('./build'));
    .pipe(browserSync.stream());
});