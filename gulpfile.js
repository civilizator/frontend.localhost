"use strict";

const gulp = require( 'gulp' );

/*
 * set NODE_ENV=development
 * set NODE_ENV=production
 * */

function lazyRequireTask( taskName, path, options ) {
    options          = options || {};
    options.taskName = taskName;
    gulp.task( taskName, ( callback ) => {
        let task = require( path ).call( this, options );
        return task( callback );
    } );
}

const inFolder = 'materializecss';
const option = {
    styles: {
        modulePath  : './tasks/sass',
        source      : inFolder + '/styles/main.scss',
        includePaths: inFolder + '/styles/',
        out         : 'public/css'
    },
    js    : {
        modulePath  : './tasks/js',
        source      : inFolder + '/js/**.js',
        out         : 'public/js'
    },
    html  : {
        modulePath  : './tasks/html',
        source      : inFolder + '/*.html',
        out         : 'public'
    },
    img: {
        modulePath  : './tasks/img',
        source      : inFolder + '/img/**',
        // source      : ['frontend/img/**/*.jpg','frontend/img/**/*.png'],
        out         : 'public/img'
    },
    assets: {
        modulePath  : './tasks/assets',
        source      : inFolder + '/assets/**',
        out         : 'public'
    }
};

lazyRequireTask( 'styles', option.styles.modulePath, option );
lazyRequireTask( 'js',     option.js.modulePath,     option );
lazyRequireTask( 'html',   option.html.modulePath,   option );
lazyRequireTask( 'img',    option.img.modulePath, option );
lazyRequireTask( 'assets', option.assets.modulePath, option );
lazyRequireTask( 'clean',  './tasks/clean' );
lazyRequireTask( 'serve',  './tasks/serve' );


gulp.task( 'build', [ 'styles', 'js', 'html', 'img', 'assets' ] );

gulp.task( 'watch:styles', () => {
    gulp.watch( inFolder + '/styles/**/*.scss', [ 'styles' ] );
} );

gulp.task( 'watch:js', () => {
    gulp.watch( inFolder + '/js/**/*.js', [ 'js' ] );
} );

gulp.task( 'watch:html', () => {
    gulp.watch( inFolder + '/**/*.html', [ 'html' ] );
} );

gulp.task( 'watch:img', () => {
    gulp.watch( inFolder + '/img/**/*.*', [ 'img' ] );
} );

gulp.task( 'watch:assets', () => {
    gulp.watch( inFolder + '/assets/**/*.*', [ 'assets' ] );
} );

gulp.task( 'dev', [ 'watch:styles', 'watch:js', 'watch:html', 'watch:img', 'watch:assets', 'serve' ] );

gulp.task( 'dev2', [ 'watch:html', 'watch:styles', 'watch:js' ] );


