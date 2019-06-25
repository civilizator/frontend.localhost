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
            gulp.src( options.js.source ),
            ( $.rigger() ),
            ( $.if( isDevelopment, $.sourcemaps.init() ) ),
            // ( $.uglify() ),
            ( $.if( isDevelopment, $.sourcemaps.write() ) ),
            ( gulp.dest( options.js.out ) ),
            ( reload( {stream: true} ) )
        ).on( 'error', $.notify.onError() );
    };
};



