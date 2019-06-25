"use strict";
$( function () {


    //$('[data-switchPages] a').each(function () {
    //    var href = $(this).attr('href');
    //    $(this).removeAttr('href').click(function () {
    //        window.location = href;
    //    });
    //});

    //$(".loading-main").delay(1e3).fadeIn(1e2).css({'transform-origin': '50% -200%', 'animation': 'in-page .7s ease'});
    //$(window).load(function () {
    //    setTimeout(function () {
    //        $(".loading-main").css({
    //            'transform-origin': '50% 800%',
    //            'animation': 'out-page .7s cubic-bezier(0.4, 0, 1, 1) forwards'
    //        }).fadeOut(1e3);
    //        $(".preloaderBackground").delay(1e3).fadeOut(7e2);
    //    }, 5e2);
    //});


    //$('<div class="overlay-background"></div>').prependTo("body");

    /* append to body player - audio tag */
    //$('<audio id="audioPlayer" src=""></audio>').appendTo("body");


    var powFotorama = 1;// 0, 1
    //var   fotorama = function () {};

    //if (powFotorama === 1) {
    //    $.getScript('js/fotorama.js');
    //}

    /* append to body script beeper - audio effect hover and click */
    //$.getScript('js/beeper-1.0.0.js');

    function getId( str ) {
        return document.getElementById( str );
    }

    function cycleGetId( el, box ) {
        for ( var i = 0; el.length > i; i++ ) {
            box[ i ] = getId( el[ i ] );
        }
    }

    var variable            = [];
    variable.body           = getId( 'body' );
    variable.mainPage       = [];
    variable.mainPage.str   = [ 'page-1', 'page-2', 'page-3', 'page-4', 'page-5', 'page-6' ];
    variable.mainPage.getId = [];
    variable.mainPage.data  = [];
    cycleGetId( variable.mainPage.str, variable.mainPage.getId );
    variable.menu = getId( 'menu' );

    var BODY                 = $( 'body' );
    var $controlPanel        = $( '#controlPanel' );
    var $hiddenControlPanel  = BODY.find( '.click-hidden-control-panel' );
    var $containerMainPhoto  = $( '#containerMainPhoto' );
    var $videoContainer      = $( '#videoContainer' );
    var $pages               = $( '#pages' );
    var HOME                 = $( '#page-1' );
    var ABOUT                = $( '#page-2' );
    var AUDIO                = $( '#page-3' );
    var PHOTO                = $( '#page-4' );
    var BLOG                 = $( '#page-5' );
    var FEEDBACK             = $( '#page-6' );
    var MENU                 = $( '#menu' );
    var $subControlPanel     = $( '.sub-controlPanel' );
    var subPages             = $( '#subPages' );
    var data_page            = $( '[data-page]' );
    var data_subpage         = $( '[data-subpage]' );
    var data_sub_load        = $( '[data-sub-load]' );
    var blog_auto_navigation = $( '.blog-auto-navigation' );
    var idDataSubAbout       = $( '#idDataSubAbout' ),
        idDataSubPhoto       = $( '#idDataSubPhoto' ),
        idDataSubBlog        = $( '#idDataSubBlog' ),
        idDataSubFeedback    = $( '#idDataSubFeedback' ),
        idDataBlog           = $( '#idDataBlog' ),
        idMainFooter         = $( '#idMainFooter' );

    var $setupBox = $( '#setupBox' );
    var $containerBlogTopBottom = $( '#containerBlogTopBottom' );

    var blogPage        = $( '.blogPage' ),
        data_about      = $( '[data-about]' ),
        data_audio      = $( '[data-audio]' ),
        //blogPage_li     = blogPage.find('li'),
        data_blog       = $( '[data-blog]' ),
        loadingPageName = $( '.loadingPage' ),
        data_feedback   = $( '[data-feedback]' );

    blogPage.find( "li:first" ).addClass( "activePageBlog" );

    var menuPages     = $( '.menuPages' ),
        menuPages_li  = menuPages.find( 'li' ),
        pages         = $( '.pages' ),
        $activeBorder = menuPages.find( 'li.activeBorder' ),
        $boxMenuPages = $( '.boxMenuPages' ),
        mbH,
        mbFoolH;

    var _aHome     = $( 'a#home' ),
        _aAbout    = $( 'a#about' ),
        _aAudio    = $( 'a#audio' ),
        _aPhoto    = $( 'a#photo' ),
        _aBlog     = $( 'a#blog' ),
        _aFeedback = $( 'a#feedback' );


    function fotoramaResize( time ) {
        setTimeout( function () {
            if ( powFotorama === 1 ) {
                $( '.fotorama' ).resize();
            }
        }, time );
    }


    function eventOpenPage() {
        if ( !HOME.hasClass( 'open' ) ) {
            $pages.addClass( 'open' );
            BODY.addClass( 'open-background' );
            mainPageOut();
        } else {
            $pages.removeClass( 'open' );
            BODY.removeClass( 'open-background' );
            mainPageIn();
        }

        if ( $( '[data-page]' ).not( HOME ).hasClass( 'open' ) ) {
            $( '.scroll-bg' ).css( 'right', '0' );
        } else {
            $( '.scroll-bg' ).css( 'right', '' );
        }
    }

    function mainPageIn() {
        //$(".box-name-site").stop(!0, !1).delay(5e2).fadeIn(5e2).removeClass('out-page').addClass('in-page');
    }

    function mainPageOut() {
        //$(".box-name-site").stop(!0, !1).removeClass('in-page').addClass('out-page').fadeOut(350);
    }

    /*Todo: CONTROL PANEL */
    var openControl = $( ".openControl" );
    //var contents     = $( '.contents' );
    //contents.css( {'left': + $controlPanel.width() } );//get width for page

    function openControls() {
        if ( !BODY.hasClass( 'openControls' ) ) {
            BODY.addClass( 'openControls' );
            $.cookie( 'openControl', 'openControls', {expires: 365} );
        } else {
            BODY.removeClass( 'openControls' );
            $.cookie( 'openControl', '', {expires: 365} );
        }
        fotoramaResize( 2e1 );
    }

    if ( $.cookie( 'openControl' ) === 'openControls' ) {
        BODY.addClass( 'openControls' );
        fotoramaResize( 1e3 );
    }

    openControl.click( function () {
        openControls();
        page3YActivate();
        //verticalSvg();
        //$('.fotorama').on('fotorama:showend', function (e, fotorama) {
        //    var $frame = fotorama.activeFrame.$stageFrame;
        //    if (!$frame.data('state')) {
        //        $frame.on('f:load f:error', function () {
        //            fotorama.activeFrame.$stageFrame === $frame && catchFrame(fotorama, $frame);
        //        });
        //    } else {
        //        catchFrame(fotorama, $frame);
        //    }
        //}).fotorama();
        //function catchFrame(fotorama, $frame) {
        //    console.log($('.fotorama__html > .any', $frame).height());
        //    fotorama.resize({height: $('.fotorama__html > *', $frame).height()}, 400);
        //}

    } );


    //Todo: Full Screen
    var openFullScreen   = function ( element ) {
            var open = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;
            open.apply( element );
        },
        exitFullScreen   = function ( doc ) {
            var exit = doc.cancelFullScreen || doc.webkitCancelFullScreen || doc.mozCancelFullScreen || doc.msCancelFullScreen;
            exit.apply( doc );
        },
        toggleFullScreen = function ( el ) {
            var relay = $( el );
            if ( relay.hasClass( 'full-screen' ) ) {
                exitFullScreen( document );
            } else {
                openFullScreen( document.documentElement );
            }
            relay.toggleClass( 'full-screen' );
        };

    $controlPanel.on( 'click', '.dist', function () {
        toggleFullScreen( $( this ) );
    } );

    //Todo: margin bottom page for main footer
    var forFooter = {
        getHeightContainer: function ( getObj ) {
            return getObj.height();
        },
        marginBottomPage  : function ( setObj, setValue ) {
            setObj.css( {'margin': '0 0 ' + setValue + 'px 0'} );
        }
    };
    // forFooter.marginBottomPage( idDataBlog, forFooter.getHeightContainer( idMainFooter ) );


    //Todo: setup box choice
    //var  $selects      = $setupBox.find( '.selects' ),
    // $selectsCount = $selects.length,
    // writeCount    = [],
    // forWhat       = BLOG.find( '.sub-pages' );
    // (function eventSetupBox() {
    //     for ( var count = 0; count < $selectsCount; count++ ) {
    //         writeCount[ count ] = $selects[ count ];
    //     }
    //     writeCount.forEach( function ( element ) {
    //         if ( element.className === 'selects active' ) {
    //             forWhat.addClass( element.id );
    //             console.log( element.id );
    //         }
    //     } );
    // })();

    var sel, reviseBlog = !1;

    $setupBox.on( 'click', '.people', function () {
        $( this ).toggleClass( 'hidden' );
    } );


    var eventLoadPage = {
        strName        : '',
        eventLoad      : {},
        masonryPhoto   : {},
        masonryBlog    : {},
        $containerPhoto: {},
        $containerBlog : {},
        $blogInfoText  : {}
    };


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
        responsive: {
            0   : {items: 1},
            768 : {items: 2},
            940 : {items: 3},
            1160: {items: 4}
        }
    };


    //Todo: cut text
    var cutText = {
        containerCutText: {},
        str             : '',
        text            : '',
        space           : '',
        cut             : {},
        imgHt           : {}
    };

    cutText.cut = function ( $containerText, maxSymbols, inAnyCaseDots ) {
        this.containerCutText = $containerText;
        this.containerCutText.each( function ( index, element ) {
            this.text = $( element ).text();
            this.str  = this.text.slice( 0, maxSymbols );
            if ( this.str.trim().charAt( this.str.trim().length - 1 ).match( /^[.,?! ]+$/ ) !== null ) {
                $( element ).text( this.str.trim().slice( 0, -1 ) + '...' );
            } else if ( inAnyCaseDots === true ) {
                $( element ).text( this.str + '...' );
            }
        } );
    };


    function getEvent() {
        // setWidthObj( $( '#subContainerRecentPosts' ), getWidthObj( $( '#recentPost' ) ) );
    }

    //Todo: set width object
    function setWidthObj( obj, setWidth ) {
        obj.css( {'width': setWidth + 'px'} );
    }

    //Todo: get width object
    function getWidthObj( obj ) {
        var objW = obj.width();
        var size;
        if ( objW !== null ) {
            size = objW;
        } else {
            size = '';
        }
        return size;
    }


    //Todo: setup
    var setup = {
        photoVideoThemes: {
            button: $( '.switch-control-panel > li' ),
            el    : $subControlPanel,
            val   : 0.3,
            time  : 400
        },
        set             : {
            num : 0,
            el  : $( '.setup-box' ),
            val : 0,
            time: 400
        },
        archive         : {
            num : 0,
            el  : {},
            val : 0,
            time: 400
        }
    };
    box( setup.set );
    // function settupper( setup ) {
    //     setup.photoVideoThemes.time = 22;
    //     console.log( setup );
    // }
    // settupper( setup );

    //Todo: tabs blog archives
    idDataBlog.on( 'click', '.button-archive', function () {
        var $this          = $( this );
        var $buttonArchive = $( '#buttonArchive' );
        if ( !$this.hasClass( 'active' ) ) {

            setup.archive.el  = $( '#archiveBox' );
            setup.archive.num = $this.index();

            elementsActive( $buttonArchive.find( '.button-archive' ), setup.archive.num );
            markActive( $buttonArchive.find( '.mark-archive-button' ), $this, setup.archive.time );

        }

        box( setup.archive );
        setup.archive.el.css( {
            'height'    : setup.archive.el.find( '.innerBox' ).eq( setup.archive.num ).outerHeight() + 'px',
            'transition': setup.archive.time + 'ms'
        } );
    } );

    //Todo: frame resize
    // var nameFrame = document.getElementsByName('blogFrame')[0];
    // console.log( nameFrame );
    // blogFrame.addEventListener( 'resize', function (  ) {
    //     idDataBlog.find('.button-archive').eq(setup.archive.num).trigger('click');
    // });
    var nameFrame = $( blogFrame );
    nameFrame.resize( function () {
        idDataBlog.find( '.button-archive' ).eq( setup.archive.num ).trigger( 'click' );
        // getEvent();
        // console.log( nameFrame );
    } );

    //Todo: width photo container
    var widthPhotoContainer = {
        photoContainer: {},
        widthParent   : Number
    };

    widthPhotoContainer.photoContainer = function () {
        var self                   = this;
        var $dataPhotoContent      = $( '#dataPhotoContent' );
        var $containerContentPhoto = $( '#containerContentPhoto' );
        var goalSize;
        var sizeWinPrev = $containerContentPhoto.find( '[data-sortphoto]' ).width();
        console.log( sizeWinPrev );
        self.widthParent = $dataPhotoContent.width();
        goalSize = self.widthParent;

        $containerContentPhoto.width( goalSize );

        $( window ).resize( function () {
            self.widthParent = $dataPhotoContent.width();
            console.log( $dataPhotoContent.width() );
        } );

    };


    //Todo: event load page
    var photoUnitegallery;
    eventLoadPage.eventLoad = function ( str ) {
        var he     = this;
        he.strName = str.match( /^([a-z]+)$/ )[ 0 ];
        if ( he.strName !== undefined ) {
            switch ( he.strName ) {
                case 'photo':
                    he.$containerPhoto = PHOTO.find( '.select-content' );

                //  todo: unitegallery
                    var $gallery = $( "#gallery" );
                    // console.log( $.isFunction( $.fn.unitegallery ) );
                    // console.log( typeof $.fn.unitegallery !== "undefined" );
                    if( typeof $.fn.unitegallery !== "undefined" ) {
                        photoUnitegallery = $gallery.unitegallery( {
                            tile_enable_textpanel          : true,
                            tiles_col_width: 300
                            // tile_textpanel_title_text_align: "center",
                            // tiles_type                     : "justified"
                        } );
                        photoUnitegallery.on( 'resize', function() {
                            // console.log( 'Hello: ' + 1 );
                        });
                        $hiddenControlPanel.on( 'click', function(){
                            photoUnitegallery.resize();
                        } );
                    }

                    // he.masonryPhoto();
                    // widthPhotoContainer.photoContainer();
                    break;
                case 'blog':
                    newsFreshHeight( BLOG.find( '.news-fresh' ), '.left-news' );
                    he.$containerBlog = BLOG.find( '.content-blog' );
                    he.$blogInfoText  = he.$containerBlog.find( '.blog-post-container-preview' );
                    // he.masonryBlog();
                    he.$containerBlog.imagesLoaded().progress( function () {
                        he.masonryBlog();
                    } );
                    imgToBackgroundImage( he.$containerBlog.find( '.just-blog' ) );
                    imgToBackgroundImage( he.$containerBlog.find( '.fresh-img' ) );
                    imgToBackgroundImage( he.$containerBlog.find( '.blog-media-preview' ), 'hidden' );
                    imgToBackgroundImage( $( '#recentPost' ).find( '.image-recent-posts' ) );
                    // getEvent();
                    cutText.cut( BLOG.find( '.cut-text' ), 150, !0 );
                    newsFresh();
                    // he.$containerBlog.imagesLoaded().progress( function() { archivePage(); } );
                    // archivePage();
                    idDataBlog.find( '.button-archive' ).eq( setup.archive.num ).trigger( 'click' );
                    if ( typeof $.fn.owlCarousel !== "undefined" ) {
                        idDataBlog.find( '.owl-carousel' ).owlCarousel( setupOwlCarousel );
                    } else {
                        console.info( "plugin owl.carousel.js not connected" );
                    }

                    recentHeight( BLOG, $( '#recentPost' ) );

                    recentPositionFixed();

                    boxMenuHeight();
                    // blogMenuLink();
                    reviseBlog = !0;

                    break;
            }
        }
    };

    // $hiddenControlPanel.click( function () {
    //     owlCarousel();
    // } );

    var $paginationLink = $( '#paginationLink' );
    $paginationLink.on( 'click', '.squander-page', function () {
        var $num = $( this ).parent().index();
        positionDataCheck( $num );
        elementsActive( $paginationLink.find( '.squander-page' ), $num );
    } );

    //Todo: box menu height
    function boxMenuHeight() {
        var $a = BODY,
            $b = $setupBox.find( '.innerBox' ),
            $c = MENU.outerHeight() + $controlPanel.find( '.site-name' ).outerHeight() + $containerBlogTopBottom.outerHeight();
        $b.css( {'height': $a.height() - $c + 'px'} );
        $( window ).resize( function () {
            setTimeout( function () {
                $b.css( {'height': $a.height() - $c + 'px'} );
            }, 50 );
        } );
    }



    //Todo: recent height
    function recentHeight( a, b ) {
        if ( a && b ) {
            var $a = a,
                $b = b;
            $b.outerHeight( $a.innerHeight() );
            $( window ).resize( function () {
                setTimeout( function () {
                    $b.outerHeight( $a.innerHeight() );
                }, 50 );
            } );
        }
    }

    // $( '[data-page]' ).height( BODY.height() );

    //Todo: recent post position fixed
    function recentPositionFixed() {

        var container        = BLOG.find( data_subpage );
        var sidebarContainer = container.find( '.sidebar-container' );
        var recentPost       = $( '#recentPost' );

        if ( sidebarContainer.length > 0 && recentPost.length > 0 ) {

            var idDataBlog  = $( '#idDataBlog' );//container for blogHeader, blogWrapper, blogFooter
            var blogWrapper = $( '#blogWrapper' );
            var blogFooter  = $( '#blogFooter' );
            var contentBlog = blogWrapper.find( '.content-blog' );
            var sidebar     = sidebarContainer.find( '.sidebar' );

            var containerScrollTop, sidebarHeight, contentBlogHeight,
                recentPostHeight, idDataBlogHeight, blogWrapperHeight,
                blogFooterHeight, recentPostTop, mark, markTop, markBottom;

            // recentPost.find('.wrap-recent-posts').imagePanning60();
            var scrollBar = function () {
                containerScrollTop = container.scrollTop();
                sidebarHeight      = sidebar.outerHeight();
                idDataBlogHeight   = idDataBlog.outerHeight();
                blogWrapperHeight  = blogWrapper.outerHeight();
                contentBlogHeight  = contentBlog.outerHeight();
                blogFooterHeight   = blogFooter.outerHeight();
                recentPostHeight   = recentPost.outerHeight();

                recentPostTop = recentPost.position().top;

                mark    = ( idDataBlogHeight - ( blogWrapperHeight + blogFooterHeight ) );
                markTop = mark + recentPostTop;

                markBottom = ( ( mark + (contentBlogHeight - sidebarHeight) ) + recentPostTop );

                if ( containerScrollTop > markTop && contentBlogHeight > sidebarHeight ) {
                    if ( containerScrollTop > markBottom ) {
                        sidebar.css( {'position': 'absolute', 'top': '', 'bottom': '0'} );
                    }
                    else {
                        sidebar.css( {'position': 'fixed', 'top': +-( recentPostTop  ) + 'px', 'bottom': ''} );
                    }

                } else {
                    sidebar.css( {'position': '', 'top': ''} );
                }

            };

            container.on( 'scroll', function () {
                scrollBar();
            } );

            $hiddenControlPanel.click( function () {
                sidebar.width( sidebarContainer.width() );
                scrollBar();
            } );

            var timer;
            $( window ).resize( function () {
                sidebar.width( sidebarContainer.width() );
                clearInterval( timer );
                timer = setTimeout( scrollBar, 200 );
            } );

            sidebar.width( sidebarContainer.width() );
        }
    }


    eventLoadPage.masonryPhoto = function () {
        this.$containerPhoto.masonry( {
            // itemSelector: '.item-blog',
            // columnWidth : '.blog-sizer'
            columnWidth : 190
            // transitionDuration: '0s'
            // stamp: '.sidebar-container'
        } );
    };

    eventLoadPage.masonryBlog = function () {
        this.$containerBlog.masonry( {
            itemSelector: '.item-blog',
            columnWidth : '.blog-sizer'
            // transitionDuration: '0s'
            // stamp: '.sidebar-container'
        } );
    };

//Todo: event hidden control panel
    $hiddenControlPanel.click( function () {
        BODY.toggleClass( 'hidden-control-panel' );
        page3YActivate();
        // reviseBlog && sideBarHidden();
        if ( reviseBlog === true ) {
            eventLoadPage.masonryBlog();
        }
    } );

    //Todo: img to background-image
    function imgToBackgroundImage( container, hidden ) {
        container.each( function ( index, element ) {
            var $el  = $( element ),
                $img = $el.find( 'img' );
            if ( $img.length > 0 ) {
                $el.css( {'background-image': 'url( "' + $img.attr( 'src' ) + '" )'} );
            } else {
                if ( hidden !== undefined ) {
                    $el.hide().addClass( 'no-tag-img' );
                } else {
                    $el.addClass( 'no-tag-img' );
                }
            }
        } );
    }

    //Todo: prev - next
    var backNumber    = function ( index, len ) {
            if ( index > 0 ) {
                index--;
            } else {
                index = len - 1;
            }
            return index;
        },
        forwardNumber = function ( index, len ) {
            if ( index < len - 1 ) {
                index++;
            } else {
                index = 0;
            }
            return index;
        };


    //Todo: News fresh height
    function newsFreshHeight( whom, fromwhom ) {
        var container = whom, whomIndex, objChild = {}, objHeight = 0;
        for ( var i = 0; container.length > i; i++ ) {
            whomIndex = container.eq( i );
            objChild  = whomIndex.find( fromwhom );
            for ( var j = 0, maxHeightChild = -1; objChild.length > j; j++ ) {
                objHeight      = objChild.eq( j ).outerHeight();
                maxHeightChild = Math.max( maxHeightChild, objHeight );
            }
            whomIndex.css( {'height': maxHeightChild + 'px'} );
        }
    }


    //Todo: Blog news fresh
    function newsFresh() {
        var $fresh  = BLOG.find( '.news-fresh' );
        var fresher = function ( container ) {
            var $newsFresh  = container,
                $boxFresh   = BLOG.find( '.box-fresh' ),
                $freshSlide = $newsFresh.find( '.fresh-slide' ),
                $prev       = $newsFresh.find( '.fresh-arrows-prev' ),
                $next       = $newsFresh.find( '.fresh-arrows-next' ),
                $freshImg   = $freshSlide.find( '.fresh-img' ),
                $leftNews   = $freshSlide.find( '.left-news' ),
                $newerDots  = $newsFresh.find( '.newer-dots' ),
                $doter      = $newerDots.find( '.doter' ),
                $elLength   = $freshSlide.length,
                strDots     = '',
                $thisDot    = {},
                indexSlide  = 0,
                elHeight;

            for ( var i = 0; i < $elLength; i++ ) {
                strDots += '<span class="doter"></span>';
            }

            $newerDots.append( strDots );
            $newerDots.find( '.doter:first-child' ).addClass( 'active' );

            function slideFresh( num ) {
                elementsActive( $freshSlide, num );
                elementsActive( $newsFresh.find( '.doter' ), num );
                $freshImg.css( {'transform': 'translateY(' + ( elHeight * num ) + 'px)'} );
                $leftNews.css( {'transform': 'translateY(' + -( elHeight * num ) + 'px)'} );
                indexSlide = num;
            }

            $newsFresh.on( 'click', '.doter', function () {
                slideFresh( $( this ).index() );
            } ).on( 'click', '.fresh-arrows-prev', function () {
                slideFresh( backNumber( indexSlide, $elLength ) );
            } ).on( 'click', '.fresh-arrows-next', function () {
                slideFresh( forwardNumber( indexSlide, $elLength ) );
            } );

            var updObj = function () {
                elHeight = $newsFresh.height();

                newsFreshHeight( $fresh, '.left-news' );

                for ( var i = 0; i < $elLength; i++ ) {
                    $freshImg.eq( i ).css( {'top': -( elHeight * i ) + 'px'} );
                    $leftNews.eq( i ).css( {'top': ( elHeight * i ) + 'px'} );
                }
                $newsFresh.find( '.doter' ).css( {'margin': elHeight * 0.58 / $elLength + 'px auto 0'} );

                slideFresh( indexSlide );
            };

            updObj();

            var events = function () {
                newsFreshHeight( $fresh, '.left-news' );
                // sideBarHidden();
                updObj();
                eventLoadPage.masonryBlog();
            };

            BODY.on( 'click', '.setup-blog', function () {
                if ( reviseBlog === true ) {
                    events();
                }
            } ).on( 'click', '.click-hidden-control-panel', function () {
                if ( reviseBlog === true ) {
                    events();
                }
            } );

            $( window ).resize( function () {
                if ( reviseBlog === true ) {
                    setTimeout( function () {
                        updObj();
                    }, 1e2 );
                }
            } );
        };

        var freshEach = function () {
            $fresh.each( function ( index, element ) {
                fresher( $( element ) );
            } );
        };

        freshEach();
    }

    //Todo: element translate
    var elementsTranslate = function ( el, elH, num ) {
        el.css( {'transform': 'translateY(' + -(elH * num) + 'px)'} );
    };

    //Todo: add remove class active
    function elementsActive( el, num ) {
        el.eq( num ).addClass( 'active' );
        el.not( el.eq( num ) ).removeClass( 'active' );
    }


    var pageSvg = $( ".page-svg" );
    var chSvg   = $( ".ch-svg" );

    function verticalSvg() {
        var a = pageSvg.height();
        var b = chSvg.height();
        var c = (a - b) * 0.5;
        if ( a <= b ) {
            c = 0;
        }
        chSvg.css( {'top': c + 'px'} );
    }

    verticalSvg();


    function verticalObject( obj1, obj2 ) {
        var a = obj1.height();
        var b = obj2.innerHeight();
        var c = (a - b) * 0.5;
        if ( a <= b ) {
            c = 0;
        }
        obj2.css( {'margin-top': c + 'px'} );
    }


    //Todo: Switch control panel: background[themes, video, photo], page setup
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


    // box( setup.archive );

    //Todo: select photo background || video background || themes
    setup.photoVideoThemes.button.on( 'click', function () {
        if ( !$( this ).hasClass( 'active' ) ) {
            var elementThis            = $( this );
            setup.photoVideoThemes.num = elementThis.index();
            box( setup.photoVideoThemes );
        }
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

    //Todo: Tabs archive
    // var tester = function() {
    //     console.log( 'Hello: ' + 1 );
    // };

    //idDataBlog
    // var archivePage = function() {
    //     !function (  ) {
    //         idDataBlog.on( 'click', '.button-archive', tester );
    //     }();


    // debugger;
    // getId( 'idDataBlog').addEventListener( 'click', tester );
    // var $buttonArchive = $( '#buttonArchive' ),
    //     $archiveBox    = $( '#archiveBox' );
    // if( $buttonArchive.length > 0 && $archiveBox.length > 0 ) {
    //     setup.archive.el   = $archiveBox;
    //     var $getButton     = $buttonArchive.find( '.button-archive' ),
    //         $markArchive   = $buttonArchive.find( '.mark-archive-button' ),
    //         getElForHeight = setup.archive.el.find( '.innerBox' ),
    //         heightBoxIndex = [],
    //         button         = [],
    //         index          = 0,
    //         archiveHeight;
    //
    //     for ( var i = 0; getElForHeight.length > i; i++ ) {
    //         heightBoxIndex[ i ] = getElForHeight.eq( i );
    //         button[i] = $getButton.eq( i );
    //     }
    //
    //     $getButton.on( 'click', function () {
    //         var $this = $( this );
    //         index             = $this.index();
    //         setup.archive.num = index;
    //         archiveHeight( heightBoxIndex[ index ] );
    //         elementsActive( $getButton, index );
    //         markActive( $markArchive, $this, setup.archive.time );
    //         console.log( 'click: ' );
    //     } );
    //
    //     archiveHeight = function ( heightFromEl ) {
    //         box( setup.archive );
    //         setup.archive.el.css( {
    //             'height'    : heightFromEl.outerHeight() + 'px',
    //             'transition': setup.archive.time + 'ms'
    //         } );
    //     };
    //
    //
    //     BODY.on( 'click', '.click-hidden-control-panel', function () {
    //         archiveHeight( heightBoxIndex[ index ] );
    //         markActive( $markArchive, $getButton.eq( index ), setup.archive.time );
    //     } );
    //
    //     $( window ).resize( function () {
    //             archiveHeight( heightBoxIndex[ index ] );
    //             markActive( $markArchive, $getButton.eq( index ), setup.archive.time );
    //     } );
    //
    //     archiveHeight( heightBoxIndex[ 0 ] );
    //     markActive( $markArchive, $getButton.eq( 0 ), setup.archive.time );
    // }

    // };


    //box( setup.photoVideoThemes );

    //pageEventScroll( $( '.sub-controlPanel' ), cp );


    //function leftPositions() {
    //    $.cookie('opCtrl', 'leftPosition', {expires: 365});
    //    $controlPanel.removeClass('defaultPosition').addClass('leftPosition');
    //}

    //if ($.cookie('opCtrl') == 'leftPosition') {
    //    leftPositions()
    //}

    //$('#leftPosition').click(function () {
    //    leftPositions();
    //});

    //$('#defaultPosition').click(function () {
    //    $.cookie('opCtrl', 'defaultPosition', {expires: 365});
    //    $controlPanel.addClass('defaultPosition');
    //    if ($controlPanel.hasClass('leftPosition')) {
    //        $controlPanel.removeClass('leftPosition');
    //    }
    //});

    var crSwVideo = $( ".container-sw-video" );
    var crSwPhoto = $( ".container-sw-photo" );

    function openBack() {
        crSwVideo.toggleClass( "open" );
        crSwPhoto.toggleClass( "open" );
        $( ".openBack" ).toggleClass( "open" );
        //$(".openVideoPhoto").toggleClass("activeVideoPhoto");
        if ( crSwVideo.hasClass( 'open' ) || crSwPhoto.hasClass( 'open' ) ) {
            $.cookie( 'openBack', 'open', {expires: 365} );
        } else {
            $.cookie( 'openBack', 'closed', {expires: 365} );
        }
    }

    if ( $.cookie( 'openBack' ) === 'open' ) {
        openBack();
    }

    $( '.openBack' ).parent().click( function () {
        openBack();
    } );


    //Todo: Switch control video and photo background
    switcherBg();
    function switcherBg() {
        function visibleVideoBg() {
            $( '.container-sw-video' ).addClass( 'visible' );
            $( '.container-sw-photo' ).removeClass( 'visible' );
            $videoContainer.addClass( 'visible' );
            $containerMainPhoto.removeClass( 'visible' );
        }

        function visiblePhotoBg() {
            $( '.container-sw-video' ).removeClass( 'visible' );
            $( '.container-sw-photo' ).addClass( 'visible' );

            $videoContainer.removeClass( 'visible' );
            $containerMainPhoto.addClass( 'visible' );
        }

        var ctrlPower            = $( '.power-video-bg-photo-bg' ),
            removeAnimationPhoto = function () {},
            pauseBg              = function () {};

        function switcherBackground( dataAttr ) {
            $( '[data-power]' ).removeClass( 'power' );
            ctrlPower.find( '[data-power="' + dataAttr + '"]' ).addClass( 'power' );
            $.cookie( 'data-power', dataAttr, {expires: 365} );
            if ( dataAttr === 'video-bg' ) {
                if ( removeAnimationPhoto !== undefined ) {
                    removeAnimationPhoto();
                }
                visibleVideoBg();
            }
            else if ( dataAttr === 'photo-bg' ) {
                if ( pauseBg !== undefined ) {
                    pauseBg();
                }
                visiblePhotoBg();
            }
        }

        if ( $.cookie( 'data-power' ) !== undefined ) {
            switcherBackground( $.cookie( 'data-power' ) );
        } else {
            switcherBackground( 'photo-bg' );
        }

        ctrlPower.on( 'click', '[data-power]', function () {
            var pow = $( this ).attr( 'data-power' );
            switcherBackground( pow );
        } );
    }


    //Todo: Indicator Player (right panel) audio page
    var ejectInd = $( ".ejectIndicator" );
    ejectInd.hide();

    //Todo: indexOf('Chrome')
    var _chrome = false;
    if ( navigator.userAgent.indexOf( 'Chrome' ) !== -1 ) {
        _chrome = true;
    }

    if ( (_chrome === true) && typeof AudioContext !== 'undefined' || typeof WebkitAudioContext !== 'undefined' ) {
        $.getScript( 'js/indicator-1.0.0.js' );
    }


    //Todo: pointer events none
    var timerDisableHover;

    function disablePointerEvents( time ) {
        //clearTimeout(timerDisableHover);
        //if (!$body.hasClass('disable-pointer-events')) {
        //    $body.addClass('disable-pointer-events');
        //}
        //timerDisableHover = setTimeout(function () {
        //    $body.removeClass('disable-pointer-events');
        //}, time);
    }


    function mainPagePosition( value1 ) {
        var timeSwitchPage = 8e2;
        var hps            = ($( '#pages' ).height() * value1);
        var cubb           = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
        var eas            = 'ease-in-out';

        subPages.css( {
            //'transition-timing-function': 'ease',
            //'transition-duration': timeSwitchPage +'ms',
            //'transform': 'translate(0px, ' + -hps + 'px) translateZ(0px)'
            //'transform': 'translate3d(0px, ' + -hps + 'px, 0px)'
            //'transform': 'translate(0px, ' + -hps + 'px)'
        } );

        //$('#pages').animate({
        //    scrollTop: hps
        //}, timeSwitchPage, 'easeInOutSine');

        //disablePointerEvents(timeSwitchPage);
    }

    /*Todo: PLAYER PAGE INDICATOR HIDDEN */
    function ejectIndicator() {
        ejectInd.toggleClass( "openIndicator" );
        $( ".page-3-subLeft" ).toggleClass( "openIndicator" );
        $( ".containerIndicator" ).toggleClass( "openIndicator" );
        if ( ejectInd.hasClass( 'openIndicator' ) ) {
            $.cookie( 'ejectIndicator', 'openIndicator', {expires: 365} );
        } else {
            $.cookie( 'ejectIndicator', 'closedIndicator', {expires: 365} );
        }
    }

    if ( $.cookie( 'ejectIndicator' ) === 'openIndicator' ) {
        ejectIndicator();
    }

    ejectInd.click( function () {
        ejectIndicator();
    } );

    //Todo: Body height size containers
    function bodyHeight( elem, vy, px ) {
        var bodyY = bodyH();
        elem.css( vy, bodyY - px + 'px' );
    }

    //Todo: resize window event
    function page3YActivate() {
        //bodyHeight($('.container-sw-video'), 'height', 76);
        //bodyHeight($('.container-sw-photo'), 'height', 76);
        //subPages.css({'height': $pages.height() * (menuPages_li.length - 1)});
        //$('[data-page]').css({'height': $pages.height() +'px', 'transform': 'translate3d(0px, '+ $pages.height() +'px, 0px)' });
        //$('[data-page]').css({'height': $pages.height() + 'px'});

        //$( '.page-control' ).css( {'width': $subControlPanel.width() * ($( '.switch-control-panel > li' ).length) + 'px'} );
        //$( '.outerBox' ).css( {'width': $subControlPanel.width() + 'px'} );
        $( '.container-switch-themes, .main-control-audio, .power-video-bg-photo-bg' ).css( {'height': $subControlPanel.height() + 'px'} );
        setup.set.el.css( {'width': $controlPanel.width()} );
        box( setup.set );

        //bodyHeight($("div[data-page]"), 'height', 50);
        //bodyHeight($("[data-page]"), 'min-height', 56);//56

        //bodyHeight($(".sub-pages"), 'min-height', 160);//56

        //bodyHeight($('.about-background' ), 'height', 0);

        //bodyHeight($('[data-subpage]'), 'min-height', 248);
        //$('.loading-page-h2').css({'top': $('body').height() / 2 - 80});
        //bodyHeight($('#sub-pages'), 'min-height', 76);
        //heightBlogFigure();
        //cutText.imgHt( $page5.find( '.paragraph-post-preview' ) );
        //if ( swCtrl !== undefined ) {
        //    switcherCtrl()
        //}
        //switcherCtrl();
        aboutBgHeight();
    }


    page3YActivate();

    $( window ).resize( function () {
        setTimeout( function () {
            page3YActivate();
        }, 1e2 );
    } );

    function bodyH() {
        return BODY.height();
    }

    /* -------------------------------------------------------------------------------- */
    /* Todo: About Page | $page2 | id="about-main"				                            */
    /* -------------------------------------------------------------------------------- */

    var _aboutPow = false;

    function aboutBgHeight() {
        //setTimeout(function () {
        if ( ABOUT.length ) {
            //$page2.find('.main-about' ).css({'height': bodyH() + 'px'});
            ABOUT.find( '.about-main-section' ).css( {'height': bodyH() + 'px'} );
            _aboutPow = true;
            //    $('.about-background').css({'height': bodyH() + 'px'});
            //loaded();
        }
        //}, 1130);

    }



    /* -------------------------------------------------------------------------------- */
    /*   Todo: Photo Page | PHOTO | id="page-4"				                            */
    /* -------------------------------------------------------------------------------- */

    var commonPathPhoto = 'html/photo-page/',
        data_photo      = $( '[data-photo="content"]' ),
        //selectPhoto   = commonPathPhoto + "select.html",
        dataPagePhoto   = $( '[data-page="photo"]' ),
        $photoToTop     = $( '.photo-toTop' );

    function loadContent( where, url ) {
        $.ajax( {
            url          : url,
            success      : function ( data ) {
                where.html( data );
                setTimeout( function () {
                    if ( powFotorama === 1 ) {
                        PHOTO.find( '.fotorama' ).fotorama();
                    }
                }, 1000 );
                $( '.pointer-photo' ).addClass( 'vis' );
            }, statusCode: {
                404: function () {
                    $.ajax( {
                        url    : 'html/photo-page/404-photo.html',
                        success: function ( data ) {
                            where.html( data );
                        }
                    } );
                }
            }
        } );
    }

    var this_sort;
    var divDataLoadPhoto = $( 'div[data-load-photo]' );

    function openTop( v ) {
        var offset = this_sort.parent().position().top,
            time   = 400;
        idDataSubPhoto.stop( !0, !1 ).animate( {scrollTop: offset + v}, time );
        divDataLoadPhoto.stop( !0, !1 ).animate( {'opacity': '1', 'top': offset + 515}, time );
    }

    function defaultHeightSortPhoto() {
        $( '[data-sortPhoto]' ).css( {height: '130px'} );
    }
    var $idDataLoadPhoto = $( '#idDataLoadPhoto' );
    function emptyPhoto() {
        PHOTO.find( '[data-sortPhoto]' ).removeClass( 'active_load' );
        PHOTO.find( '[data-sortPhoto] .pointer-photo' ).remove();
        PHOTO.find( '.pointer-photo' ).removeClass( 'vis' );
        $idDataLoadPhoto.css( {'opacity': '0', 'height': '0'} ).empty();
    }

    function appendPhoto( attrAdr ) {
        this_sort.parent().addClass( 'active_load' );
        this_sort.parent().append( '<div class="pointer-photo"></div>' );
        loadContent( $( 'div[data-load-photo]' ), commonPathPhoto + attrAdr + '.html' );
        setTimeout( function () {
            this_sort.parent().css( {height: 520} );
            setTimeout( function () {
                $idDataLoadPhoto.css( {'height': 380} );//[data-load-photo]
            }, 250 );
        }, 50 );
    }

    data_photo.on( 'click', '[data-sortPhoto] a', function () {
        this_sort   = $( this );
        var attrAdr = this_sort.attr( 'data-page-photo' );
        if ( this_sort.parent().hasClass( 'active_load' ) ) {
            emptyPhoto();
            defaultHeightSortPhoto();
            openTop( 148 );
        }
        else if ( !this_sort.parent().hasClass( 'active_load' ) && $( '[data-sortPhoto]' ).hasClass( 'active_load' ) ) {
            setTimeout( function () {
                openTop( 340 );
            }, 500 );
            defaultHeightSortPhoto();
            emptyPhoto();
            appendPhoto( attrAdr );
        }
        else {
            emptyPhoto();
            appendPhoto( attrAdr );
            setTimeout( function () {
                openTop( 340 );
            }, 500 );
        }
    } );

    function toTopPhoto() {
        emptyPhoto();
        defaultHeightSortPhoto();
        idDataSubPhoto.stop( !0, !1 ).animate( {
            scrollTop: 0
        }, 400 );
    }

    $photoToTop.on( 'click', function () {
        toTopPhoto();
    } );


    var sortPhoto,
        sectionPhoto = function () {
            toTopPhoto();
            setTimeout( function () {
                eventHeaderHidden();
            }, 500 );
            var dataAttr = sortPhoto.attr( 'data-sort' );
            $( 'li[data-sort]' ).removeClass( 'change' );
            $( '.select' ).find( 'li[data-sort="' + dataAttr + '"]' ).addClass( 'change' );
            if ( dataAttr == 'all' ) {
                $( '[data-sortPhoto]' ).removeClass( 'visible' ).removeClass( 'hidden' );
            } else {
                $( '[data-sortPhoto]' ).addClass( 'hidden' );
                setTimeout( function () {
                    $( '[data-sortPhoto="' + dataAttr + '"]' ).removeClass( 'hidden' ).addClass( 'visible' );
                }, 20 );
            }
        };

    data_photo.on( 'click', 'li[data-sort]', function () {
        sortPhoto = $( this );
        if ( !sortPhoto.hasClass( 'change' ) ) {
            sectionPhoto();
        }
    } );

    idDataSubPhoto.on( 'scroll', function () {
        if ( $( this ).scrollTop() > 0 && $( '[data-page="photo"]' ).hasClass( 'open' ) ) {
            $photoToTop.addClass( 'visible' );
        } else {
            $photoToTop.removeClass( 'visible' );
        }
    } );

    function photoVisible() {
        dataPagePhoto.find( '.container' ).addClass( 'visible' );
        dataPagePhoto.find( '.select-content' ).addClass( 'visible' );
        if ( idDataSubPhoto.position().top < 0 && $( "[data-page='photo']" ).hasClass( 'open' ) ) {
            $photoToTop.addClass( 'visible' );
            console.log( "photoVis" );
        }

    }

    function photoRemoveVisible() {
        dataPagePhoto.find( '.container' ).removeClass( 'visible' );
        dataPagePhoto.find( '.select-content' ).removeClass( 'visible' );
        $photoToTop.removeClass( 'visible' );
        console.log( "removeVis" );
    }

    /* -------------------------------------------------------------------------------- */
    /*             End PHOTO Page				                                        */
    /* -------------------------------------------------------------------------------- */


    //for (var i = 0; i < blogPage_li.length + 1; i++)
    //    var x = blogPage_li.width() * i;
    //    blogPage.css({
    //        'width': (x + (i * 5) + 40) + 'px'
    //    });


    /* -------------------------------------------------------------------------------- */
    /* Todo:     Header Footer 				                                            */
    /* -------------------------------------------------------------------------------- */
    var $toTopBlog    = $( '#toTopBlog' ),
        $toBottomBlog = $( '#toBottomBlog' );
    var header        = $( '.header-out-in' ),
        footer        = $( '.footer-out-in' );

    var valHeaderTop = 40;

    function headerHidden( ca, db ) {

        var c = $( '#' + ca.parent().attr( 'id' ) ), h = c.find( header ), b = c.find( footer );
        if ( ca.scrollTop() <= valHeaderTop ) {
            h.addClass( 'header-min' );
            $toTopBlog.addClass( 'top-active' );
        }
        else {
            h.removeClass( 'header-min' );
            $toTopBlog.removeClass( 'top-active' );
        }

        if ( ca.scrollTop() < db.height() - ca.height() ) {
            b.removeClass( 'footer-min' );
            $toBottomBlog.removeClass( 'top-active' );
        }
        else {
            b.addClass( 'footer-min' );
            $toBottomBlog.addClass( 'top-active' );
        }
    }

    //$page2.find( '.about-main-section' ) - whatKind
//'.about-main-background' - inWhichA: (whatKind(inWhichA))

    function Resisting() {}

    Resisting.prototype = {
        deposition: function ( option ) {
            option.whatKind.css( {'overflow': 'hidden'} );
            option.whatKind.each( function ( index, element ) {
                var posit = (-$( element ).offset().top) * option.value;
                $( element ).find( option.inWhichA ).css( {
                    'transform': 'translateY(' + posit + 'px) translateZ(0)'
                } );
            } );
        }
    };

    var aboutBgPosition = new Resisting();


    var seeScroll     = $( window );
    var seeScrollData = idDataSubAbout;

    var scaleBg = !1;

    function eventHeaderHidden() {
        switch ( !0 ) {
            case ABOUT.hasClass( 'open' ):
                seeScrollData = idDataSubAbout;
                seeScroll     = ABOUT.find( data_subpage );
                break;
            case PHOTO.hasClass( 'open' ):
                seeScrollData = idDataSubPhoto;
                seeScroll     = PHOTO.find( '[data-subpage]' ); // data_subpage
                //page4Photo();

                break;
            case BLOG.hasClass( 'open' ):
                seeScrollData = idDataSubBlog;
                seeScroll     = BLOG.find( '[data-subpage]' );
                break;
            case FEEDBACK.hasClass( 'open' ):
                seeScrollData = idDataSubFeedback;
                seeScroll     = FEEDBACK.find( '[data-subpage]' );
                break;
        }
        if ( !PHOTO.hasClass( 'open' ) ) {
            photoRemoveVisible();
        } else {
            photoVisible();
        }

        var valScale = 1 + ( -( ( 0.2 / seeScrollData.find( '[data-sub-load]' ).height() ) * seeScrollData.find( '[data-sub-load]' ).offset().top ));
        //var cssScale = ( { 'transform': 'scale(' + valScale + ') translateZ(0)' } );
        var cssScale = ( {'transform': 'scale(' + valScale + ') translateZ(0)'} );

        //$( '.about-main-background img' ).css({'transform': 'translateY('+ ((valScale -1) * 4000) +'px) translateZ(0)'});
        //$( '.about-main-title' ).css({'transform': 'translateY('+ -((valScale -1) * 2e4) +'px) translateZ(0)'});


        if ( _aboutPow ) {
            aboutBgPosition.deposition( {
                whatKind: ABOUT.find( '.about-main-section' ),
                inWhichA: '.about-main-background',
                value   : 0.6
            } );

        }

        //console.log( $page2.find( '.about-main-section' ).length != false );

        //$( '.about-main-section' ).css({'transform': 'translateY('+ -((valScale -1) * 2e4) +'px) translateZ(0)'});

        if ( _chrome && scaleBg ) {
            if ( $containerMainPhoto.hasClass( 'visible' ) ) {
                $containerMainPhoto.css( cssScale );
            }
            if ( $videoContainer.hasClass( 'visible' ) ) {
                $videoContainer.css( cssScale );
            }
        }

        headerHidden( seeScroll, seeScrollData.find( '[data-sub-load]' ) );

        //console.log('seeScroll = '+ seeScroll.parent().attr('id'));
        //console.log('seeScrollData = '+ seeScrollData.parents().attr('id'));
    }

    function pageEventScroll( ap, bf ) {
        ap.on( 'scroll', function () {
            bf();
        } );
    }

    //===============================

    var valTr      = 500,
        outPage    = {
            'opacity'   : '0',
            'transform' : 'scale(0.99) translateZ(0)',
            'transition': 'opacity 0.' + valTr * 0.7 + 's 0s, transform 0.8s .' + valTr * 0.00007 + 's'
        },
        inPage     = {
            'opacity'   : '1',
            'transform' : 'scale(1)    translateZ(0)',
            'transition': 'opacity 0.' + valTr * 0.7 + 's 0s, transform 0.' + valTr * 0.7 + 's 0s'
        },
        outPage404 = {
            'opacity'   : '0',
            'transform' : 'scale(0.94) translateZ(0)',
            'transition': 'opacity 0.' + valTr * 0.7 + 's 0s, transform 0.8s .' + valTr * 0.00007 + 's'
        },
        inPage404  = {
            'opacity'   : '1',
            'transform' : 'scale(1)    translateZ(0)',
            'transition': 'opacity 0.' + valTr * 0.7 + 's 0s, transform 0.' + valTr * 0.7 + 's 0s'
        };

    //Todo: ajax loader page
    var autoTopContainer = 0;// preload top page scrollTop: 0, 1
    function pageIntervalLoading( option ) {
        var textTitle   = option.container.parents( '.contents' ).find( loadingPageName );
        var dataPageStr = option.container.parents( '[data-page]' );
        var str         = dataPageStr.find( '[data-sub-load]' );
        option.container.css( outPage );
        $.ajax( {
            url       : option.address,
            context   : option.container,
            cache     : false,
            success   : function ( data ) {
                textTitle.fadeOut( valTr * 0.1 );
                setTimeout( function () {
                    textTitle.text( 'LOADING' ).fadeIn( valTr * 0.3 );
                }, valTr * 0.12 );
                $( '.loading-page' ).fadeIn( valTr * 0.3 );
                if ( BLOG.hasClass( 'open' ) ) {
                    // $( '.blog-auto-navigation' ).addClass( 'blogAuto-closed' );
                    $containerBlogTopBottom.addClass( 'blogAuto-closed' );
                }
                if ( autoTopContainer === 1 ) {
                    option.container
                          .parents( str )
                          .stop( !0, !1 )
                          .animate( {scrollTop: 0}, str.scrollTop() / (valTr * 0.00165), 'easeInOutSine' );

                    disablePointerEvents( str.scrollTop() / (valTr * 0.00165) );
                }
                setTimeout( function () {
                    option.container.empty();
                    eventHeaderHidden();
                    if ( autoTopContainer !== 0 ) {
                        option.container.html( data );
                    }
                    if ( autoTopContainer === 0 ) {
                        setTimeout( function () {
                            option.container.html( data );
                        }, valTr * 0.1 );
                    }
                }, valTr * 0.7 );
            },
            statusCode: {
                404: function () {
                    $.ajax( {
                        url    : 'html/404.html',
                        success: function ( da404 ) {
                            if ( BLOG.hasClass( 'open' ) ) {
                                blog_auto_navigation.empty();
                            }
                            option.container.css( outPage404 );
                            textTitle.fadeOut( valTr * 0.5 );
                            setTimeout( function () {
                                option.container.html( da404 );
                            }, valTr );
                        }
                    } ).done( function () {
                        setTimeout( function () {
                            option.container.css( inPage404 );
                            textTitle.text( '404' ).fadeIn( valTr * 0.5 );
                            eventHeaderHidden();
                            option.container.parents( str ).stop( !0, !1 ).animate( {scrollTop: 0}, valTr * 2.65 );
                        }, valTr );
                    } );
                }
            }
        } ).done( function () {
            setTimeout( function () {
                if ( BLOG.hasClass( 'open' ) ) {
                    blogAutoNav();
                }
                textTitle.fadeOut( valTr * 0.3 );
                setTimeout( function () {
                    if ( powFotorama === 1 ) {
                        option.container.append( '<script>$(".fotorama").fotorama();</script>' );
                    }
                    textTitle.text( option.container.find( '[data-name-page]' ).attr( 'data-name-page' ) ).fadeIn( valTr * 0.8 );
                    //statsReload();

                    option.container.css( inPage );
                    $( '.loading-page' ).fadeOut( valTr * 0.7 );
                    setTimeout( function () {
                        option.container.css( {'transform': ''} );
                    }, valTr * 0.7 );
                    setTimeout( function () {
                        eventHeaderHidden();
                        pageEventScroll( seeScroll, eventHeaderHidden );
                        if ( ABOUT.hasClass( 'open' ) ) {
                            aboutBgHeight();
                        }
                        if ( BLOG.hasClass( 'open' ) ) {
                            blogAuto();
                        }
                        if ( FEEDBACK.hasClass( 'open' ) ) {
                            initializeGMaps();
                        }
                    }, valTr );
                    eventLoadPage.eventLoad( dataPageStr.attr( 'data-page' ) );
                }, valTr * 0.3 );
            }, valTr * 0.7 );
        } );
    }

    function blogAutoNav() {
        var obj = {}, tmp = '';
        setTimeout( function () {
            obj = idDataBlog.find( '[data-check]' );
            blog_auto_navigation.empty();
            obj.each( function () {
                tmp += '<li><span></span></li>';
            } );
            blog_auto_navigation.prepend( tmp );
            // blog_auto_navigation.empty();
            // $.each( BLOG.find( '[data-blog] [data-check]' ), function () {
            //     blog_auto_navigation.prepend( '<li><span></span></li>' );
            // } );
            // setTimeout( function () {

            // blog_auto_navigation.removeClass( 'blogAuto-closed' ).css( {'transform': 'translateY(-' + blog_auto_navigation.height() * 0.5 + 'px)'} );
            $containerBlogTopBottom.removeClass( 'blogAuto-closed' ).css( {'transform': 'translateY(-' + $containerBlogTopBottom.outerHeight() * 0.5 + 'px)'} );

            // }, 400 );
            // positionDataCheck( 0 );
            //sidebarBlog();
        }, 500 );
    }


    //var dataBlogSidebar;
    //function sidebarBlog() {
    //    dataBlogSidebar = '<div class="load-checks"></div>';
    //    $page5.find('[data-blog-sidebar]').empty();
    //    $.each($page5.find('[data-check]').find('.blog-preview-create-data'), function (i) {
    //        dataBlogSidebar += '<div data-sidebar="'+ i +'">' + $('[data-check]').eq(i).find('.blog-preview-create-data').html() + '</div>'
    //    });
    //
    //    $page5.find('[data-blog-sidebar]').append(dataBlogSidebar);
    //    $page5.find('[data-blog-sidebar] .load-checks').remove();
    //}


    //var sidebarContainer;
    //var _timeSidebarContainer;
    var blogAutoProgress = !0;//remove first point (boolean: true)
    function blogAuto() {
        //sidebarContainer = $('[data-blog-sidebar] [data-sidebar]');
        //clearTimeout(_timeSidebarContainer);
        BLOG.find( '[data-check]' ).each( function ( index, element ) {
            var el = $( element ).height() * 0.5;
            if ( $( element ).offset().top <= el && $( element ).offset().top >= -100 ) {
                //_timeSidebarContainer = setTimeout(function () {
                //    if (!sidebarContainer.eq(index).hasClass('active')) {
                //        sidebarContainer.not(sidebarContainer.eq(index).addClass('active')).removeClass('active');
                //    }
                //}, 20);
                if ( !blogAutoProgress ) {
                    if ( !blog_auto_navigation.find( 'li' ).eq( index ).hasClass( 'active-blog-check' ) ) {
                        blog_auto_navigation.find( 'li' ).not( blog_auto_navigation.find( 'li' ).eq( index ).addClass( 'active-blog-check' ) ).removeClass( 'active-blog-check' );
                    }
                }
            }

            if ( !!blogAutoProgress ) {
                if ( $( element ).offset().top <= BODY.height() * 0.5 ) {
                    if ( !blog_auto_navigation.find( 'li' ).eq( index ).hasClass( 'active-blog-check' ) ) {
                        blog_auto_navigation.find( 'li' ).eq( index ).addClass( 'active-blog-check' );
                    }
                } else {
                    if ( blog_auto_navigation.find( 'li' ).eq( index ).hasClass( 'active-blog-check' ) ) {
                        blog_auto_navigation.find( 'li' ).eq( index ).removeClass( 'active-blog-check' );
                    }
                }
            }
        } );
    }

    pageEventScroll( BLOG.find( data_subpage ), blogAuto );

    blog_auto_navigation.on( 'click', 'li', function () {
        positionDataCheck( $( this ).index() );
    } );

    //Todo: navigation position [data-check]
    function positionDataCheck( num ) {
        var container       = BLOG.find( data_subpage ),
            timeBlogPagePos = 7e2,
            blogCheck       = container.find( '[data-check]' ),
            index           = num,
            position        = blogCheck.eq( index ).offset().top;

        elementsActive( blogCheck, num );

        toTopper( container, position + container.scrollTop() - BLOG.height() * 0.15, timeBlogPagePos );
        disablePointerEvents( timeBlogPagePos );
    }

    //Todo: Blog tot top, to bottom
    $containerBlogTopBottom.on( 'click', '#toTopBlog', function () {
        toTopper( BLOG.find( data_subpage ), 0, 9e2 );
    } ).on( 'click', '#toBottomBlog', function () {
        toTopper( BLOG.find( data_subpage ), idDataBlog.height(), 9e2 );
    } );

    //Todo: topper
    function toTopper( el, val, time ) {
        el.stop( !0, !1 ).animate( {
            scrollTop: val
        }, time, 'easeInOutSine' );
    }

    //Todo: Blog menu link
    function blogMenuLink() {
        var paginationLink = $( '#paginationLink' );
        var more           = idDataBlog.find( '[data-more]' );
        var tmp            = '';
        var name           = '';
        var link           = '';
        var $thisHref      = {};
        paginationLink.empty();
        more.each( function () {
            $thisHref = $( this ).attr( 'href' );
            if ( $thisHref === undefined ) {
                link = '#blog';
            } else {
                link = $thisHref;
            }
            name = $( this ).parents( '[data-check]' ).find( '[data-blog-title]' ).text();
            tmp += '<li class="pseudo-container"><a class="selects go-to-the-news" data-more="" href="' + link + '">' + name + '</a><div class="selects squander-page"></div></li>';
        } );
        paginationLink.prepend( tmp );
        paginationLink.find( 'li:first-child .squander-page' ).addClass( 'active' );
        idDataBlog.find( '[data-check]' ).eq( 0 ).addClass( 'active' );

        //sidebarBlog();
    }

    //Todo: blog header main link
    var blogLinkMain = $( '#blogLinkMain' );
    var takeBlogLink = $( '#takeBlogLink' );
    blogLinkMain.attr( 'href', takeBlogLink.attr( 'href' ) );

    /* -------------------------------------------------------------------------------- */
    /* Todo:     Watcher Location Address 				                                */
    /* -------------------------------------------------------------------------------- */
    //$('[data-switchPages]').on('click', 'a#home', function(){
    //    var redirect = '/#home/';
    //    history.pushState('', '', redirect);
    //    watchAddress();
    //});
    //var pr = '#about/html/about/about.html'.match( /([#?%a-zA-Z\d]+)\// );
    //console.log( pr[ 0 ] === '#about/' );


    //Todo: watch browser address string and command for function 'pageIntervalLoading( option: address, container )' loading
    (function () {
        var partition    = /#([?%a-zA-Z\d]+)\//;
        var regexSection = /([#a-z]+)\//g;
        var regexIn      = /\/([!?%#+-=_.&$@a-zA-Z\d\/]+)/;
        var _aAddressAbout;
        var _aAddressAudio;
        var _aAddressPhoto;
        var _aAddressBlog;
        var _aAddressFeedback;
        var locationHash;
        var hashReplace;
        var compareSection;
        var strMenuReadMore;
        var numberPage;
        var strBl;
        var str          = [ '#about/', '#audio/', '#photo/', '#blog/', '#feedback/' ];
        var compareEmpty = function ( anchor, anchorRe, container ) {
            if ( anchorRe !== hashReplace || container.is( ':empty' ) === true ) {
                pageIntervalLoading( {address: hashReplace, container: container} );
                anchor.attr( 'href', locationHash.replace( regexIn, '' ) + '/' + hashReplace );
            }
        };

        function watchAddress() {
            locationHash   = window.location.hash;
            hashReplace    = locationHash.replace( partition, '' );
            compareSection = locationHash.match( regexSection );

            _aAddressAbout    = _aAbout.attr( 'href' ).replace( str[ 0 ], '' );
            _aAddressAudio    = _aAudio.attr( 'href' ).replace( str[ 1 ], '' );
            _aAddressPhoto    = _aPhoto.attr( 'href' ).replace( str[ 2 ], '' );
            _aAddressBlog     = _aBlog.attr( 'href' ).replace( str[ 3 ], '' );
            _aAddressFeedback = _aFeedback.attr( 'href' ).replace( str[ 4 ], '' );

            if ( compareSection ) {

                switch ( compareSection[ 0 ] ) {
                    case str[ 0 ]:
                        compareEmpty( _aAbout, _aAddressAbout, data_about );
                        break;
                    case str[ 1 ]:
                        compareEmpty( _aAudio, _aAddressAudio, data_audio );
                        break;
                    case str[ 2 ]:
                        compareEmpty( _aPhoto, _aAddressPhoto, data_photo );
                        break;
                    case str[ 3 ]:
                        compareEmpty( _aBlog, _aAddressBlog, data_blog );
                        break;
                    case str[ 4 ]:
                        compareEmpty( _aFeedback, _aAddressFeedback, data_feedback );
                        break;
                }
            }
            eventOpenPage();
        }

        watchAddress();
        window.addEventListener( 'hashchange', watchAddress, false );
    })();

    function elClassName( el, str ) {
        if ( el ) {
            el.className = str;
        }
    }


    //Todo: menu active and open pages
    (function () {
        $activeBorder.height( menuPages_li.height() );

        var menuA      = variable.menu.querySelectorAll( 'a' );
        var border     = variable.menu.getElementsByClassName( 'activeBorder' )[ 0 ];
        var aLength    = menuA.length;
        var count      = [];
        count.id_      = [];
        count.parrent_ = [];
        count.getId    = [];
        var _hash;
        var hashStr;
        var strId, patHash, goal;

        for ( var i = 0; aLength > i; i++ ) {
            count.id_[ i ]      = menuA[ i ];
            count.parrent_[ i ] = count.id_[ i ].parentNode;
            count.getId[ i ]    = '#' + count.id_[ i ].id + '/';
        }

        strId   = '' + count.getId;
        patHash = /^#[a-z]+\//;

        function menuF() {
            _hash   = window.location.hash;
            hashStr = '' + _hash.match( patHash );
            goal    = '' + strId.match( hashStr );
            if ( goal === 'null' ) {
                goal = '#home/';
            }

            // if ( _hash || goal ) {

            for ( var i = 0; aLength > i; i++ ) {
                switch ( goal ) {
                    case count.getId[ i ]:
                        elClassName( count.parrent_[ i ], 'activeMenu' );
                        border.style.webkitTransform = 'translateY(' + (count.parrent_[ i ].offsetTop - variable.menu.offsetTop) + 'px)';
                        border.style.transform       = 'translateY(' + (count.parrent_[ i ].offsetTop - variable.menu.offsetTop) + 'px) translateZ(0px)';
                        mainPagePosition( i );
                        elClassName( variable.mainPage.getId[ i ], 'contents open' );
                        setup.set.num = i;
                        box( setup.set );
                        break;
                    default:
                        elClassName( count.parrent_[ i ], '' );
                        elClassName( variable.mainPage.getId[ i ], 'contents' );
                }
            }
            // }
            eventHeaderHidden();
            blogAutoNaviHidden();
        }

        menuF();
        window.addEventListener( 'hashchange', menuF, false );
    })();

    //Todo: Blog Auto Navigation
    function blogAutoNaviHidden() {
        if ( BLOG.hasClass( 'open' ) ) {
            // blog_auto_navigation.fadeIn( 0 ).removeClass( 'blogAuto-closed' );
            $containerBlogTopBottom.fadeIn( 0 ).removeClass( 'blogAuto-closed' );
        } else {
            // blog_auto_navigation.addClass( 'blogAuto-closed' ).delay( 8e2 ).hide( 0 );
            $containerBlogTopBottom.addClass( 'blogAuto-closed' ).delay( 8e2 ).hide( 0 );
        }
    }


    //Todo:  Hover Overlay
    //hoverText($('.boxMenuPages'), '[data-switchPages]');
    function hoverText( a, b ) {
        var containerSort,
            obj,
            left   = {transformOrigin: '50% 50%', transform: 'perspective(500px) translate(-100%, 0%) translateZ(0)'},
            right  = {transformOrigin: '50% 50%', transform: 'perspective(500px) translate(100%, 0%)  translateZ(0)'},
            top    = {transformOrigin: '50% 50%', transform: 'perspective(500px) translate(0%, -100%) translateZ(0)'},
            bottom = {transformOrigin: '50% 50%', transform: 'perspective(500px) translate(0%, 100%)  translateZ(0)'},
            tn0    = {transition: '0s'},
            trn    = {transition: '.2s linear'},
            def    = {transformOrigin: '50% 50%', transform: 'perspective(500px) translate(0%, 0%)'};
        a.on( 'mouseenter', b, function ( cord ) {
            containerSort = $( this );
            obj           = containerSort.find( 'span' );
            var x         = containerSort.width(), y = containerSort.height(), xCord = cord.pageX - containerSort.offset().left, yCord = cord.pageY - containerSort.offset().top;
            obj.css( tn0 );
            xCord < Math.abs( xCord - x ) && xCord < yCord && xCord < Math.abs( yCord - y ) && obj.css( left );
            xCord > Math.abs( xCord - x ) && Math.abs( xCord - x ) < yCord && Math.abs( xCord - x ) < Math.abs( yCord - y ) && obj.css( right );
            yCord < Math.abs( yCord - y ) && yCord < xCord && yCord < Math.abs( xCord - x ) && obj.css( top );
            yCord > Math.abs( yCord - y ) && Math.abs( yCord - y ) < xCord && Math.abs( yCord - y ) < Math.abs( xCord - x ) && obj.css( bottom );
            obj.css( 'transform' ) !== 'translate(0%, 0%)' && obj.css( trn ).css( def );
        } ).on( 'mouseleave', b, function ( cord ) {
            var x = containerSort.width(), y = containerSort.height(), xCord = cord.pageX - containerSort.offset().left, yCord = cord.pageY - containerSort.offset().top;
            obj.css( trn );
            xCord < Math.abs( xCord - x ) && xCord < yCord && xCord < Math.abs( yCord - y ) && obj.css( left );
            xCord > Math.abs( xCord - x ) && Math.abs( xCord - x ) < yCord && Math.abs( xCord - x ) < Math.abs( yCord - y ) && obj.css( right );
            yCord < Math.abs( yCord - y ) && yCord < xCord && yCord < Math.abs( xCord - x ) && obj.css( top );
            yCord > Math.abs( yCord - y ) && Math.abs( yCord - y ) < xCord && Math.abs( yCord - y ) < Math.abs( xCord - x ) && obj.css( bottom );
        } );
    }


    hoverOverlayCss( data_photo, '[data-sortPhoto]' );
    function hoverOverlayCss( a, b ) {
        var containerSort,
            obj,
            select = '-rotate3d';
        a.on( 'mouseenter', b, function ( cord ) {
            containerSort = $( this );
            obj           = containerSort.find( 'span' ).removeAttr( 'class' );
            var x         = containerSort.width(), y = containerSort.height(), xCord = cord.pageX - containerSort.offset().left, yCord = cord.pageY - containerSort.offset().top;
            xCord < Math.abs( xCord - x ) && xCord < yCord && xCord < Math.abs( yCord - y ) && obj.addClass( 'in-left' + select );
            xCord > Math.abs( xCord - x ) && Math.abs( xCord - x ) < yCord && Math.abs( xCord - x ) < Math.abs( yCord - y ) && obj.addClass( 'in-right' + select );
            yCord < Math.abs( yCord - y ) && yCord < xCord && yCord < Math.abs( xCord - x ) && obj.addClass( 'in-top' + select );
            yCord > Math.abs( yCord - y ) && Math.abs( yCord - y ) < xCord && Math.abs( yCord - y ) < Math.abs( xCord - x ) && obj.addClass( 'in-bottom' + select );
        } ).on( 'mouseleave', b, function ( cord ) {
            obj.removeAttr( 'class' );
            var x = containerSort.width(), y = containerSort.height(), xCord = cord.pageX - containerSort.offset().left, yCord = cord.pageY - containerSort.offset().top;
            xCord < Math.abs( xCord - x ) && xCord < yCord && xCord < Math.abs( yCord - y ) && obj.addClass( 'out-left' + select );
            xCord > Math.abs( xCord - x ) && Math.abs( xCord - x ) < yCord && Math.abs( xCord - x ) < Math.abs( yCord - y ) && obj.addClass( 'out-right' + select );
            yCord < Math.abs( yCord - y ) && yCord < xCord && yCord < Math.abs( xCord - x ) && obj.addClass( 'out-top' + select );
            yCord > Math.abs( yCord - y ) && Math.abs( yCord - y ) < xCord && Math.abs( yCord - y ) < Math.abs( xCord - x ) && obj.addClass( 'out-bottom' + select );
        } );
    }

//    End Hover Overlay

//    Stats
    function counterStats( numberStart, numberEnd, time, targetCount, targetCountContainer, maxCount ) {
        $( {num: numberStart} ).stop( !0, !1 ).delay( 0 ).animate( {num: numberEnd}, {
            duration: time,
            easing  : 'linear',
            step    : function () {
                targetCount.text( Math.round( this.num ) );
                targetCountContainer.css( 'width', Math.round( this.num ) / maxCount * 100 + "%" );
            }
        } );
    }

    var times        = 1000,
        maximumCount = 5000,
        dataViews,
        dataComments,
        dataLike,
        dataFollowers,
        dataWatch,
        strong,
        fully;

    //function watchStats_0() {
    //    counterStats(0, 3624, times, dataViews.find(strong), dataViews.find(fully), maximumCount)
    //}
    //
    //function watchStats_1() {
    //    counterStats(0, 2234, times, dataComments.find(strong), dataComments.find(fully), maximumCount)
    //}
    //
    //function watchStats_2() {
    //    counterStats(0, 835, times, dataLike.find(strong), dataLike.find(fully), maximumCount)
    //}
    //
    //function watchStats_3() {
    //    counterStats(0, 1434, times, dataFollowers.find(strong), dataFollowers.find(fully), maximumCount)
    //}
    //
    //function watchStats_4() {
    //    counterStats(0, 2255, times, dataWatch.find(strong), dataWatch.find(fully), maximumCount)
    //}
    //function watchRelSt() {
    //    counterStats(0, 3624, times, dataViews.find(strong), dataViews.find(fully), maximumCount);
    //    counterStats(0, 2234, times, dataComments.find(strong), dataComments.find(fully), maximumCount);
    //    counterStats(0, 835, times, dataLike.find(strong), dataLike.find(fully), maximumCount);
    //    counterStats(0, 1434, times, dataFollowers.find(strong), dataFollowers.find(fully), maximumCount);
    //    counterStats(0, 2255, times, dataWatch.find(strong), dataWatch.find(fully), maximumCount);
    //}

    function watchPosition( win, target, nameFunc ) {
        var dScroll = true;
        win.on( 'scroll', function () {
            if ( target && target.length ) {
                var topWatch    = win.outerHeight() + target.offset().top - target.outerHeight(),
                    bottomWatch = win.outerHeight() - target.offset().top;
                if ( topWatch > 0 && bottomWatch > 0 && dScroll ) {
                    dScroll = false;
                    if ( nameFunc ) {
                        nameFunc();
                    }
                    target.addClass( 'watch' );
                }
                else if ( topWatch < 0 || bottomWatch < 0 ) {
                    dScroll = true;
                    target.removeClass( 'watch' );
                    $( '.out-blog-preview-1' ).find( '.fully' ).css( {'width': '0'} );
                }
            }
        } );
    }

    var displayDays,
        displayHours,
        displayMinutes,
        displaySeconds,
        leftScDay,
        rightScDay,
        leftScHr,
        rightScHr,
        leftScMin,
        rightScMin,
        leftScSec,
        rightScSec,
        getDate  = new Date(),
        userDate = new Date( 2016, 1 - 1, 1 ),
        whatDays = 31;

    function strTimeCo( st ) {
        if ( st < 10 ) {
            st = '0' + st;
        }
        return st;
    }

    function timeToEvent( userDate, valDays, dy, hr, mn, sd ) {
        var d       = new Date(),
            days    = Math.floor( Math.round( userDate - d ) / 86400000 ),
            hours   = 24 - d.getHours() - 1,
            minutes = 60 - d.getMinutes() - 1,
            seconds = 60 - d.getSeconds() - 1,
            valDay  = days / valDays * 360,
            valHr   = hours / 24 * 360,
            valMin  = minutes / 60 * 360,
            valSec  = seconds / 60 * 360;

        dy.text( strTimeCo( days ) );
        hr.text( strTimeCo( hours ) );
        mn.text( strTimeCo( minutes ) );
        sd.text( strTimeCo( seconds ) );

        cssRr( valDay, leftScDay, rightScDay );
        cssRr( valHr, leftScHr, rightScHr );
        cssRr( valMin, leftScMin, rightScMin );
        cssRr( valSec, leftScSec, rightScSec );
    }

    function cssRr( val, lt, rt ) {
        var v  = val - 180,
            tm = 'transform',
            tr = 'transition';

        if ( v <= 180 && v >= 0 ) {
            lt.css( tm, 'rotate(' + v + 'deg)' );
            rt.css( tm, 'rotate(-180deg)' );
        }

        else if ( v <= 0 && v >= -180 ) {
            rt.css( tm, 'rotate(' + (v - 180) + 'deg)' );
            lt.css( tm, 'rotate(0deg)' );
        }

        if ( v > 170 ) {
            lt.css( tr, '.3s .31s' );
            rt.css( tr, '.3s' );
            setTimeout( function () {
                lt.css( tr, '0s' );
                rt.css( tr, '0s' );
            }, 1000 );
        }
    }


    /* Dots data blog blink*/
    //setInterval(function () {
    //    $page5.find('.data-themes > span').stop(!0, !1).animate({'opacity': '1'}, 0, function () {
    //        $(this).delay(1250).animate({'opacity': '0'}, 0);
    //    });
    //}, 2500);

    function statsReload() {
        if ( getDate < userDate ) {
            setInterval( function () {
                timeToEvent( userDate, whatDays, displayDays, displayHours, displayMinutes, displaySeconds );
            }, 1000 );
        }


        dataViews     = BLOG.find( '[data-stats-views]' );
        dataComments  = BLOG.find( '[data-stats-comments]' );
        dataLike      = BLOG.find( '[data-stats-like]' );
        dataFollowers = BLOG.find( '[data-stats-followers]' );
        dataWatch     = BLOG.find( '[data-stats-watch]' );
        strong        = (' strong');
        fully         = (' .fully');

        //watchPosition($page5.find(data_subpage), $('.out-blog-preview-1'), watchRelSt);
        //
        //watchPosition($page5.find(data_subpage), dataViews, watchStats_0);
        //watchPosition($page5.find(data_subpage), dataComments, watchStats_1);
        //watchPosition($page5.find(data_subpage), dataLike, watchStats_2);
        //watchPosition($page5.find(data_subpage), dataFollowers, watchStats_3);
        //watchPosition($page5.find(data_subpage), dataWatch, watchStats_4);

        displayDays    = BLOG.find( '[data-stats-days] .center > span' );
        displayHours   = BLOG.find( '[data-stats-hours] .center > span' );
        displayMinutes = BLOG.find( '[data-stats-minutes] .center > span' );
        displaySeconds = BLOG.find( '[data-stats-seconds] .center > span' );
        leftScDay      = BLOG.find( '[data-stats-days] .left-container-scala .scala' );
        rightScDay     = BLOG.find( '[data-stats-days] .right-container-scala .scala' );
        leftScHr       = BLOG.find( '[data-stats-hours] .left-container-scala .scala' );
        rightScHr      = BLOG.find( '[data-stats-hours] .right-container-scala .scala' );
        leftScMin      = BLOG.find( '[data-stats-minutes] .left-container-scala .scala' );
        rightScMin     = BLOG.find( '[data-stats-minutes] .right-container-scala .scala' );
        leftScSec      = BLOG.find( '[data-stats-seconds] .left-container-scala .scala' );
        rightScSec     = BLOG.find( '[data-stats-seconds] .right-container-scala .scala' );
    }

    //statsReload();

//Todo: UI tooltip
   $( document ).tooltip( {
       track: true,
       show : null,
       hide : null
   } );

    /* --------------------------------- */
    /*        Feedback Page || #page-5	 */
    /* --------------------------------- */
    //inputs hover
    var inputs = {};
    BODY.on( 'blur', '.inputs input, .inputs textarea', function ( e ) {
        e.preventDefault();
        if ( $( this ).val().length !== 0 ) {
            $( this ).parents().addClass( 'not-blur' );
        } else {
            $( this ).parents().removeClass( 'not-blur' );
        }
    } );


    //GOOGLE MAPS
    var greyscale         = [ {
            "featureType": "all",
            "elementType": "all",
            "stylers"    : [ {
                "saturation": -100
            }, {
                "gamma": 0.5
            } ]
        } ],
        coolGray          = [ {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers"    : [ {
                "visibility": "off"
            } ]
        }, {
            "featureType": "transit",
            "elementType": "labels",
            "stylers"    : [ {
                "visibility": "off"
            } ]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers"    : [ {
                "visibility": "off"
            } ]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers"    : [ {
                "visibility": "off"
            } ]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers"    : [ {
                "visibility": "off"
            } ]
        }, {
            "stylers": [ {"hue": "#00aaff"},
                {"saturation": -100},
                {"gamma": 2.4},
                {"lightness": 12} ]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers"    : [ {"visibility": "on"},
                {"lightness": 24} ]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers"    : [ {
                "lightness": 57
            } ]
        } ],
        unsaturatedBrowns = [
            {
                "elementType": "geometry",
                "stylers"    : [
                    {"hue": "#ff4400"},
                    {"saturation": -68},
                    {"lightness": -4},
                    {"gamma": 0.72}
                ]
            }, {
                "featureType": "road",
                "elementType": "labels.icon"
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers"    : [
                    {"hue": "#0077ff"},
                    {"gamma": 3.1}
                ]
            }, {
                "featureType": "water",
                "stylers"    : [
                    {"hue": "#00ccff"},
                    {"gamma": 0.44},
                    {"saturation": -33}
                ]
            }, {
                "featureType": "poi.park",
                "stylers"    : [
                    {"hue": "#44ff00"},
                    {"saturation": -23}
                ]
            }, {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers"    : [
                    {"hue": "#007fff"},
                    {"gamma": 0.77},
                    {"saturation": 65},
                    {"lightness": 99}
                ]
            }, {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers"    : [
                    {"gamma": 0.11},
                    {"weight": 5.6},
                    {"saturation": 99},
                    {"hue": "#0091ff"},
                    {"lightness": -86}
                ]
            }, {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers"    : [
                    {"lightness": -48},
                    {"hue": "#ff5e00"},
                    {"gamma": 1.2},
                    {"saturation": -23}
                ]
            }, {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers"    : [
                    {"saturation": -64},
                    {"hue": "#ff9100"},
                    {"lightness": 16},
                    {"gamma": 0.47},
                    {"weight": 2.7}
                ]
            }
        ],
        mataRed           = [
            {
                "elementType": "geometry",
                "stylers"    : [
                    {"hue": "#ff4400"},
                    {"saturation": -68},
                    {"lightness": -4},
                    {"gamma": 0.72}
                ]
            }
        ],
        ultraLight        = [ {
            "featureType": "water",
            "elementType": "geometry",
            "stylers"    : [ {"color": "#e9e9e9"}, {"lightness": 17} ]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers"    : [ {"color": "#f5f5f5"}, {"lightness": 20} ]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers"    : [ {"color": "#ffffff"}, {"lightness": 17} ]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers"    : [ {"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2} ]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers"    : [ {"color": "#ffffff"}, {"lightness": 18} ]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers"    : [ {"color": "#ffffff"}, {"lightness": 16} ]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers"    : [ {"color": "#f5f5f5"}, {"lightness": 21} ]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers"    : [ {"color": "#dedede"}, {"lightness": 21} ]
        }, {
            "elementType": "labels.text.stroke",
            "stylers"    : [ {"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16} ]
        }, {
            "elementType": "labels.text.fill",
            "stylers"    : [ {"saturation": 36}, {"color": "#333333"}, {"lightness": 40} ]
        }, {"elementType": "labels.icon", "stylers": [ {"visibility": "off"} ]}, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers"    : [ {"color": "#f2f2f2"}, {"lightness": 19} ]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers"    : [ {"color": "#fefefe"}, {"lightness": 20} ]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers"    : [ {"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2} ]
        } ];

    var labels          = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678';
    var labelIndex      = 0;
    var image           = 'image/desktopshare_6871.ico';
    //var image = 'image/ios-beaker.svg';
    var imageEmpty      = 'image/empty.png';
    var nameDislocation = '121 King St, Melbourne VIC 3000, Australia';

    var goldStar = {
        path        : 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor   : 'yellow',
        fillOpacity : 0.8,
        scale       : 1,
        strokeColor : 'gold',
        strokeWeight: 14
    };
    var flag     = {
        path        : 'M368 112c-11 1.4-24.9 3.5-39.7 3.5-23.1 0-44-5.7-65.2-10.2-21.5-4.6-43.7-9.3-67.2-9.3-46.9 0-62.8 10.1-64.4 11.2l-3.4 2.4V416h16V272.7c6-2.5 21.8-6.9 51.9-6.9 21.8 0 42.2 8.3 63.9 13 22 4.7 44.8 9.6 69.5 9.6 14.7 0 27.7-2 38.7-3.3 6-.7 11.3-1.4 16-2.2V109.5c-4.7.9-10.1 1.7-16.1 2.5z',
        fillColor   : 'yellow',
        fillOpacity : 0.8,
        scale       : 1,
        strokeColor : 'gold',
        strokeWeight: 1
    };

    function initializeGMaps() {

        var mapOptions = {
            //center: new google.maps.LatLng(-37.716418, 145.006255),//121 King St, Melbourne VIC 3000, Australia
            center            : {lat: -37.716418, lng: 145.006255},
            zoom              : 4,
            //mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeId         : google.maps.MapTypeId.TERRAIN,
            //mapTypeId: google.maps.MapTypeId.SATELLITE,
            scrollwheel       : !1,
            draggable         : !0,
            panControl        : !0,
            zoomControl       : !0,
            mapTypeControl    : !0,
            scaleControl      : !0,
            streetViewControl : !0,
            overviewMapControl: !0,
            rotateControl     : !0,
            styles            : coolGray
            /* greyscale, coolGray, unsaturatedBrowns, mataRed, ultraLight  */
        };
        var map        = new google.maps.Map( document.getElementById( 'maps_google' ), mapOptions );

        var marker = new google.maps.Marker( {
            position: mapOptions.center,
            label   : labels[ labelIndex++ % labels.length ],
            map     : map,
            icon    : imageEmpty,
            title   : nameDislocation
        } );


        var div = document.createElement( 'div' );
        div.setAttribute( 'id', 'custom-marker' );
        div.setAttribute( 'title', nameDislocation );
        var checkOut = !1;

        function markerPos() {
            var t          = ($( '#marker-maps' ).find( 'img' ).parent().css( 'top' ));
            var l          = ($( '#marker-maps' ).find( 'img' ).parent().css( 'left' ));
            div.style.top  = t;
            div.style.left = l;
            if ( t === $( '#maps_google' ).find( '#test-marker' ).css( 'top' ) && t !== undefined ) {
                checkOut = !0;
            }
        }

        var checkMarker = setInterval( function () {
            markerPos();
            if ( checkOut !== !1 ) {
                clearInterval( checkMarker );
            }
        }, 300 );


        checkOut !== !0 && setTimeout( function () {
            clearInterval( checkMarker );
        }, 7000 );

        $( window ).resize( function () {
            setTimeout( function () {
                markerPos();
            }, 1e2 );
        } );

        var myoverlay = new google.maps.OverlayView();

        myoverlay.draw = function () {
            this.getPanes().markerLayer.id = 'marker-maps';
            var panes                      = this.getPanes();
            panes.overlayImage.appendChild( div );
            markerPos();
        };
        myoverlay.setMap( map );
    }

//    END GOOGLE MAPS
} );


var py  = 0;
var yCd = 0;
function topPhotoPage() {
    var yy = Math.round( py += ((yCd - py) * 77) / 500 );
    if ( yy <= ($( "body" ).height() - 91) && yy >= 26 ) {
        $( 'body .photo-toTop' ).css( {
            'top': yy + $( '.photo-toTop' ).height() * .5
        } );
    }
    setTimeout( 'topPhotoPage()', 30 );
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
    var lastTime = 0;
    var vendors  = [ 'ms', 'moz', 'webkit', 'o' ];
    for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame  = window[ vendors[ x ] + 'CancelAnimationFrame' ]
            || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if ( !window.requestAnimationFrame )
        window.requestAnimationFrame = function ( callback, element ) {
            var currTime   = new Date().getTime();
            var timeToCall = Math.max( 0, 16 - (currTime - lastTime) );
            var id         = window.setTimeout( function () {
                    callback( currTime + timeToCall );
                },
                timeToCall );
            lastTime       = currTime + timeToCall;
            return id;
        };

    if ( !window.cancelAnimationFrame )
        window.cancelAnimationFrame = function ( id ) {
            clearTimeout( id );
        };
}());


$( 'div[data-page="photo"]' ).on( 'mousemove', function ( e ) {
    yCd = e.pageY - $( this ).offset().top;
} );
topPhotoPage();


// (function($) {
//
//     var resizeTimer; // Set resizeTimer to empty so it resets on page load
//
//     function resizeFunction() {
//         // Stuff that should happen on resize
//         console.log( 'Hello: ' + 1 );
//     }
//
//     // On resize, run the function and reset the timeout
//     // 250 is the delay in milliseconds. Change as you see fit.
//     $(window).resize(function() {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(resizeFunction, 250);
//     });
//
// })(jQuery);






