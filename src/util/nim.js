// Created by CunjunWang on 2018/6/14

let Hogan = require('hogan.js');
let conf = {
    serverHost: ''
};
let _nim = {
    request: function (param) {
        let _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                else if (res.status === 10) {
                    _this.doLogin();
                }
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    getUrlParam: function (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    renderHtml: function (htmlTemplate, data) {
        let template = Hogan.compile(htmlTemplate);
        return template.render(data);
    },
    successTips: function (msg) {
        alert(msg || 'Success！');
    },
    errorTips: function (msg) {
        alert(msg || 'Error!');
    },
    validate: function (value, type) {
        value = $.trim(value);
        if ('require' === type) {
            return !!value;
        }
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    doLogin: function () {
        window.location.href = `./user-login.html?redirect=${encodeURIComponent(window.location.href)}`;
    },
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _nim;