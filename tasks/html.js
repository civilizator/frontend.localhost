"use strict";

const $           = require( 'gulp-load-plugins' )();
const gulp        = require( 'gulp' );
const combiner    = require( 'stream-combiner2' ).obj;
const browserSync = require( "browser-sync" );
const reload      = browserSync.reload;

module.exports = ( options ) => {
    // console.log( 'Hello: ' + options.out );
    return () => {
        return combiner(
            gulp.src( options.html.source ),
            ( $.rigger() ),
            ( gulp.dest( options.html.out ) ),
            ( reload( {stream: true} ) )
        ).on( 'error', $.notify.onError() );
    };
};



