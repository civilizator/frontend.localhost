/**
 * Created by civilizator (Stanislav Kovrigin) on 15.06.2015.
 * argaatas@argaatas.com
 * civilizator@inbox.ru
 */
"use strict";
var bodyAudio = document.getElementsByTagName('body')[0];
var containerSound = document.createElement('div');
containerSound.style.display = 'none';
bodyAudio.appendChild(containerSound);
containerSound.setAttribute('id', 'containerSound');

function SounderHover(srcSound, hoverElementPlaySound, idNameForTags) {
    for (var i = 0; i < hoverElementPlaySound.length; i++) {
        var sound = document.createElement('audio');
        sound.src = srcSound;
        containerSound.appendChild(sound);
        sound.setAttribute("id", idNameForTags + i);
    }

    hoverElementPlaySound.mouseenter(function () {
        var index = hoverElementPlaySound.index(this);
        document.getElementById(idNameForTags + index).play();
    });
}

function SounderClick(srcSound, clickElementPlaySound, idNameForTags) {
    for (var i = 0; i < clickElementPlaySound.length; i++) {
        var sound = document.createElement("audio");
        sound.src = srcSound;
        containerSound.appendChild(sound);
        sound.setAttribute("id", idNameForTags + i);
    }

    clickElementPlaySound.click(function () {
        var index = clickElementPlaySound.index(this);
        document.getElementById(idNameForTags + index).play();
    });
}

function sounderHoverOne() {
    SounderHover.apply(this, arguments);
}

function sounderClickOne() {
    SounderClick.apply(this, arguments);
}

var switchVideoBg_li = $('ul.switchVideoBg li'),
    playStopVideoBg_li = $('ul#playStopVideoBg li'),
    menu_li = $('ul.menu li'),
    openControlSetup = $('.openControl'),
    closedSetup = $('.closed'),
    controlPanelLeftBottomRightLi = $('.controlPanelLeftBottomRight li'),
    openBack = $('.openBack'),
    swVideoLi = $('.swVideo li'),
    social_webLi = $('.social_web li');

function createAudio() {
    sounderHoverOne("audio/hoverSound/switchVideoBg_li_hover.mp3", switchVideoBg_li, "switcherBg_hover_");
    sounderHoverOne("audio/hoverSound/one1.mp3", playStopVideoBg_li, "switcherBgPl_hover_");
    sounderHoverOne("audio/hoverSound/oneLiIn.mp3", menu_li, "menu_li_hover_");
    sounderHoverOne("audio/hoverSound/click_one.mp3", openControlSetup, "openControlSetup_hover_");
    sounderHoverOne("audio/hoverSound/click_one.mp3", closedSetup, "closedSetup_hover_");
    sounderHoverOne("audio/hoverSound/one1.mp3", controlPanelLeftBottomRightLi, "ctrlPanelLeftBottomRightLi_hover_");
    sounderHoverOne("audio/hoverSound/opVid.mp3", openBack, "openBack_hover_");
    sounderHoverOne("audio/hoverSound/click_one.mp3", swVideoLi, "contentWatchPreviewVideoLi_hover_");
    sounderHoverOne("audio/hoverSound/socialLi.mp3", social_webLi, "social_webLi_hover_");

    sounderClickOne("audio/hoverSound/switchVideoBg_li_click.mp3", switchVideoBg_li, "switchVideoBg_li_click_");
    sounderClickOne("audio/hoverSound/oneLiInMenu.mp3", menu_li, "menu_li_click_");
    sounderClickOne("audio/hoverSound/oneLiInMenu.mp3", openControlSetup, "openControlSetup_click_");
    sounderClickOne("audio/hoverSound/oneLiInMenu.mp3", closedSetup, "closedSetup_click_");
    sounderClickOne("audio/hoverSound/transformator.mp3", controlPanelLeftBottomRightLi, "controlPanelLeftBottomRightLi_click_");
    sounderClickOne("audio/hoverSound/oneLiInMenu.mp3", openBack, "openBack_click_");
    sounderClickOne("audio/hoverSound/one1.mp3", social_webLi, "social_webLi_click_");
    sounderClickOne("audio/hoverSound/switchVideoBg_li_click.mp3", swVideoLi, "sw_VideoLi");
}

function activeMute() {
    $('#containerSound').find('audio').prop('muted', 'muted');
}

function removeMute() {
    $('#containerSound').find('audio').removeProp('muted', 'muted');
}

var mca = $('.main-control-audio'),
    oob = mca.find('.on-off-beeper').text('off');
mca.on('click', 'div.on-off-beeper', function () {
    _onOffBeeper();
});

function _onOffBeeper() {
    oob.toggleClass("on");
    if (oob.hasClass('on')) {
        removeMute();
        oob.text('on');
    } else {
        activeMute();
        oob.text('off');
    }
}

$(window).load(function () {
    setTimeout(function() {
        createAudio();
        activeMute();
    }, 2000);
});