"use strict";

const $           = require( 'gulp-load-plugins' )();
const gulp        = require( 'gulp' );
const combiner    = require( 'stream-combiner2' ).obj;
const browserSync = require( "browser-sync" );
const reload      = browserSync.reload;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
/*
 * set NODE_ENV=development
 * set NODE_ENV=production
 * */

module.exports = ( options ) => {
    return () => {
        return combiner(
            gulp.src( options.styles.source ),
            ( $.if( isDevelopment, $.sourcemaps.init() ) ),
            ( $.sass( {
                includePaths   : [ options.styles.includePaths ],
                outputStyle    : 'compressed',
                sourceMap      : true,
                errLogToConsole: true
            } ) ),
            ( $.if( isDevelopment, $.sourcemaps.write() ) ),
            // ( $.autoprefixer( {
            //     browsers: [ 'last 2 versions' ],
            //     cascade : false
            // } ) ),
            ( gulp.dest( options.styles.out ) ),
            ( reload( {stream: true} ) )
        ).on( 'error', $.notify.onError() );
    };
};



