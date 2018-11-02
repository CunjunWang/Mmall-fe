// Created by CunjunWang on 2018/6/14

let _nim = require('util/nim.js');

let _cart = {
    getCartCount: function (resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },
    addToCart: function (productInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    getCartList: function (resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    selectProduct: function(productId, resolve, reject){
        _nim.request({
            url: _nim.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    unSelectProduct: function(productId, resolve, reject){
        _nim.request({
            url: _nim.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    selectAllProduct: function(resolve, reject){
        _nim.request({
            url: _nim.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    unSelectAllProduct: function(resolve, reject){
        _nim.request({
            url: _nim.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    updateProduct: function(productInfo, resolve, reject){
        _nim.request({
            url: _nim.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    deleteProduct: function(productIds, resolve, reject){
        _nim.request({
            url: _nim.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _cart;