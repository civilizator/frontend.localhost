"use strict";




(function ( $ ) {

    // var selector          = $( '#selector' );
    // var shuffle_container = $( '#shuffle_container' );
    //
    // selector.on( 'click', '[data-selects]', function () {
    //     shuffle_container.find( '[data-group="' + $( this )
    //             .attr( 'data-selects' ) + '"]' )
    //                      .css( {'display': 'none'} );
    // } );


    $( '.modal-trigger' ).leanModal();

    $( '.datepicker' ).pickadate( {
        selectMonths: true, // Creates a dropdown to control month
        selectYears : 15 // Creates a dropdown of 15 years to control year
    } );

    // $(document).ready(function(){
    //     $('.parallax').parallax();
    // });

    // Materialize.scrollFire( [{
    //     selector: "#starggered",
    //     offset  : 50,
    //     callback: function () {
    //         alert( "test" );
    //     }
    //
    // } ] );

    // $('.button-collapse').sideNav();
    // $('.parallax').parallax();

})( jQuery ); // end of jQuery name space

(function () {

    // shuffleContainer.shuffle( {
    //     sizer: sizer,
    //     speed: 500,
    //     easing: 'ease-out'
    // } );


    // $( '#btn_music' ).on( 'click', function () {
    //     shuffleContainer.shuffle( 'shuffle', function ( $el, shuffle ) {
    //         return $el.data( 'group ') == 'music';
    //     })
    // } );

})();

// $( document ).ready( function () {
// $('.parallax').parallax();
// $('.carousel.carousel-slider').carousel({full_width: true});
// $('.slider').slider({full_width: true});

// var $elmt = $( '.main-container' );
// $elmt.vegas({
//   slides: [
//     { src: '/img/stocksnap.io/sound.jpg' },
//     { src: '/img/stocksnap.io/sound-2.jpg' }
//   ],
//   animation: 'kenburns'
// });

// var options = [ {
//     selector: '#staggered-test', offset: 500, callback: function ( el ) {
//         Materialize.toast( "This is our ScrollFire Demo!", 1500 );
//     }
// } ];
// Materialize.scrollFire( options );


// var options = [ {
//     selector: '#staggered-test',
//     offset  : 500,
//     callback: function ( el ) {
//         return console.log( 'Hello: ' + el );
//     }
// } ];

// } );

