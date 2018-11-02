// Created by CunjunWang on 2018/6/20


let _nim = require('util/nim.js');

let _order = {
    getProductList: function (resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    createOrder: function (orderInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    getOrderList: function (listParam, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/order/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    getOrderDetail: function (orderNumber, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    cancelOrder: function (orderNumber, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _order;