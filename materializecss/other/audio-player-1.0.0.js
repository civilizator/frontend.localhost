/**
 * Created by civilizator (Stanislav Kovrigin) on 06.04.2015.
 * argaatas@argaatas.com
 * civilizator@inbox.ru
 */
"use strict";
(function ( $ ) {
    var iDiv = $( '.container_ind_volume > div' );
    for ( var i = 0; i < 20; i++ ) {
        iDiv.append( '<div></div>' );
    }

    function bodyHeight( elem, vy, px ) {
        var bodyY = $( "body" ).height();
        elem.css( vy, bodyY - px + 'px' );
    }

    function page3YActivate() {
        bodyHeight( $( '.containerPlayList' ), 'height', 240 );
        bodyHeight( $( '.changeAlbum' ), 'height', 220 );
    }

    page3YActivate();

    $( window ).resize( function () {
        setTimeout( function () {
            page3YActivate();
        }, 100 );
    } );

    var switchAlbum = 0;
    var selectAlbum = $( '.selectAlbum' );
    selectAlbum.find( 'ul' ).find( 'li' ).removeClass( 'activeAlbum' );
    selectAlbum.find( 'ul' ).find( 'li[data-album="' + switchAlbum + '"]' ).addClass( 'activeAlbum' );
    var imgAlbum = document.getElementById( "imgAlbum" );

    var select,
        activeAlbum = function () {
            var dataAttr = select.attr( "data-album" );
            selectAlbum.find( 'ul' ).find( 'li' ).removeClass( 'activeAlbum' );
            selectAlbum.find( 'ul' ).find( 'li[data-album="' + dataAttr + '"]' ).addClass( 'activeAlbum' );
            $( '.containerPlayList' ).addClass( 'opacityPl' );
            $( '.containerTitleTrack' ).addClass( 'swAlbum' );
            $( '.changeImgAlbum' ).find( 'img' ).addClass( 'swImg' );
            setTimeout( function () {
                $( '#plList' ).remove();
                switchAlbum = dataAttr;
                albumSwitcher();
                $( '.containerPlayList' ).removeClass( 'opacityPl' );
                $( '.containerTitleTrack' ).removeClass( 'swAlbum' );
                $( '.changeImgAlbum img' ).addClass( 'swImg2' );
                setTimeout( function () {
                    var changeImgAlbumImg = $( '.changeImgAlbum img' );
                    changeImgAlbumImg.removeClass( 'swImg' );
                    changeImgAlbumImg.removeClass( 'swImg2' );
                }, 50 );
            }, 1000 );
        };

    selectAlbum.on( 'click', 'li', function () {
        if ( !$( this ).hasClass( 'activeAlbum' ) && $( this ).attr( 'data-album' ) ) {
            select = $( this );
            activeAlbum();
        }
        return false;
    } );

    setTimeout( function () {
        albumSwitcher();
    }, 100 );
    function albumSwitcher() {
        imgAlbum.src  = albums[ switchAlbum ].img;
        var mediaPath = albums[ switchAlbum ].path;
        var tracks    = albums[ switchAlbum ].tracks;

        var audioPL       = document.getElementById( 'audioPlayer' ),
            audioSeek     = document.getElementById( 'audioSeek' ),
            audioLoaded   = document.getElementById( 'audioLoaded' ),
            audioBuffered = document.getElementById( 'audioBuffered' );

        audioPL.crossOrigin = 'anonymous';

        function strTime( st ) {
            if ( st < 10 ) {
                st = '0' + st;
            }
            return st;
        }

        function timeFormatter( time ) {
            var min  = 60,
                hour = min * 60,
                h    = Math.floor( time / hour ),
                m    = Math.floor( (time - (h * hour)) / min ),
                s    = Math.floor( (time - (h * hour)) - (m * min) );
            return (strTime( h ) + ':' + strTime( m ) + ':' + strTime( s ));
        }

        audioPL.addEventListener( 'timeupdate', function () {
            var duration = this.duration,
                buffered = this.buffered,
                bufferedEnd;
            $( '#audioElapsed' ).text( timeFormatter( this.currentTime ) );
            if ( duration > 0 ) {
                audioLoaded.style.width   = this.currentTime / duration * 100 + "%";
                bufferedEnd               = buffered.end( buffered.end - 1 );
                audioBuffered.style.width = bufferedEnd / duration * 100 + "%";
            }
        } );

        audioPL.addEventListener( "loadedmetadata", function () {
            if ( this.duration > 0 ) {
                $( '#audioDuration' ).text( timeFormatter( this.duration ) );
            }
        } );

        audioPL.addEventListener( 'ended', function () {
            if ( this.ended ) {
                bufferedLoadedNull();
            }
        } );

        $( '#audioSeek' ).mousemove( function ( e ) {
            var leftX = e.pageX - $( this ).offset().left;
            $( "#mark" ).css( {
                'width'  : leftX + 'px',
                'opacity': '1'
            } );
        } ).mouseleave( function () {
            $( "#mark" ).css( {
                'opacity': '0'
            } );
        } );

        $( '#sliderVol' ).slider( {
            'range': "min",
            'min'  : 1,
            'max'  : 100,
            'value': 85,
            'slide': function ( event, ui ) {
                audioPL.volume = Math.floor( ui.value ) / 100;
            }
        } );

        function bufferedLoadedNull() {
            audioBuffered.style.width = 0;
            audioLoaded.style.width   = 0;
        }

        function temporarilyAudioSeek( element, time, delay ) {
            element.stop( !0, !1 )
                   .animate( {
                       'transition'      : time + 's',
                       'transition-delay': delay + 's'
                   }, 0 )
                   .delay( (time + delay) * 1000 )
                   .animate( {
                       'transition'      : '0s',
                       'transition-delay': '0s'
                   }, 0 );
        }

        audioSeek.addEventListener( "click", function ( e ) {
            audioPL.currentTime = audioPL.duration * ((e.offsetX || e.layerX) / audioSeek.clientWidth);
            temporarilyAudioSeek( $( '#audioLoaded' ), .3, 0 );
        } );


        var cZ = 100;

        function btnPauses() {
            if ( $( '#btnPauses' ).hasClass( 'playerControlActive' ) ) {
                audioPL.play();
            } else {
                audioPL.pause();
                setTimeout( function () {
                    $( '#btnPlays' ).removeClass( 'playerControlActive' );
                    $( '#btnStops' ).removeClass( 'playerControlActive' );
                    $( '#btnPauses' ).addClass( 'playerControlActive' );
                }, 100 );
                $( '.plSel' ).find( 'i' ).removeClass( 'play' ).addClass( 'pause' );
                $( '.border' ).css( {
                    'left': cZ * 0.05 + 'px'
                } );
            }
        }

        audioPL.addEventListener( 'play', function () {
            if ( audioPL.play ) {
                $( '#btnPlays' ).addClass( 'playerControlActive' );
                $( '#btnStops' ).removeClass( 'playerControlActive' );
                $( '#btnPauses' ).removeClass( 'playerControlActive' );
                $( '.plSel' ).find( 'i' ).removeClass( 'stop' ).removeClass( 'pause' ).addClass( 'play' );
                $( '.border' ).css( {
                    'left': cZ * 0.65 + 'px'
                } );
            }
        } );

        function btnStop() {
            audioPL.pause();
            temporarilyAudioSeek( $( '#audioLoaded' ), .3, .3 );
            audioPL.currentTime = 0;
            $( '#btnStops' ).addClass( 'playerControlActive' );
            $( '#btnPlays' ).removeClass( 'playerControlActive' );
            $( '#btnPauses' ).removeClass( 'playerControlActive' );
            $( '.plSel' ).find( 'i' ).removeClass( 'play' ).removeClass( 'pause' ).addClass( 'stop' );
            $( '.border' ).css( {
                'left': cZ * 1.25 + 'px'
            } );
        }

        function mutePlayer() {
            if ( $( "#mute" ).hasClass( 'playerControlActive' ) ) {
                audioPL.muted = false;
                setTimeout( function () {
                    $( "#mute" ).removeClass( 'playerControlActive' );
                }, 100 );
                if ( $( '#btnPlays' ).hasClass( 'playerControlActive' ) ) {
                    $( '.border' ).css( {
                        'left': cZ * 0.65 + 'px'
                    } );
                } else if ( $( '#btnStops' ).hasClass( 'playerControlActive' ) ) {
                    $( '.border' ).css( {
                        'left': cZ * 1.25 + 'px'
                    } );
                } else if ( $( '#btnPauses' ).hasClass( 'playerControlActive' ) ) {
                    $( '.border' ).css( {
                        'left': cZ * 0.05 + 'px'
                    } );
                }
            } else {
                audioPL.muted = true;
                setTimeout( function () {
                    $( "#mute" ).addClass( 'playerControlActive' );
                }, 100 );
                $( '.border' ).css( {
                    'left': cZ * 3.05 + 'px'
                } );
            }
        }

        $( ".plVol" ).click( function () {
            audioPL.muted = false;
            $( "#mute" ).removeClass( 'playerControlActive' );
            if ( $( '#btnPlays' ).hasClass( 'playerControlActive' ) ) {
                $( '.border' ).css( {
                    'left': cZ * 0.65 + 'px'
                } );
            } else if ( $( '#btnStops' ).hasClass( 'playerControlActive' ) ) {
                $( '.border' ).css( {
                    'left': cZ * 1.25 + 'px'
                } );
            } else if ( $( '#btnPauses' ).hasClass( 'playerControlActive' ) ) {
                $( '.border' ).css( {
                    'left': cZ * 0.05 + 'px'
                } );
            }
        } );

        function playTitle() {
            temporarilyAudioSeek( $( '#audioLoaded' ), 0.3, 0 );
            $( ".containerTitleTrack" ).stop( !0, !1 )
                                       .animate( {
                                           'width'    : '0',
                                           'transform': 'scale(0)',
                                           'opacity'  : '0'
                                       }, 250 )
                                       .animate( {
                                           'width'    : '95%',
                                           'transform': 'scale(1)',
                                           'opacity'  : '1'
                                       }, 250 );
        }

        function prevTrackTitle() {
            temporarilyAudioSeek( $( '#audioLoaded' ), 0.3, 0 );
            $( ".containerTitleTrack" ).find( "span" ).stop( !0, !1 )
                                       .animate( {
                                           'margin' : '0 0 0 -500px',
                                           'opacity': '0'
                                       }, 250 )
                                       .animate( {
                                           'margin' : '0 0 0 500px'
                                       }, 0 )
                                       .animate( {
                                           'margin' : '0 0 0 0',
                                           'opacity': '1'
                                       }, 400 );
        }

        function nextTrackTitle() {
            temporarilyAudioSeek( $( '#audioLoaded' ), 0.3, 0 );
            $( ".containerTitleTrack" ).find( "span" ).stop( !0, !1 )
                                       .animate( {
                                           'margin' : '0 0 0 500px',
                                           'opacity': '0'
                                       }, 250 )
                                       .animate( {
                                           'margin' : '0 0 0 -500px'
                                       }, 0 )
                                       .animate( {
                                           'margin' : '0 0 0 0',
                                           'opacity': '1'
                                       }, 400 );
        }


        $( '.containerPlayList' ).prepend( '<ul id="plList" class="playList"></ul>' );
        var ap     = $( '#audioPlayer' );
        var ctrl,
            playListAttr,
            index  = 0,
            played = false,
            trackCount;

        var ulPlayList = $( 'ul.playList' ),
            tmp        = '';
        $.each( tracks, function ( count, item ) {
            trackCount = count + 1;
            tmp += '<li><i>' + item + '</i></li>';
        } );
        ulPlayList.append( tmp );

        $( 'ul.playList li:first-child' ).addClass( 'plSel' );

        ap.on( 'play', function () {
            played = true;
        } );

        ap.on( 'pause', function () {
            played = false;
        } );

        ap.on( 'ended', function () {
            if ( index + 1 < trackCount ) {
                index++;
                loadTrack( index );
                audioPL.play();
            } else {
                audioPL.pause();
                index = 0;
                loadTrack( index );
            }
        } );

        function btnPrev() {
            if ( index - 1 > -1 ) {
                index--;
                loadTrack( index );
                if ( played ) {
                    audioPL.play();
                }
            } else {
                audioPL.pause();
                index = 0;
                loadTrack( index );
            }
        }

        function btnNext() {
            if ( index + 1 < trackCount ) {
                index++;
                loadTrack( index );
                if ( played ) {
                    audioPL.play();
                }
            } else {
                audioPL.pause();
                index = 0;
                loadTrack( index );
            }
        }

        function selectControl() {
            var attrId = ctrl.attr( "id" );
            switch ( attrId ) {
                case "btnPrev":
                    btnPrev();
                    prevTrackTitle();
                    break;
                case "btnNext":
                    btnNext();
                    nextTrackTitle();
                    break;
                case "btnPlays":
                    playTitle();
                    audioPL.play();
                    break;
                case "mute":
                    mutePlayer();
                    break;
                case "btnPauses":
                    btnPauses();
                    break;
                case "btnStops":
                    btnStop();
                    break;
                default:
                    btnStop();
            }
        }

        $( '.control' ).on( 'click', 'li[data-audio-ctrl]', function () {
            ctrl = $( this );
            selectControl();
        } );

        function selectPlayList() {
            var indexTrack;
            audioPL.play();
            indexTrack = parseInt( playListAttr.index() );
            if ( indexTrack !== index ) {
                playTrack( indexTrack );
                playTitle();
            }
        }

        var containerPlayList = $( '.containerPlayList' );
        containerPlayList.on( 'click', 'li', function () {
            playListAttr = $( this );
            selectPlayList();
        } );

        function loadTrack( id ) {
            $( '.plSel i' ).removeClass( 'play' );
            $( '.plSel' ).removeClass( 'plSel' );
            $( '#plList li:eq(' + id + ')' ).addClass( 'plSel' );
            setTimeout( function () {
                $( ".containerTitleTrack" ).find( "span" ).text( tracks[ id ] );
            }, 250 );
            index       = id;
            audioPL.src = mediaPath + tracks[ id ];
        }

        function playTrack( id ) {
            loadTrack( id );
            audioPL.play();
        }

        loadTrack( index );

        setTimeout( function () {
            btnStop();

        }, 700 );
        containerPlayList.stop( !0, !1 ).delay( 100 ).animate( {scrollTop: 0}, 500, 'easeOutCubic' );
    }

    $( '.changeAlbum' ).stop( !0, !1 ).animate( {scrollTop: 50}, 50 ).delay( 100 ).animate( {scrollTop: 0}, 100 );
    if ( navigator.userAgent.indexOf( "Chrome" ) != -1 ) {
        $( '.ejectIndicator' ).delay( 2500 ).fadeIn( 100 );
    }

})( jQuery );
