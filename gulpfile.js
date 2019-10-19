var gulp = require('gulp'),
    watch = require('gulp-watch'),
    pug = require('gulp-pug'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    //sass = require('gulp-sass'),
    LessFunctions = require('less-plugin-functions'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    merge = require('merge-stream'),
    rimraf = require('rimraf'),
    rigger = require('gulp-rigger'),
    buffer = require('vinyl-buffer'),
    strip = require('gulp-strip-comments'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    critical = require('critical').stream;
var lessFunctions = new LessFunctions();

/*******************/
var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        svg: 'build/',
        img: 'build/images/',
        root: 'build/',
        fonts: 'build/fonts/'
    },
    src: {
        html: './app/pug/*.pug',
        js: './app/js/custom/*.js',
        jsvendor: './app/js/vendor/**/*.js',
        less: './app/less/main.less',
        lessvendor: './app/less/vendor.less',
        img: ['./app/images/**/*.*'],
        fonts: './app/fonts/**',
        root: ['./app/*', './app/.*', './app/*.*','!./app/{less, less/**}',  '!./app/{pug, pug/**}', , '!./app/{doc, doc/**}']
    },
    watch: {
        html: './app/pug/**/*.*',
        js: './app/js/custom/*.js',
        jsvendor: './app/js/vendor/*.js',
        less: './app/less/**/*.less',
        lessvendor: './app/less/plugins/**/*.css',
        img: './app/images/**/*.*',
        fonts: './app/fonts/**/*.*',
        root: './app/*'

    },
    clean: 'build/'
};
//pug
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.build.html));
});
//less
gulp.task('less:build', function () {
    gulp.src(path.src.less)
        .pipe(less({
            plugins: [lessFunctions]
        }))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css));
});
gulp.task('lessvendor:build', function () {
    gulp.src(path.src.lessvendor)
        .pipe(less())
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(gulp.dest(path.build.css));
});
//js
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(uglify({
        //   mangle: false
        // }))
        //.pipe(removeUseStrict())
        .pipe(gulp.dest(path.build.js));
});
gulp.task('jsvendor:build', function () {
    gulp.src(path.src.jsvendor)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});
//img
gulp.task('image:build', function () {
    gulp.src(path.src.img)
    //.pipe(image())
    // .pipe(imagemin({
    //  progressive: true,
    //  svgoPlugins: [{removeViewBox: false}],
    //  use: [pngquant()]
    // }))
        .pipe(gulp.dest(path.build.img));
});

// other
gulp.task('root:build', function () {
    gulp.src(path.src.root)
        .pipe(gulp.dest(path.build.root));
});
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


// Запуск тасков
gulp.task('watch', function () {
    watch([path.watch.html], function () {
        gulp.start('html:build');
    });
    watch([path.watch.less], function () {
        gulp.start('less:build');
    });
    watch([path.watch.lessvendor, './app/less/vendor.less'], function () {
        gulp.start('less:build');
        gulp.start('lessvendor:build');
    });
    watch([path.watch.js], function () {
        gulp.start('js:build');
    });
    watch([path.watch.jsvendor], function () {
        gulp.start('jsvendor:build');
    });
    watch([path.watch.img], function () {
        gulp.start('image:build');
    });

    watch([path.watch.root], function () {
        gulp.start('root:build');
    });
});
gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});
gulp.task('build', [
    'html:build',
    'fonts:build',
    'less:build',
    'lessvendor:build',
    'js:build',
    'jsvendor:build',
    'image:build',
    'root:build'
]);
gulp.task('default', ['build', 'watch']);