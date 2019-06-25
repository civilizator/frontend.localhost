"use strict";

const gulp        = require( 'gulp' );
const browserSync = require( 'browser-sync' ).create();

module.exports = () => {
    return () => {
        browserSync.init( {
            server: 'public'
        } );
        browserSync
            .watch( 'public/**/*.*' )
            .on( 'change', browserSync.reload );
    };
};


