// Created by CunjunWang on 2018/6/20

let _nim = require('util/nim.js');

let _address = {
    getAddressList: function (resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    save: function (addressInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    update: function (addressInfo, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    deleteAddress: function(shippingId, resolve, reject){
        _nim.request({
            url: _nim.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    getAddress: function (shippingId, resolve, reject) {
        _nim.request({
            url: _nim.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _address;