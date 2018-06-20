// Created by CunjunWang on 2018/6/14

let _nim = require('util/nim.js');

let _user = {
    login: function (userInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkLogin: function (resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkUsername: function (username, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    register: function (userInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    getQuestion: function (username, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/forget_get_question.do'),
            data: {
                username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkAnswer: function (userInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    resetPassword: function (userInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    getUserInfo: function (resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    updateUserInfo: function (userInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/update_information.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    updatePassword: function (userInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    logout: function (resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }

};

module.exports = _user;