// Created by CunjunWang on 2018/6/15

require('./index.css');
let _nim = require('util/nim.js');
require('page/common/nav-simple/index.js');

$(function () {
    let type = _nim.getUrlParam('type') || 'default';
    let $element = $(`.${type}-success`);
    $element.show();
});
