// Created by CunjunWang on 2018/6/17
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let navSide = require('page/common/nav-side/index.js');
let _nim = require('util/nim.js');
let _user = require('service/user-service.js');

let templateIndex = require('./index.string');

let page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo: function () {
        let userHtml = '';

        _user.getUserInfo(function(res){
            userHtml = _nim.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _nim.errorTips(errMsg);
        });
    }
};

$(function () {
    page.init();
});