// Created by CunjunWang on 2018/6/14

require('./index.css');
let _nim = require('util/nim.js');

let header = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        let keyword = _nim.getUrlParam('keyword');
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function() {
        let _this = this;
        $('#search-btn').click(function() {
            _this.searchSubmit();
        });
        $('#search-input').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    searchSubmit: function() {
        let keyword = $.trim($('#search-input').val());
        if (keyword) {
            window.location.href = `./list.html?keyword=${keyword}`;
        } else {
            _nim.goHome();
        }
    }
};

header.init();