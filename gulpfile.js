var gulp         = require('gulp');

//ブラウザリロード

const browserSync = require('browser-sync').create()

gulp.task('serve', done => {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html',
        },
    })
    done()
})

gulp.task('watch', () => {
    const browserReload = done => {
        browserSync.reload()
        done()
    }

    gulp.watch( './*.html', browserReload );
    gulp.watch( './css/*.css', browserReload );
    gulp.watch( './js/*.js', browserReload );
    gulp.watch( './scss/**/*.scss', gulp.task( 'sass' ) );
})


gulp.task('default', gulp.series('serve', 'watch'))



//CSS圧縮
var cleanCSS = require('gulp-clean-css');
var rename   = require("gulp-rename");

gulp.task('mincss', function() {
  return gulp.src("css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css/'));
});

//JS圧縮
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('minjs', function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js/'));
});

//画像圧縮 
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");

var imageminOption = [
  imageminPngquant({ quality: [ 0.65, 0.8 ] }),
  imageminMozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256
  }),
  imagemin.jpegtran(),
  imagemin.optipng(),
  imagemin.svgo()
];

gulp.task( 'imagemin', function() {
  return gulp
    .src( './img/base/*.{png,jpg,gif,svg}' )
    .pipe( imagemin( imageminOption ) )
    .pipe( gulp.dest( './img' ) );
});
//sassコンパイル ベンダープレフィックス追加
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./css'));
});


