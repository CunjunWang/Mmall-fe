// Created by CunjunWang on 2018/6/18

let _mm = require('util/mm.js');

let _product = {
    getProductList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    getProductDetail: function (productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;