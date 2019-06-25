"use strict";

$( document ).ready( function () {

    function customCallbackFunc(  ) {
        // console.log( 'class' );
    }
    function customCallbackFunc1(  ) {
        // console.log( 'other-class' );
    }

    var options = [
        {
            selector: '.class',
            offset  : 200,
            callback: customCallbackFunc
        },
        {
            selector: '.other-class',
            offset  : 200,
            callback: function () {
                customCallbackFunc1();
            }
        },
    ];

    Materialize.scrollFire( options );
} );



