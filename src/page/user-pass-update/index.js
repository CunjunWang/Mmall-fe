// Created by CunjunWang on 2018/6/17
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let navSide = require('page/common/nav-side/index.js');
let _nim = require('util/nim.js');
let _user = require('service/user-service.js');


let page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent: function () {
        let _this = this;

        $(document).on("click", '.btn-submit', function () {
            let userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
            };

            let validateResult = _this.validateForm(userInfo);

            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (res, msg) {
                    _nim.successTips("Password Updated!");
                    _user.logout();
                    window.location.href = './user-login.html'
                }, function (errMsg) {
                    _nim.errorTips(errMsg);
                });
            } else {
                _nim.errorTips(validateResult.msg);
            }
        });
    },

    validateForm: function (formData) {
        let result = {
            status: false,
            msg: ''
        };

        if (!_nim.validate(formData.password, 'require')) {
            result.msg = "Invalid password!";
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = "Invalid new password, length must be at least 6 characters!";
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = "Password does not match!";
            return result;
        }

        result.status = true;
        result.msg = "Validated!";
        return result;
    }

};

$(function () {
    page.init();
});