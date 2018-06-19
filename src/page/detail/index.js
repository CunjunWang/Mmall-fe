// Created by CunjunWang on 2018/6/19

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

let _mm = require('util/mm.js');
let _product = require('service/product-service.js');
let _cart = require('service/cart-service.js');
let templateIndex = require('./index.string');

let page = {
    data: {
        productId: _mm.getUrlParam('productId') || ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function () {
        let _this = this;

        // no on hover in this version of jQuery
        $(document).on('mouseenter', '.p-img-item', function () {
            let imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imgUrl);
        });

        $(document).on('click', '.p-count-btn', function () {
            let type = $(this).hasClass('plus') ? 'plus' : 'minus';
            let $pCount = $('.p-count');
            let currentCount = parseInt($pCount.val());
            let minCount = 1;
            let maxCount = _this.data.detailInfo.stock || 1;

            if (type === 'plus') {
                $pCount.val(currentCount < maxCount ? currentCount + 1 : maxCount);
            } else if (type = 'minus') {
                $pCount.val(currentCount > minCount ? currentCount - 1 : minCount);
            }
        });

        $(document).on('click', '.cart-add', function () {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function (res) {
                window.location.href = './result.html?type=cart-add';
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            });
        });
    },
    loadDetail: function () {
        let _this = this;
        let html = '';
        let $pageWrap = $('.page-wrap');

        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function (res) {
            _this.filter(res);

            // cache detail data
            _this.data.detailInfo = res;

            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">Can not find this product.</p>');
        })
    },
    filter: function (data) {
        data.subImages = data.subImages.split(',');
    }
};

$(function () {
    page.init();
});