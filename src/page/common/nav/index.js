require('./index.css');
let _nim = require('util/nim.js');
let _user = require('service/user-service.js');
let _cart = require('service/cart-service.js');

let nav = {
    init: function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function () {
        $('.js-login').click(function () {
            _nim.doLogin();
        });
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        });
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            }, function (errMsg) {
                _nim.errorTips(errMsg);
            });
        });
    },
    loadUserInfo: function () {
        _user.checkLogin(function (res) {
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function (errMsg) {
            // do nothing
        });
    },
    loadCartCount: function () {
        _cart.getCartCount(function (res) {
            $('.nav .cart-count').text(res || 0);
        }, function (errMsg) {
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();