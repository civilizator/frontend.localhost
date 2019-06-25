"use strict";

(function () {

    const getWindow = $( window );
    const mainpage = $( '.main-page' );

    function getHeight( obj ) {
        return obj.height();
    }

    function setHeight( obj, h ) {
        obj.height( h );
    }
    console.log( getHeight( getWindow ) );
    setHeight( mainpage, getHeight( getWindow ) );

    getWindow.resize( function () {
        setTimeout( function () {
            console.log( getHeight( getWindow ) );
            setHeight( mainpage, getHeight( getWindow ) );
        }, 50 );
    } );
})();
