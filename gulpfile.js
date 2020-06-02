const gulp = require('gulp');
const del = require('delete');
const sass = require('gulp-sass');
const hash = require('gulp-hash');
var rename = require("gulp-rename");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const svgmin = require('gulp-svgmin');
const htmlmin  = require('gulp-html-minifier-terser');
const imagemin = require('gulp-imagemin');


let styleFiles = [
  './node_modules/normalize.css/normalize.css',
	'./src/scss/style.scss'
]

// compile scss, concat css files, autoprefix, minimize

function style() {
	return gulp.src(styleFiles)
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('style.css'))
	// .pipe(hash())
	.pipe(autoprefixer({
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.stream());
}

// transpile and minimize js

function script() {
	return gulp.src('./src/js/**/*.js')
		.pipe(concat('bundle.js'))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		// .pipe(hash())
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

// minify svg images

function minifySvg() {
	return gulp.src('./static/svg/**/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest('./build/static/svg'))
}

// minify html file

function minifyHtml() {
	return gulp.src('./index.html')
		.pipe(htmlmin({ collapseWhitespace: false }))
		.pipe(gulp.dest('./build'))
}

// minify all type images

function minifyImages() {
	return gulp.src('./static/**')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/static'))
}

// delete build folder
 
function clean() {
	return del(['./build']);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('./src/scss/**/*.scss', style);
	gulp.watch('./src/js/**/*.js', script)
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}


exports.minifyImages = minifyImages;
// exports.minifyHtml = minifyHtml;
exports.clean = clean;
exports.style = style;
exports.script = script;
exports.watch = watch;
exports.build = gulp.series(clean, gulp.parallel(style, script, minifyImages));