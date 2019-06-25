//= ../../bower_components/owl.carousel/dist/owl.carousel.min.js

var setupOwlCarousel = {
    loop       : true,
    margin     : 18,
    // autoplay: true,
    // autoplayTimeout: 3000,
    // autoplayHoverPause: true,
    // animateOut: 'slideOutDown',
    // animateIn: 'flipInX',
    // smartSpeed: 450,
    // nav:true,
    videoWidth : false,
    videoHeight: false,
    // items:1,
    // center:true,
    responsive : {
        0   : {items: 1},
        768 : {items: 2},
        940 : {items: 3},
        1160: {items: 4}
    }
};



$( document ).ready( function () {
    if ( typeof $.fn.owlCarousel !== "undefined" ) {
        $( '.owl-carousel-1' ).owlCarousel( setupOwlCarousel );
    } else {
        console.info( "plugin owl.carousel.min.js not connected" );
    }

    // $('.owl-carousel').owlCarousel();
} );



