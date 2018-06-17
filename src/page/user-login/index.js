require('./index.css');
require('page/common/nav-simple/index.js');
let _mm = require('util/mm.js');
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
        };
        let validateResult = this.formValidate(formData);

        if (validateResult.status) {
            _user.login(formData, function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function (err) {
                formError.show(err);
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

        if (!_mm.validate(formData.username, 'require')) {
            result.msg = "Username can not be empty!";
            return result;
        } else if (!_mm.validate(formData.password, 'require')) {
            result.msg = "Password can not be empty!";
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