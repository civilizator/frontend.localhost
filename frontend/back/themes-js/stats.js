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

function watchStats_0() {
   counterStats(0, 3624, times, dataViews.find(strong), dataViews.find(fully), maximumCount)
}

function watchStats_1() {
   counterStats(0, 2234, times, dataComments.find(strong), dataComments.find(fully), maximumCount)
}

function watchStats_2() {
   counterStats(0, 835, times, dataLike.find(strong), dataLike.find(fully), maximumCount)
}

function watchStats_3() {
   counterStats(0, 1434, times, dataFollowers.find(strong), dataFollowers.find(fully), maximumCount)
}

function watchStats_4() {
   counterStats(0, 2255, times, dataWatch.find(strong), dataWatch.find(fully), maximumCount)
}
function watchRelSt() {
   counterStats(0, 3624, times, dataViews.find(strong), dataViews.find(fully), maximumCount);
   counterStats(0, 2234, times, dataComments.find(strong), dataComments.find(fully), maximumCount);
   counterStats(0, 835, times, dataLike.find(strong), dataLike.find(fully), maximumCount);
   counterStats(0, 1434, times, dataFollowers.find(strong), dataFollowers.find(fully), maximumCount);
   counterStats(0, 2255, times, dataWatch.find(strong), dataWatch.find(fully), maximumCount);
}

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
    userDate = new Date( 2017, 1 - 1, 1 ),
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

function statsReload() {
    if ( getDate < userDate ) {
        setInterval( function () {
            timeToEvent( userDate, whatDays, displayDays, displayHours, displayMinutes, displaySeconds );
        }, 1000 );
    }


    dataViews     = $( '[data-stats-views]' );
    dataComments  = $( '[data-stats-comments]' );
    dataLike      = $( '[data-stats-like]' );
    dataFollowers = $( '[data-stats-followers]' );
    dataWatch     = $( '[data-stats-watch]' );
    strong        = (' strong');
    fully         = (' .fully');

    watchPosition($('body'), $('body'), watchRelSt);

    watchPosition($('body'), dataViews, watchStats_0);
    watchPosition($('body'), dataComments, watchStats_1);
    watchPosition($('body'), dataLike, watchStats_2);
    watchPosition($('body'), dataFollowers, watchStats_3);
    watchPosition($('body'), dataWatch, watchStats_4);

    displayDays    = $( '[data-stats-days] .center > span' );
    displayHours   = $( '[data-stats-hours] .center > span' );
    displayMinutes = $( '[data-stats-minutes] .center > span' );
    displaySeconds = $( '[data-stats-seconds] .center > span' );
    leftScDay      = $( '[data-stats-days] .left-container-scala .scala' );
    rightScDay     = $( '[data-stats-days] .right-container-scala .scala' );
    leftScHr       = $( '[data-stats-hours] .left-container-scala .scala' );
    rightScHr      = $( '[data-stats-hours] .right-container-scala .scala' );
    leftScMin      = $( '[data-stats-minutes] .left-container-scala .scala' );
    rightScMin     = $( '[data-stats-minutes] .right-container-scala .scala' );
    leftScSec      = $( '[data-stats-seconds] .left-container-scala .scala' );
    rightScSec     = $( '[data-stats-seconds] .right-container-scala .scala' );
}

// statsReload();
