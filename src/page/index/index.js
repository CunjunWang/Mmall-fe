require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
require('util/slider/index.js');

let navSide = require('page/common/nav-side/index.js');
let bannerTemplate = require('./banner.string');
let _nim = require('util/nim.js');

$(function () {

    // banner initialize
    let bannerHtml = _nim.renderHtml(bannerTemplate);
    $('.banner-con').html(bannerHtml);
    let $slider = $('.banner').unslider({
        dots: true
    });

    // banner arrow logic
    $(".banner-con .banner-arrow").click(function () {
        let dir = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[dir]();
    })
});