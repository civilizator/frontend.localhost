(function ( $ ) {
    "use strict";
    const photos          = $( '.photos' );
    const selector        = $( '#selector' );
    const select          = selector.find( '[data-filter]' );
    const filterContainer = $( ".filter-container" );
    const fi              = filterContainer.find( '.filtr-item' );
    const progressFilter  = $( '.progress-filter' );
    const dataFilterFirst = select.first().attr( 'data-filter' );

    select.click( function () {
        const $this      = $( this );
        const $thisText  = $this.text();
        const datafilter = $this.attr( 'data-filter' );
        if ( !$this.hasClass( 'active' ) ) {
            var $toastContent = $(`<span>${$thisText}</span>`);
            Materialize.toast($toastContent, 1000);
            select.removeClass( 'active' );
            $this.addClass( 'active' );
            if ( `${dataFilterFirst}` !== `${datafilter}` ) {
                initGallery( $( `[data-category="${datafilter}"]` ) );
                return;
            }
            initGallery( fi );
        }
    } );

    initGallery( fi );

    filterContainer.filterizr();

    function initGallery( obj ) {
        obj.magnificPopup( {
            delegate: '.visibility',
            type    : 'image',
            gallery : {
                enabled: true
            },
        } );
    }

})( jQuery );
