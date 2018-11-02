// Created by CunjunWang on 2018/6/18

let _nim = require('util/nim.js');

let _product = {
    getProductList: function (listParam, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    getProductDetail: function (productId, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;