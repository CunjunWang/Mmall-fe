// Created by CunjunWang on 2018/6/20

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

let _nim = require('util/nim.js');
let _order = require('service/order-service.js');
let _address = require('service/address-service.js');
let addressModal = require('./address-modal');
let templateAddress = require('./address-list.string');
let templateProduct = require('./product-list.string');

let page = {
    data: {
        selectedAddressId: null
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function () {
        let _this = this;

        // select address
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });

        // submit order
        $(document).on('click', '.order-submit', function () {
            let shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function (res) {
                    window.location.href = `./payment.html?orderNumber=${res.orderNo}`
                }, function (errMsg) {
                    _nim.errorTips(errMsg);
                })
            } else {
                _nim.errorTips('Please select an address first.')
            }
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });

        // add new address
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate: false,
                onSuccess: function () {
                    _this.loadAddressList();
                }
            });
        });

        // edit address
        $(document).on('click', '.address-update', function (e) {
            e.stopPropagation();
            let shippingId = $(this).parents('.address-item').data('id');

            _address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function () {
                        _this.loadAddressList();
                    }
                })
            }, function (errMsg) {
                _nim.errorTips(errMsg);
            });
        });

        // delete address
        $(document).on('click', '.address-delete', function (e) {
            e.stopPropagation();
            let shippingId = $(this).parents('.address-item').data('id');

            if (window.confirm('Are you sure to delete this address?')) {
                _address.deleteAddress(shippingId, function (res) {
                    _this.loadAddressList();
                }, function (errMsg) {
                    _nim.errorTips(errMsg);
                });
            }
        });

    },
    loadAddressList: function () {
        let _this = this;
        $('.address-con').html('<div class="loading"></div>');
        _address.getAddressList(function (res) {
            _this.addressFilter(res);
            let addressListHtml = _nim.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (errMsg) {
            $('.address-con').html('<p class="err-tip">Fail to load addresses.</p>');
        });
    },
    addressFilter: function (data) {
        if(this.data.selectedAddressId){
            let selectedAddressIdFlag = false;
            for(let i=0, length = data.list.length; i<length; i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            if(!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    loadProductList: function () {
        let _this = this;
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function (res) {
            let productListHtml = _nim.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function (errMsg) {
            $('.product-con').html('<p class="err-tip">Fail to load product list.</p>');
        });
    }
};

$(function () {
    page.init();
});