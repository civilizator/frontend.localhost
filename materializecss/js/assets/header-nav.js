$( document ).ready( function () {

    function active( el, fromEl, time ) {
        el.css( {
            'width'     : fromEl.outerWidth() /*- 8*/ + 'px',
            'height'    : fromEl.outerHeight() + 'px',
            'transform' : 'translate(' + fromEl.position().left + 'px, ' + fromEl.position().top + 'px)',
            'transition': time + 'ms'
        } );
    }

    var mark       = '.mark-btn-';
    var header_nav = $( '#header_nav' );
    // var mark_btn   = header_nav.find( '' + mark.match( /^#[0-9]+\// ) );
    var mark_btn   = header_nav.find( mark + 1 );


    header_nav.on( 'click', '.btn', function () {
        var $this = $( this );
        active( mark_btn, $this, 600 );
    } );

    active( mark_btn, header_nav.find( 'a.active' ), 400 );

    const $window = $( window );
    const $header = $( '.header' );

    const hasClasses = 'header-scroll pink lighten-1 z-depth-5';
    function caretaker( el ) {
        var $this = $( el );
        if ( $this.scrollTop() > 50 ) {
            if ( !$header.hasClass( hasClasses ) ) {
                $header.addClass( hasClasses );
            }
        } else {
            if ( $header.hasClass( hasClasses ) ) {
                $header.removeClass( hasClasses );
            }
        }
    }

    $window.on( 'scroll', function () {
        caretaker( this );
    } );

    caretaker( window );
} );
