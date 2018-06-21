// Created by CunjunWang on 2018/6/21

let _nim = require('util/nim.js');

let _payment = {
    getPaymentInfo: function (orderNumber, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    getPaymentStatus: function (orderNumber, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _payment;