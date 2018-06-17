// Created by CunjunWang on 2018/6/17
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let navSide = require('page/common/nav-side/index.js');
let _mm = require('util/mm.js');
let _user = require('service/user-service.js');

let templateIndex = require('./index.string');

let page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent: function () {
        let _this = this;

        $(document).on("click", '.btn-submit', function () {
            let userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val()),
            };

            let validateResult = _this.validateForm(userInfo);

            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function (res, msg) {
                    _mm.successTips(msg);
                    window.location.href = './user-center.html'
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    loadUserInfo: function () {
        let userHtml = '';

        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    },
    validateForm: function (formData) {
        let result = {
            status: false,
            msg: ''
        };

        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = "Invalid phone format!";
            return result;
        }
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = "Invalid email format";
            return result;
        }
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = "Security question cannot be empty!";
            return result;
        }
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = "Security answer cannot be empty!";
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