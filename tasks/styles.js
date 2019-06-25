"use strict";

const $        = require( 'gulp-load-plugins' )();
const gulp     = require( 'gulp' );
const combiner = require( 'stream-combiner2' ).obj;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
/*
 * set NODE_ENV=development
 * set NODE_ENV=production
 * */

module.exports = ( options ) => {
    return () => {
        return combiner(
            gulp.src( options.src ),
            ( $.if( isDevelopment, $.sourcemaps.init() ) ),
            ( $.stylus() ),
            ( $.if( isDevelopment, $.sourcemaps.write() ) ),
            ( $.autoprefixer( {
                browsers: [ 'last 2 versions' ],
                cascade : false
            } ) ),
            ( gulp.dest( options.out ) )
        ).on( 'error', $.notify.onError() );
    };
};

