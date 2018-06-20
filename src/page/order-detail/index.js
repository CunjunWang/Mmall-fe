// Created by CunjunWang on 2018/6/20

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let navSide = require('page/common/nav-side/index.js');
let _nim = require('util/nim.js');
let _order = require('service/order-service.js');
let templateIndex = require('./index.string');

let page = {
    data: {
        orderNumber: _nim.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        let _this = this;

        $(document).on('click', '.order-cancel', function () {
            if (window.confirm("Are you sure to cancel this order?")) {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _nim.successTips("Order Cancelled!");
                    _this.loadDetail();
                }, function (errMsg) {
                    _nim.errorTips(errMsg);
                });
            }
        });
    },
    onLoad: function () {
        navSide.init({
            name: 'order-list'
        });
        this.loadDetail();
    },
    loadDetail: function () {
        let orderDetailHtml = '';
        let _this = this;

        let $content = $('.content');

        $content.html('<div class="loading"></div>');

        _order.getOrderDetail(this.data.orderNumber, function (res) {

            _this.dataFilter(res);

            orderDetailHtml = _nim.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);

        }, function (errMsg) {
            $content.html(`<p class="err-tip">${errMsg}</p>`)
        });
    },
    dataFilter: function (data) {
        data.needPay = data.status === 10;
        data.isCancelable = data.status === 10;
    }
};

$(function () {
    page.init();
});