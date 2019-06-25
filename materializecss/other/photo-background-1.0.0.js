/**
 * Created by civilizator (Stanislav Kovrigin) on 01.08.2015.
 * argaatas@argaatas.com
 * civilizator@inbox.ru
 */

"use strict";

//$('<div id="containerMainPhoto"></div>').appendTo("body");
var body_              = document.getElementById('body'),
    playPhoto          = document.getElementById('playPhoto'),
    controlBg          = document.getElementById('control-bg'),
    loadInd            = document.getElementById('loadInd'),
    containerMainPhoto = $('#containerMainPhoto'),
    containerSwPhoto   = $('div.container-sw-photo');

containerSwPhoto.append('<ul class="swPhoto"></ul>');

var swPhoto            = containerSwPhoto.find('.swPhoto'),
    index              =    2,   //  num photo
    cookieDays         =  365,   //  save day cookies
    timeNextInterval   = 4000,   //  time interval switch photo & animate time
    timeSlice          =    1,   //  1
    opacityTransition  =  900,   //  1500
    res                =    1,   //  var: 1, 2, 3
    autoCheck          =   !1,   //  true || false. photo auto switch
    nameAnimate        =   '',   //  zoom-in, zoom-out, zoom-in-right-top, if '' = none animate
    thumbsSw           = 'thumbs-sw-',
    intervalAutoCheck,
    photoCount,
    inAnimate          = '',
    mainBgPhoto        = '',
    tmp_photo_thumb    = [];
tmp_photo_thumb.thumb  = '';
tmp_photo_thumb.name   = '';

sourcePhoto._temp_bg   = [];
sourcePhoto._tag_img   = [];
sourcePhoto._bgIMG     = [];

if ( res === 2 || 3 ) {
    var sizeLi            = document.createElement('div');
    sizeLi.style.position = 'absolute';
    sizeLi.style.zIndex   = '-1000000';
    sizeLi.style.width    =    '240px';
    sizeLi.style.height   =    '120px';
    body_.appendChild(sizeLi);
}

var sourcePhoto = [
    {
        "number": "1",
        "prev"  : "",
        "img"   : "img/unsplash.com/about/photo-1446421053596-b6801571b8bc.jpg",
        "name"  : "Anita Faraday"
    }
];

function createMenu( element, index ) {
    photoCount = index + 1;
        tmp_photo_thumb.name  += '<span id="name-photo' + index + '" class="out-name">' + element.name + '</span>';
    if ( res === 1 ) {
        tmp_photo_thumb.thumb += '<li   data-bgPhoto='  + index + '><img src=' + element.prev + '><span>' + photoCount + '</span><p class="hoverCh"></p></li>';
        return;
    }
     var _img_ = new Image();
     _img_.src = element.img;
     sourcePhoto._temp_bg.push( { 'img': '' + _img_.src } );
        tmp_photo_thumb.thumb += '<li   data-bgPhoto='  + index + ' id="li-' + (thumbsSw + index) + '"><canvas id="' + (thumbsSw + index) + '"></canvas><span>' + element.number + '</span><p class="hoverCh"></p></li>';
        _img_.addEventListener( 'load', function () { draw( this, thumbsSw + index , sizeLi ) } );
        sourcePhoto._tag_img[index] = _img_;
}

sourcePhoto.forEach( createMenu );

swPhoto.append( tmp_photo_thumb.thumb );

var namePhoto       = document.getElementById('name-photo');
namePhoto.innerHTML = tmp_photo_thumb.name;
var out_name        = namePhoto.getElementsByClassName('out-name');
var _on             = out_name.length;
function addRemoveName( num ) {
    for ( var i = 0; _on > i; i++ ) {
        if (  i   !==   num ) {
            namePhoto.querySelector( '#name-photo' + i ).className = 'out-name';
        }
    }
    namePhoto.querySelector('#name-photo' + num ).className = 'out-name active';
}


var progressVar    = 0;//1, 2, if '0' = none
var $progressPhoto = $( '#progressPhoto'  );

if ( progressVar === 0 ) {
    $progressPhoto.css( 'display', 'none' );
}

function progressTimeIndicator( val ) {
    var te         = 1200;
    if ( progressVar === 1 ) { $progressPhoto
            .css(     { 'width':  '0',  'left': '0' } ).stop( !0, !1 )
            .animate( { 'width':  '0%'      }, timeNextInterval / 10 )
            .animate( { 'width':  val + '%' }, timeNextInterval / 10 * 9 - te, 'easeOutQuad' )
            .animate( { 'width':  '0%', 'left' : '100%' },                 te, 'easeOutCubic' );
    }
    if ( progressVar === 2 ) { $progressPhoto
            .css(     { 'width':  '0',  'left': '0' } ).stop( !0, !1)
            .animate( { 'width':  '0%' },                           timeNextInterval / 10 )
            .animate( { 'left' : '75%', 'width': val * .25 + '%' }, timeNextInterval / 10 * 9 - te, 'easeOutQuad'  )
            .animate( { 'left' :  '0%', 'width': '0%' },                                        te, 'easeOutCubic' );
    }
}
var timesAnimate   = timeNextInterval / timeSlice,
    inOpacity      = {
        'opacity'    : '1',
        'transform'  : 'scale(1)',
        'transition' : 'transform 0s, opacity ' + opacityTransition + 'ms'
    },
    inPhoto        = {
        'transform-origin'          :    '-2% 2%',
        'animation-iteration-count' :         '1',
        'animation-delay'           :        '0s',
        'animation-timing-function' :   'ease-in', //cubic-bezier(0.07, 0.59, 0.46, 0.32)
        'animation-play-state'      :   'running',
        'animation-fill-mode'       :  'forwards',
        'animation-direction'       : 'alternate',
        'animation-name'            : nameAnimate,
        'animation-duration'        : timeNextInterval / timeSlice + 'ms'
    },
    animationPhoto = {
        'animation-play-state' : 'running'
    },
    pausedPhoto    = {
        'animation-play-state' :  'paused'
    };

function prevPhoto() { if ( index - 1 < 0 ) { index = photoCount - 1 } else { index-- }
    selectorPhoto( index )
}

function nextPhoto() { if ( index + 1 > photoCount - 1 ) { index = 0 } else { index++ }
    selectorPhoto( index );
}

function _idWorking( _getId_, _setId_, _function_ ) { if ( _getId_ === _setId_ ) { _function_()  } }

controlBg.addEventListener( 'click', switcher );


var indicatorAnimation = document.getElementById( 'indicatorAnimation' );
var anLi               = indicatorAnimation.getElementsByTagName( 'li' );

function Indicators() {}

Indicators.prototype.animationCss = {
    anIndicator: function ( option ) {
        var li       = option.li,
            inLength = li.length;
        for ( var i = 0; i < inLength; i++ ) {
            var obj               =   li[ i ].style;
            obj.zIndex            =   inLength - i;
            obj.animationName     =   option.anName;
            obj.animationFillMode =   option.anFillMode;
            obj.animationDuration =   option.time + 'ms';
            obj.animationDelay    = ((option.time / inLength) * i) + 'ms';
        }
    },
    anRunning: function ( option ) {
        for ( var i = 0; i < option.li.length; i++ ) {
            var obj = option.li[ i ].style.animationPlayState = 'running';
        }
    },
    anPaused: function ( option ) {
        for ( var i = 0; i < option.li.length; i++ ) {
            var obj = option.li[ i ].style.animationPlayState = 'paused';
        }
    }
};


var optionAn = {
    inAn: {
        li        : anLi,
        time      : timeNextInterval,
        anName    :   'transitionLi',
        anFillMode:       'forwards'
    },
    remAn: {
        li        : anLi,
        anName    :   '',
        anFillMode:   ''
    },
    runningPausedAn: {
        li        : anLi
    }
};

var indicatorTransition = document.getElementById( 'indicatorTransition' );
var transLi             = indicatorTransition.getElementsByTagName( 'li' );

Indicators.prototype.transformCss = {
    transformer: function ( option ) {
        var li       = option.li,
            inLength = li.length;
        for ( var i = 0; inLength > i; i++ ) {
              var obj = li[ i ].style;
            if ( option.transFunc ) {
                 option.transFunc( obj, i, inLength );
            }
            obj.transitionProperty       = option.prop;
            obj.transitionTimingFunction = option.timingFunction;
            obj.transform                = option.transform;
            obj.transitionDuration       = option.time + 'ms'
        }
    }
};

var optionTrans = {
    inTrans: {
        li            : transLi,
        time          : 100,
        transFunc     : function ( obj, i, inLength ) {
            //obj.transform       = 'translateX(' + 6 * i + 'px) translateZ(0)';
            obj.background      = 'rgba(241, 241, 241, 0.84)';
            obj.transitionDelay = (timeNextInterval / inLength) * i + 'ms';
//                obj.width           = 'calc(' + 100 / inLength + '% - 6px)';
//            obj.width = '120px)';
        },
        prop          : 'background',
        timingFunction: 'step-end'
    },
    outTrans: {
        li       : transLi,
        //transform: 'translateX(0px) translateZ(0)',
        transFunc: function ( obj ) {
            obj.transitionDelay = '';
            obj.width           = '';
            obj.background      = '';
//                obj.transitionTimingFunction = 'steps(' + inLength + ', end)';
//                obj.transitionDelay = 20 * (inLength - i) + 'ms';
        },
        time     : 0,
        prop     : ''
    }
};

var indicator = new Indicators();



function switcher( event ) {
    var _id = event.target.id;
    _idWorking( _id, 'prevPhoto',   prevPhoto);
    _idWorking( _id, 'nextPhoto',   nextPhoto);
    _idWorking( _id, 'playPhoto', autoChanger);
}

function autoChanger() {
    if (playPhoto.className === 'play-bg auto') {
        stopAutoSelect();
        containerMainPhoto.find('[data-mainBgPhoto]').css( pausedPhoto );
        autoCheck = false;
        return;
    }
    startAutoSelect();
    progressTimeIndicator(1e2);
    mainBgPhoto.css( inPhoto );
    autoCheck = true;
}

/*Todo: Клик по фото в меню, получить номер - индекс*/
containerSwPhoto.on( 'click', 'li[data-bgPhoto]', function () {
    if (!$(this ).hasClass('active')) {
        selectorPhoto( $(this).index() );
    }
});

/*Todo: Вызовется при нажатии 'назад' или 'вперед' а также и при 'Автозамене'*/
function selectorPhoto( num ) {
    stopAutoSelect();
    changeBackgroundPhoto(num);
    autoCheck && startAutoSelect();
    indicator.animationCss.anIndicator(optionAn.remAn);

    indicator.transformCss.transformer(optionTrans.outTrans);
    autoCheck && setTimeout( function () {
        indicator.animationCss.anIndicator(optionAn.inAn);
        indicator.animationCss.anRunning(optionAn.runningPausedAn);

        indicator.transformCss.transformer(optionTrans.inTrans);
    }, 20 );
}
selectorPhoto(index); //load num

/*Todo: Пуск автоматической смены фото. При нажатии на кнопку сработает Старт*/
function startAutoSelect() {
    /*идентификатору 'playPhoto' присвоятся классы 'play-bg auto'*/
    playPhoto.className = 'play-bg auto';
    /*индикатору 2 при нажатии на кнопку присвоится анимацияя 'transitionLi'*/
    indicator.animationCss.anIndicator(optionAn.inAn);
    /*индикатор 2 запустит анимациюю с именем 'transitionLi'*/
    indicator.animationCss.anRunning(optionAn.runningPausedAn);
    /*индикатор 1 запустится'*/
    indicator.transformCss.transformer(optionTrans.inTrans);
    /*интервалы для автоматической последовательной смены фото.*/
    intervalAutoCheck   = setInterval(function () {
        /*вызов функции отвечающей за последовательные смены фото*/
        nextPhoto();
        /*timeNextInterval = 'n' переменная с установленным временем*/
    }, timeNextInterval);
}

//console.log(localStorage.name);
/*Todo: Пауза и стоп автоматической смены фото. При нажатии на кнопку сработает Стоп*/
function stopAutoSelect() {
    /*идентификатору 'playPhoto' присвоится класс 'play-bg'*/
    playPhoto.className =  'play-bg';
    /*сброс автоматической смены фото*/
    clearInterval(intervalAutoCheck);
    /*пауза индикатора 2 при нажатии на кнопку*/
    indicator.animationCss.anPaused(optionAn.runningPausedAn);
    /*индикатор 1 при нажатии на кнопку обнулится*/
    indicator.transformCss.transformer(optionTrans.outTrans);
}

/*Todo: Функция генерирует и удаляет тэги с фото и классамиб идентификаторами*/
//if ( img.complete ) {
//    myCallback();
//} else if ( img.height && img.height > 0 ) {
//    myCallback();
//} else {
//    img.onload = myCallback;
//}
function getId( id ) { return document.getElementById( id ) }

function changeBackgroundPhoto( num ) {

    swPhoto.find( 'li[data-bgPhoto].active'     ).removeClass('active');
    swPhoto.find( 'li[data-bgPhoto="' + num + '"]' ).addClass('active');

    var photoB = containerMainPhoto.find( 'div._opacity'),
        pb     = photoB.length,
        url    = '',
        numId  = 'numbers' + num;
    photoB.find('[data-mainBgPhoto]').css( pausedPhoto );
    for ( var j = 0; j < pb; j++ ) {
        photoB.eq( j ).css( {'opacity': '', 'transform': '', 'transition': ''} );
    }

    if ( pb > 5 ) {
        for ( var i = 0; i < pb - 1; i++ ) {
            //photoB.eq( i + 1 ).find('[data-mainBgPhoto]').css( pausedPhoto );
            photoB.eq( i ).remove();
        }
    }

    if ( res === 1 ) {

        if ( sourcePhoto._bgIMG[ num ] === undefined ) {

            loadInd.style.color = 'red';
            loadInd.style.transition = '';
            sourcePhoto._bgIMG[ num ]     = new Image();
            sourcePhoto._bgIMG[ num ].src = sourcePhoto[ num ].img;
            sourcePhoto._bgIMG[ num ].addEventListener( 'load', function () {
                    url = sourcePhoto._bgIMG[ num ].src;
                    getId( '_opacity' + num ).children[0].style.backgroundImage = 'url(' + url + ' )';
                    console.log('c: ' + num + ' ' + sourcePhoto._bgIMG[ num ].complete + '\n' + url );
                    if (sourcePhoto._bgIMG[ num ].complete) {
                        loadInd.style.color = '';
                        loadInd.style.transition = '.3s';
                        //autoCheck && startAutoSelect();
                    }
                console.log( 'Hello: ' + getId( '_opacity' + num ).children[0] );
            } );
            if (!sourcePhoto._bgIMG[ num ].complete ) {
                stopAutoSelect();
            }

        }

        if ( sourcePhoto._bgIMG[ num ] !== undefined && sourcePhoto._bgIMG[ num ].complete ) {
            url = sourcePhoto._bgIMG[ num ].src;
            console.log('p: ' + num + ' ' + sourcePhoto._bgIMG[ num ].complete + '\n' + url );
        }
    }
    else if ( res === 2 ) {
        url = sourcePhoto._temp_bg[num].img;
    }
    if ( res === 1 || res === 2 ) {
        containerMainPhoto.append('<div class="_opacity" id="_opacity' + num + '"><div    data-mainBgPhoto=' + num + ' style="background-image: url(' + url + ' )"></div></div>');
    }
    else if ( res === 3 ) {
        containerMainPhoto.append('<div class="_opacity" id="_opacity' + num + '"><canvas data-mainBgPhoto=' + num + ' id="' + numId + '"></canvas></div>');
        draw(sourcePhoto._tag_img[num], numId );
             sourcePhoto._tag_img[num].addEventListener('load', function () { draw( this, numId ) } );
    }

    if (autoCheck) { inAnimate = animationPhoto } else { inAnimate = pausedPhoto }
    var _opacity = containerMainPhoto.find( '#_opacity'           + num        );
    mainBgPhoto  = containerMainPhoto.find( '[data-mainBgPhoto="' + num + '"]' ).css( inPhoto ).css( inAnimate );
    setTimeout(function () { _opacity.css( inOpacity ); }, 100);
    progressTimeIndicator(1e2);
    addRemoveName(num);
    index = num;
}

/*Todo: Функция генерирует canvas тэги*/
function draw( el,  id, sizeContainer ) {
    var W, H, Wel, Hel, WPercent, HPercent, ifW, ifH, verTr, horTr;

    var canvas =  document.getElementById(id);
    var ctx    =  canvas.getContext('2d');

    function sizerCanvas() {
        if (sizeContainer) {
            W  =  sizeContainer.offsetWidth;
            H  =  sizeContainer.offsetHeight;
        } else {
            W  =  window.innerWidth;
            H  =  window.innerHeight;
        }

        Wel               = el.width;
        Hel               = el.height;
        WPercent          = Math.floor(Wel / Hel * H);
        HPercent          = Math.floor(Hel / Wel * W);
        ctx.canvas.width  = W;
        ctx.canvas.height = H;
        ifW               = (H < WPercent || H > HPercent) && W < WPercent;
        ifH               = (W < HPercent || W > WPercent) && H < HPercent;

        (function () {
            verTr = 0;
            horTr = 0;
            if ( ifW ) { verTr = 0 } else { verTr = -( (HPercent - H) / 2) }
            if ( ifH ) { horTr = 0 } else { horTr = -( (WPercent - W) / 2) }
            ctx.transform( 1, 0, 0, 1, horTr, verTr );
        }());

        if ( ifW ) { ctx.drawImage( el, 0, 0, WPercent, H ) } else { ctx.drawImage( el, 0, 0, W, HPercent ) }
        if ( ifH ) { ctx.drawImage( el, 0, 0, W, HPercent ) } else { ctx.drawImage( el, 0, 0, WPercent, H ) }
    }

    function reSizer() { setTimeout( function () { sizerCanvas() }, 30 ) }
    window.addEventListener( 'resize', reSizer, false );
    reSizer();
}

$('.div-power').on( 'click', 'div[data-power="video-bg"]', function () {
    stopAutoSelect();
});

