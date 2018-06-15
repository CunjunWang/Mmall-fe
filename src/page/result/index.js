// Created by CunjunWang on 2018/6/15

require('./index.css');
let _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function () {
    let type = _mm.getUrlParam('type') || 'default';
    let $element = $(`.${type}-success`);
    $element.show();
});
