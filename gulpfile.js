// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var stylish = require('jshint-stylish');

var scssPath = 'scss/style.scss';
var jsPath = 'js/*';
// var cssPath = './style.css';

// Lint Task
// gulp.task('lint', function() {
//     return gulp.src( 'app/webroot/js/*.js')
//         .pipe(jshint())
//         //.pipe(jshint.reporter('default'));
//         .pipe(jshint.reporter('jshint-stylish'));
// });

// Compile Our Sass
gulp.task('sass', function() {

        return sass(scssPath, { style: "compressed", sourcemap: true })
          .on('error', function (err) {
            console.error('Error!', err.message);
          })
        .pipe(autoprefixer({
          browsers: ['last 3 versions'],
          cascase: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./"));

});


// // Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src([
//                       //'./js/angular.min.js',
//                       './js/vendor/angular.min.js',
//                       './js/app/analytics.js'])


//         .pipe(concat('ms.js'))
//         //.pipe(sourcemaps.init()) //Uncommnet this and below to generate source map
//         .pipe(uglify()) //Uncomment to minify
//         //.pipe(sourcemaps.write('./js/'))

//         .pipe(gulp.dest('./js/dist'))
//         ;
// });

// Watch Files For Changes
gulp.task('watch-scss', function() {
    gulp.watch(scssPath, ['sass']);
});
gulp.task('watch-js', function() {
    gulp.watch(jsPath, ['lint', 'scripts']);
});

// Browser Sync
gulp.task('browser-sync', function () {
   var files = [
      '**/*.html',
      //'scss/**/*.scss',
      '**/*.css',
      //'**/*.png',
      //'**/*.jpg',
      //'**/*.jpeg',
      'img/*',
      '**/*.js'
   ];

   browserSync.init(files, {
        // proxy: "randomtattoo.dev" //this is the local dev url

        server: {
            baseDir: "./"
        }


   });
});

// Default Task
//gulp.task('default', ['sass', 'watch-scss', 'watch-js', 'browser-sync']);
gulp.task('default', ['sass', 'watch-scss', 'browser-sync']);
