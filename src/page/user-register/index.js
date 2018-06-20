// Created by CunjunWang on 2018/6/17

require('./index.css');
require('page/common/nav-simple/index.js');
let _nim = require('util/nim.js');
let _user = require('service/user-service.js');

let formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

let page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        let _this = this;
        // check if the username is used
        $('#username').blur(function () {
            let username = $.trim($(this).val());

            if (!username) {
                return;
            }

            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg);
            });
        });

        $('#submit').click(function () {
            _this.submit();
        });
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function () {
        let formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        };

        // check form data
        let validateResult = this.formValidate(formData);

        if (validateResult.status) {
            _user.register(formData, function (res) {
                window.location.href = './result.html?type=register'
            }, function (errMsg) {
                formError.show(errMsg);
            });
        } else {
            formError.show(validateResult.msg);
        }
    },
    formValidate: function (formData) {
        let result = {
            status: false,
            msg: ''
        };

        if (!_nim.validate(formData.username, 'require')) {
            result.msg = "Username can not be empty!";
            return result;
        }
        if (!_nim.validate(formData.password, 'require')) {
            result.msg = "Password can not be empty!";
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = "Length of password cannot be less than 6 characters!"
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = "Password does not match!";
            return result;
        }
        if (!_nim.validate(formData.phone, 'phone')) {
            result.msg = "Invalid phone format!";
            return result;
        }
        if (!_nim.validate(formData.email, 'email')) {
            result.msg = "Invalid email format";
            return result;
        }
        if (!_nim.validate(formData.question, 'require')) {
            result.msg = "Security question cannot be empty!";
            return result;
        }
        if (!_nim.validate(formData.answer, 'require')) {
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