// Created by CunjunWang on 2018/6/21

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let _nim = require('util/nim.js');
let _payment = require('service/payment-service.js');
let templateIndex = require('./index.string');

let page = {
    data: {
        orderNumber: _nim.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        this.loadPaymentInfo();
    },
    loadPaymentInfo: function () {
        let paymentHtml = '';
        let _this = this;
        let $pageWrap = $('.page-wrap');

        $pageWrap.html('<div class="loading"></div>');

        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            paymentHtml = _nim.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);

            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html(`<p class="err-tip">${errMsg}</p>`)
        })
    },
    listenOrderStatus: function () {
        let _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber, function(res){
                if(res === true){
                    window.location.href
                        = `./result.html?type=payment&orderNumber=${this.data.orderNumber}`;
                }
            });
        }, 5e3);
    }
};

$(function () {
    page.init();
});