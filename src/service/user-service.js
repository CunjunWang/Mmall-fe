// Created by CunjunWang on 2018/6/14

let _mm = require('util/mm.js');

let _user = {
    logout: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkLogin: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};

module.exports = _user;