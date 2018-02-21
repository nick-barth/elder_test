/*
 * DEPENDENCIES
 * ============
 */
const gulp = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const myth = require('gulp-myth');
const rename = require('gulp-rename');
const flatten = require('gulp-flatten');
const modifyCssUrls = require('gulp-modify-css-urls');
const imagemin = require('gulp-imagemin');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');

/*
 * CONFIG
 * ======
 */
const FILES_CSS         = ['./src/assets/css/**/*.css', './src/components/**/*.css'];
const FILES_IMAGES      = ['./src/components/**/img/*.{svg,jpg,png,gif,jpg}'];
const FILES_ICONS       = ['./src/components/**/icons/*.svg'];
const ASSETS_PATH       = '../server/assets/';
const ASSETS_CSS_PATH   = ASSETS_PATH + 'css/';
const ASSETS_IMG_PATH= ASSETS_PATH + 'images/';
const BROWSERS          = ['> 0.25%', 'last 3 versions', 'Firefox ESR', 'Opera 11'];

const ASSETS_ICONS_PATH = ASSETS_PATH + 'icons/';
const PUBLIC_ICONS_PATH = '/assets/icons/';
const ICONS_CSS_TPL     = './src/components/icon/icons.tmpl';

/*
 * PRIVATE TASKS
 * =============
 */

/*
 * Compile CSS
 * --
 * Concat, postprocess with Myth, add sourcemaps, add prefixes
 */
gulp.task('css', function () {
	return gulp.src(FILES_CSS)
		.pipe(concat('bundle.css'))
		.pipe(myth({
			sourcemap: true,
			browsers: BROWSERS
		}))
		.pipe(modifyCssUrls({
			modify: function (url) {
				return url.replace('assets/img', 'assets/img');
			}
		}))
		.pipe(gulp.dest(ASSETS_CSS_PATH))
    ;
});

/*
 * Minify CSS
 * --
 * Contact, postprocess with Myth, add prefixes and minify with MinifyCSS
 * (MinifyCSS does a better job than Myth minifier)
 */
gulp.task('css.min', function () {
	return gulp.src(FILES_CSS)
		.pipe(concat('bundle.min.css'))
		.pipe(myth({
			browsers: BROWSERS
		}))
		.pipe(minifyCSS())
	    .pipe(gulp.dest(ASSETS_CSS_PATH))
    ;
});

/*
 * Images
 * --
 * Move and Compress images
 */
gulp.task('images', function () {
	gulp.src(FILES_IMAGES)
		.pipe(imagemin())
		.pipe(flatten({ includeParents: 1 }))
		.pipe(gulp.dest(ASSETS_IMG_PATH))
	;
});

/*
 * SVG Icons
 * --
 * Generate webfonts from svg icons
 */
gulp.task('icons', function () {
	return gulp.src(FILES_ICONS)
		.pipe(
			iconfont({
				fontName: 'icons',
				normalize: true,
				appendCodepoints: true,
				fontHeight: 1500,
				centerHorizontally: true,
				fixedWidth: true,
				formats: ['ttf', 'eot', 'woff', 'woff2']
			})
		)
		.on('glyphs', function (glyphs) {
			gulp.src(ICONS_CSS_TPL)
				.pipe(
					consolidate('lodash', {
						glyphs: glyphs,
						fontName: 'icons',
						fontPath: ASSETS_ICONS_PATH,
						webFontPath: PUBLIC_ICONS_PATH,
						className: 'icon'
					})
				)
				.pipe(rename('icons.css'))
				.pipe(
					gulp.dest('./src/components/icon/')
				);
		})
		.pipe(gulp.dest(ASSETS_ICONS_PATH))
	;
});

/*
 * DEV TASKS
 * =========
 */

/*
 * Watch files for changes
 */
gulp.task('watch', function () {
	gulp.watch(FILES_CSS, ['css', 'css.min']);
});

/*
 * Default task
 */
gulp.task('default', ['watch', 'css', 'css.min', 'images']);

/*
 * Build task for production
 */
gulp.task('build', ['css', 'css.min', 'images', 'icons']);
