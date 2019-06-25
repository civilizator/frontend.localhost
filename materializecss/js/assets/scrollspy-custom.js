"use strict";

$( document ).ready( function () {

    // $( '.scrollspy' ).scrollSpy();

    const $header_nav = $( '#header_nav' );
    const $body       = $( 'body' );

    $header_nav.on( 'click', 'a', function () {
        var $this     = $( this );
        var $thisAttr = $this.attr( 'href' );
        var $id       = $( $thisAttr + '-nav' );

        if ( $id.attr( 'id' ) !== undefined ) {
            toTopper( $body, Math.floor( $id.offset().top ) - 80, 700 );
        }

    } );

    function toTopper( el, val, time ) {
        el.stop( !0, !1 ).animate( {
            scrollTop: val
        }, time, 'easeInOutSine' );
    }
} );


