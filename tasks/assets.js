"use strict";

const $        = require( 'gulp-load-plugins' )();
const gulp     = require( 'gulp' );
const combiner = require( 'stream-combiner2' ).obj;

module.exports = ( options ) => {
    return () => {
        return combiner(
            gulp.src( options.assets.source ),
            $.newer( options.assets.out ),
            $.debug( {title: 'assets'} ),
            gulp.dest( options.assets.out )
        );
    };
};

