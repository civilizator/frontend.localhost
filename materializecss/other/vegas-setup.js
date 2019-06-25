"use strict";
(function () {
//ctrlBackground.style.backgroundImage = 'url("' + slideSettings.src + '")';
    var timeNextInterval = 8000;
    var photoDefault     = 2;

    var body_               = document.getElementById( 'body' ),
        containerSwPhoto    = document.getElementById( 'container-sw-photo' ),
        namePhoto           = document.getElementById( 'name-photo' ),
        controlBg           = document.getElementById( 'control-bg' ),
        ctrlBackground      = document.getElementById( 'controlBgBackground' ),

        playPhoto           = document.getElementById( 'playPhoto' ),
        loadInd             = document.getElementById( 'loadInd' ),

        nowPhoto            = document.getElementById( 'nowPhoto' ),
        countPhoto          = document.getElementById( 'countPhoto' ),
        miniChanger         = document.getElementById( 'miniChanger' ),
        boxMiniChange       = document.getElementById( 'boxMiniChange' ),
        ejectMiniChange     = document.getElementById( 'ejectMiniChange' ),


        $containerMainPhoto = $( '#containerMainPhoto' );

    var $containerSwPhoto     = $( '#container-sw-photo' );
    var $ctrlBackground       = $( '#controlBgBackground' );
    var $backgroundPrevFilter = $( '#backgroundPrevFilter' );
    var $miniPreview          = $( '#miniPreview' );
    var $boxMiniChange        = $( '#boxMiniChange' );

    var $backgroundPrevClass = $( '.background-prev-filter' );

    var tmp_photo_thumb = [];

    tmp_photo_thumb.thumb = '';
    tmp_photo_thumb.name  = '';
    tmp_photo_thumb.mini  = '';
    sourcePhoto._bgIMG    = [];

    function createMenu( element, index ) {
        tmp_photo_thumb.name += '<span id="name-photo' + index + '" class="out-name">' + element.name + '</span>';
        tmp_photo_thumb.thumb += '<li data-bgPhoto="' + index + '"><img src=' + element.prev + '><span>' + (strTimeCo( parseInt( index ) + 1 )) + '</span><p class="hoverCh"></p></li>';
        tmp_photo_thumb.mini += '<span data-bgPhoto="' + index + '" class="name-mini" title="' + element.name + '">' + (strTimeCo( parseInt( index ) + 1 )) + ' ' + element.name + '</span>';
        sourcePhoto._bgIMG.push( {'src': '' + sourcePhoto[ index ].img} );
    }

    sourcePhoto.forEach( createMenu );
    containerSwPhoto.innerHTML = '<ul class="swPhoto">' + tmp_photo_thumb.thumb + '</ul>';
    namePhoto.innerHTML        = tmp_photo_thumb.name;
    miniChanger.innerHTML      = tmp_photo_thumb.mini;
    countPhoto.innerText       = strTimeCo( sourcePhoto.length );

    function hiddenMiniChange() {
        if ( $boxMiniChange.hasClass( 'hidden' ) ) {
            $boxMiniChange.removeClass( 'hidden ' + 'bounceOut' ).addClass( 'bounceIn' );
        } else {
            $boxMiniChange.removeClass( 'bounceIn' ).addClass( 'hidden ' + 'bounceOut' );
        }
    }

    ejectMiniChange.addEventListener( 'click', hiddenMiniChange );

    var loader = {
        in : function () {
            loadInd.className = 'ctrl-photo loading';
        },
        out: function () {
            loadInd.className = 'ctrl-photo';
        }
    };

    var option0 = {//control
        slides    : sourcePhoto._bgIMG,
        slide     : photoDefault,
        //timer             : !1,
        autoplay  : !1,
        //shuffle  : !0,
        //transitionDuration: 300,
        transition: 'slideUp2',
        //animation : 'random',
        delay     : timeNextInterval
    };

    var option1 = {//prev photo filter
        slides    : sourcePhoto._bgIMG,
        slide     : photoDefault,
        //timer     : !1,
        autoplay  : !1,
        //shuffle  : !0,
        //transitionDuration: 400,
        transition: 'slideDown2',
        //animation : 'random',
        delay     : timeNextInterval * 0.8
    };


    var option2 = {//main background
        slides    : sourcePhoto._bgIMG,
        slide     : photoDefault,
        timer     : !1,
        autoplay  : !1,
        //shuffle  : !0,
        //transitionDuration: 500,
        transition: 'fade2',
        //animation : 'random',
        delay     : timeNextInterval
    };

    var option3 = {//mini preview
        slides    : sourcePhoto._bgIMG,
        slide     : photoDefault,
        //timer     : !1,
        autoplay  : !1,
        //shuffle  : !0,
        //transitionDuration: 400,
        transition: 'slideRight2',
        //animation : 'random',
        delay     : timeNextInterval * 0.2
    };

    $containerMainPhoto.on( 'vegasplay', function () {
        addClass( playPhoto, 'play-bg auto' );
        controller.eventTimer( 'play' );
    } ).on( 'vegaspause', function () {
        addClass( playPhoto, 'play-bg' );
        controller.eventTimer( 'pause' );
    } ).on( 'vegaswalk', function ( e, index ) {
        controller.eventTimer( 'walk' );
        controller.bgphotoActive( index );
        jumper( index );
        loader.out();
    } ).on( 'vegasloader', function () {
        loader.in();
    } );

    $ctrlBackground.vegas( option0 );
    $backgroundPrevFilter.vegas( option1 );
    $containerMainPhoto.vegas( option2 );
    $miniPreview.vegas( option3 );

    function addClass( elem, str ) {
        elem.className = str;
    }

    function strTimeCo( str ) {
        if ( str < 10 ) {
            str = '0' + str;
        }
        return str;
    }

    function jumper( index ) {
        $ctrlBackground.vegas( 'jump', index );
        $backgroundPrevFilter.vegas( 'jump', index );
        $miniPreview.vegas( 'jump', index );
        nowPhoto.innerText = strTimeCo( parseInt( index ) + 1 );
    }


    var controller = {
        flagPlay  : !1,
        eventTimer: function ( string ) {
            switch ( string ) {
                case 'play':
                    this.flagPlay = !0;
                    return;
                    break;
                case 'pause':
                    this.flagPlay = !1;
                    progressOut();
                    return;
                    break;
                case 'walk':
                    progressIn();
                    break;
            }
        },
        control   : function ( e, string ) {
            if ( e ) {
                string = e.target.id;
            }
            switch ( string ) {
                case 'prevPhoto':
                    $containerMainPhoto.vegas( 'previous' );
                    break;
                case 'playPhoto':
                    $containerMainPhoto.vegas( 'toggle' );
                    break;
                case 'nextPhoto':
                    $containerMainPhoto.vegas( 'next' );
                    break;
            }
        },
        numberIndex          : null,
        thumbsSwitch         : function ( e ) {
            this.numberIndex = e.target.dataset.bgphoto;
            if ( this.numberIndex && e.target.className !== 'active' ) {
                $containerMainPhoto.vegas( 'jump', this.numberIndex );
            }
        },
        libgphoto            : containerSwPhoto.getElementsByTagName( 'li' ),
        out_name             : namePhoto.getElementsByClassName( 'out-name' ),
        mini                 : miniChanger.getElementsByTagName( 'span' ),
        bgphotolength        : containerSwPhoto.getElementsByTagName( 'li' ).length,
        writeThumbsSelector  : [],
        writeNameSelector    : [],
        writeMiniSelector    : [],
        writeSelectorVariable: function () {
            for ( var i = 0; i < this.bgphotolength; i++ ) {
                if ( this.libgphoto[ i ].dataset.bgphoto ) {
                    this.writeThumbsSelector[ i ] = this.libgphoto[ i ];
                    this.writeNameSelector[ i ]   = this.out_name[ i ];
                    this.writeMiniSelector[ i ]   = this.mini[ i ];
                }
            }
        },
        bgphotoActive        : function ( num ) {
            for ( var i = 0; i < this.bgphotolength; i++ ) {
                if ( i !== num ) {
                    this.writeThumbsSelector[ i ].className = '';
                    this.writeMiniSelector[ i ].className   = 'name-mini';
                    this.writeNameSelector[ i ].className   = 'out-name';
                }
            }
            this.writeThumbsSelector[ num ].className = 'active';
            this.writeMiniSelector[ num ].className   = 'name-mini active';
            this.writeNameSelector[ num ].className   = 'out-name active';
            animateCss();
        }
    };

    function animateCss() {
        $backgroundPrevClass.removeClass( 'fadeInRight' ).addClass( 'fadeOutRight' );
        setTimeout( function () {
            $backgroundPrevClass.removeClass( 'fadeOutRight' ).addClass( 'fadeInRight' );
        }, 1000 );
    }

    //function pr( num ) {
    //    $( '#miniChanger' ).stop( !0, !1 ).animate( {
    //        //scrollTop: $('.name-mini' ).eq( num ).offset().top - $('#miniChanger').scrollTop()
    //    }, 400, 'easeInOutSine' );
    //    console.log( $( '.name-mini' ).eq( num ).offset().top - $( '#miniChanger' ).scrollTop() );
    //}

    controlBg.addEventListener( 'click', controller.control );
    containerSwPhoto.addEventListener( 'click', controller.thumbsSwitch );
    miniChanger.addEventListener( 'click', controller.thumbsSwitch );
    controller.writeSelectorVariable();

    var indicatorTransition = document.getElementById( 'indicatorTransition' );
    var transLi             = indicatorTransition.getElementsByTagName( 'li' );

    var progressTime = document.getElementById( 'progressTime' );
    var progressLi   = progressTime.getElementsByTagName( 'li' );

    function TimeIndicators() {
    }

    TimeIndicators.prototype.transformCss = {
        tags       : null,
        inLength   : null,
        transformer: function ( option ) {
            this.tags     = option.tag;
            this.inLength = this.tags.length;
            for ( var i = 0; this.inLength > i; i++ ) {
                var obj = this.tags[ i ].style;
                if ( option.function_ ) {
                    option.function_( obj, i, this.inLength );
                }
                obj.transitionProperty       = option.prop;
                obj.transitionTimingFunction = option.timingF;
                obj.transitionDuration       = option.time;
            }
        },
        inTrans    : {
            tag      : transLi,
            time     : '0ms',
            prop     : 'background',
            timingF  : 'step-end',
            function_: function ( obj, i, inLength ) {
                obj.background      = '#8E8E8E';
                obj.transitionDelay = (timeNextInterval / inLength) * i + 'ms';
            }
        },
        outTrans   : {
            tag      : transLi,
            time     : '0ms',
            prop     : '',
            function_: function ( obj ) {
                obj.transitionDelay = '';
                obj.background      = '';
            }
        }
    };

    var timers                              = new TimeIndicators();
    progressLi[ 0 ].style.animationDuration = timeNextInterval + 'ms';

    function progressOut() {
        timers.transformCss.transformer( timers.transformCss.outTrans );
        progressLi[ 0 ].className = 'backer';
    }

    function progressIn() {
        progressOut();
        controller.flagPlay && setTimeout( function () {
            timers.transformCss.transformer( timers.transformCss.inTrans );
            progressLi[ 0 ].className = 'dreamer';
        }, 100 );
    }
})();