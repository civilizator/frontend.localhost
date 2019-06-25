(() => {

    var options = {
        num : 0,
        el  : {},
        val : 0.3,
        time: 400

    };


    function box( set ) {
        var mel       = set.el;
        var outerBox  = mel.find( $( '.outerBox' ) );
        var innerBox  = mel.find( $( '.innerBox' ) );
        var boxParent = outerBox.parent();
        var elc, ell, reqCp, sI, num;
        num           = set.num;

        switcherCtrl( set );

        boxParent.css( {'width': mel.width() * (outerBox.length) + 'px'} );
        outerBox.css( {'width': mel.width() + 'px'} );

        function switcherCtrl( opt ) {
            if ( opt.button ) {
                opt.button.removeClass( 'active' );
                opt.button.eq( num ).addClass( 'active' );
            }

            boxParent.css( {
                'transform'         : 'translateX(' + -opt.el.width() * num + 'px) translateZ(0)',
                '-webkit-transition': opt.time + 'ms',
                'transition'        : 'transform ' + opt.time + 'ms ease'
            } );
            elc = opt.el.find( outerBox );
            ell = opt.el.offset().left;

            elc.eq( num ).addClass( 'active' );
            elc.not( elc.eq( num ) ).removeClass( 'active' );
            //??????????????
            cancelAnimationFrame( reqCp );
            !function animateBox() {
                elc.each( function ( index, element ) {
                    $( element ).find( innerBox ).css( {
                        'transform': 'translateX(' + Math.floor( ((-$( element ).offset().left) + ell) * opt.val ) + 'px) translateZ(0)'
                    } );
                } );
                //???????????
                reqCp = requestAnimationFrame( animateBox );
            }();

            clearInterval( sI );
            sI = setInterval( function () {
                //??????????
                cancelAnimationFrame( reqCp );
                clearInterval( sI );
            }, opt.time + 6e3 );
        }
    }


    var tabsSidebar = $( '#tabsSidebar' );

    tabsSidebar.on( 'click', '.button-archive', function () {
        var $this          = $( this );
        var $buttonArchive = $( '#buttonArchive' );
        if ( !$this.hasClass( 'active' ) ) {

            options.el  = $( '#archiveBox' );
            options.num = $this.index();

            elementsActive( $buttonArchive.find( '.button-archive' ), options.num );
            markActive( $buttonArchive.find( '.mark-archive-button' ), $this, options.time );

        }

        box( options );
        options.el.css( {
            'height'    : options.el.find( '.innerBox' ).eq( options.num ).outerHeight() + 'px',
            'transition': options.time + 'ms'
        } );
    } );

//Todo: mark active
    function markActive( el, fromEl, time ) {
        el.css( {
            'width'     : fromEl.outerWidth() + 'px',
            'height'    : fromEl.outerHeight() + 'px',
            'transform' : 'translate(' + fromEl.position().left + 'px, ' + fromEl.position().top + 'px)',
            'transition': time + 'ms'
        } );
    }

//Todo: add remove class active
    function elementsActive( el, num ) {
        el.eq( num ).addClass( 'active' );
        el.not( el.eq( num ) ).removeClass( 'active' );
    }


    var nameFrame = $( containerWatchResizeTab );
    nameFrame.resize( function () {
        tabsSidebar.find( '.button-archive' ).eq( options.num ).trigger( 'click' );
    } );


})();

