// Created by CunjunWang on 2018/6/18

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let _nim = require('util/nim.js');
let _product = require('service/product-service.js');
let templateIndex = require('./index.string');
let Pagination = require('util/pagination/index.js');

let page = {
    data: {
        listParam: {
            keyword: _nim.getUrlParam("keyword") || '',
            categoryId: _nim.getUrlParam("categoryId") || '',
            orderBy: _nim.getUrlParam("orderBy") || 'default',
            pageNum: _nim.getUrlParam("pageNum") || 1,
            pageSize: _nim.getUrlParam("pageSize") || 20
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadList();
    },
    bindEvent: function () {
        let _this = this;

        $('.sort-item').click(function () {
            let $this = $(this);
            _this.data.listParam.pageNum = 1;

            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            } else if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }

            _this.loadList();
        });
    },
    loadList: function () {
        let _this = this;
        let listParam = this.data.listParam;
        let listHtml = '';
        let $pListCon = $('.p-list-con');

        $pListCon.html('<div class="loading"></div>>');

        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);

        _product.getProductList(listParam, function (res) {
                listHtml = _nim.renderHtml(templateIndex, {
                    list: res.list
                });
                $pListCon.html(listHtml);
                _this.loadPagination({
                    hasPreviousPage: res.hasPreviousPage,
                    prePage: res.prePage,
                    hasNextPage: res.hasNextPage,
                    nextPage: res.nextPage,
                    pageNum: res.pageNum,
                    pages: res.pages
                });
            },
            function (errMsg) {
                _nim.errorTips(errMsg);
            }
        )
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
                _this.loadList();
            }
        }))
    }
};

$(function () {
    page.init();
});