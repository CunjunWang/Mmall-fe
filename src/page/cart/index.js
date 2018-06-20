// Created by CunjunWang on 2018/6/19

// Created by CunjunWang on 2018/6/19

require('./index.css');
require('page/common/header/index.js');

let nav = require('page/common/nav/index.js');
let _nim = require('util/nim.js');
let _cart = require('service/cart-service.js');
let templateIndex = require('./index.string');

let page = {
    data: {},
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadCart();
    },
    bindEvent: function () {
        let _this = this;

        $(document).on('click', '.cart-select', function () {
            let $this = $(this);
            let productId = $this.parents('.cart-table').data('product-id');

            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                        _this.renderCart(res);
                    },
                    function (errMsg) {
                        _this.showCartError();
                    });
            } else {
                _cart.unSelectProduct(productId, function (res) {
                        _this.renderCart(res);
                    },
                    function (errMsg) {
                        _this.showCartError();
                    });
            }
        });

        $(document).on('click', '.cart-select-all', function () {
            let $this = $(this);

            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                        _this.renderCart(res);
                    },
                    function (errMsg) {
                        _this.showCartError();
                    });
            } else {
                _cart.unSelectAllProduct(function (res) {
                        _this.renderCart(res);
                    },
                    function (errMsg) {
                        _this.showCartError();
                    });
            }
        });

        $(document).on('click', '.count-btn', function () {
            let $this = $(this);
            let $pCount = $this.siblings('.count-input');
            let type = $this.hasClass('plus') ? 'plus' : 'minus';
            let productId = $this.parents('.cart-table').data('product-id');
            let currentCount = parseInt($pCount.val());
            let minCount = 1;
            let maxCount = parseInt($pCount.data('max'));
            let newCount = 0;

            if (type === 'plus') {
                if (currentCount >= maxCount) {
                    _nim.errorTips('Not enough stock');
                    return;
                }
                newCount = currentCount + 1;
            } else if (type === 'minus') {
                if (currentCount <= minCount) {
                    return;
                }
                newCount = currentCount - 1;
            }

            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderCart(res);
            }, function (errMsg) {
                _this.showCartError();
            });
        });

        $(document).on('click', '.cart-delete', function () {
            if (window.confirm("Are you sure to delete the selected item?")) {
                let productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });

        $(document).on('click', '.delete-selected', function () {
            if (window.confirm("Are you sure to delete all selected items?")) {
                let arrProductIds = [];
                let $selectedItem = $('.cart-select:checked');

                for (let i = 0, iLength = $selectedItem.length; i < iLength; i++) {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }

                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                } else {
                    _nim.errorTips("Select the items you want to delete.");
                }
            }
        });

        $(document).on('click', '.btn-submit', function () {
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0 ) {
                window.location.href = './order-confirm.html';
            } else {
                _nim.errorTips("Please select items before checkout.")
            }
        });
    },
    loadCart: function () {
        let _this = this;

        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        })
    },
    renderCart: function (data) {
        this.filter(data);
        this.data.cartInfo = data;

        let cartHtml = _nim.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);

        nav.loadCartCount();
    },
    deleteCartProduct: function (productIds) {
        let _this = this;
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError: function () {
        $('.page-wrap').html('<p class="err-tip">Something goes wrong.</p>>')
    }
};

$(function () {
    page.init();
});