// Created by CunjunWang on 2018/6/20

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let navSide = require('page/common/nav-side/index.js');
let _nim = require('util/nim.js');
let _order = require('service/order-service.js');
let templateIndex = require('./index.string');
let Pagination = require('util/pagination/index.js');

let page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        this.loadOrderList();
        navSide.init({
            name: 'order-list'
        });
    },
    loadOrderList: function () {
        let orderListHtml = '';
        let _this = this;
        let $listCon = $('.order-list-con');

        $listCon.html('<div class="loading"></div>');

        _order.getOrderList(this.data.listParam, function (res) {
            orderListHtml = _nim.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);

            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (errMsg) {
            $listCon.html('<p class="err-tip">Fail to load orders</p>')
        });
    },
    loadPagination: function (pageInfo) {
        let _this = this;

        if (!this.pagination) {
            this.pagination = new Pagination();
        }

        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }))
    }
};

$(function () {
    page.init();
});