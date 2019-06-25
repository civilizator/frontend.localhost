"use strict";

const $        = require( 'gulp-load-plugins' )();
const gulp     = require( 'gulp' );
const combiner = require( 'stream-combiner2' ).obj;
// const pngquant = require( 'imagemin-pngquant' );

module.exports = ( options ) => {
    return () => {
        return combiner(
            gulp.src( options.img.source ),
            $.newer( options.img.out ),
            $.debug( {title: 'img'} ),
            // $.imagemin( {
            //     progressive: true,
            //     svgoPlugins: [ {removeViewBox: false} ],
            //     use        : [ pngquant() ]
            // } ),
            gulp.dest( options.img.out )
        );
    };
};

