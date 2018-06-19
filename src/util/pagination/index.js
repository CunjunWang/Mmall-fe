// Created by CunjunWang on 2018/6/18

require('./index.css');
let templatePagination = require('./index.string');
let _mm = require('util/mm.js');

let Pagination = function () {
    let _this = this;

    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };

    $(document).on('click', '.pg-item', function () {
        let $this = $(this);
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ?
            typeof _this.option.onSelectPage($this.data('value')) : null
    });
};

Pagination.prototype.render = function (userOption) {
    this.option = $.extend({}, this.defaultOption, userOption);

    if (!(this.option.container instanceof jQuery)) {
        return;
    }

    if (this.option.pages <= 1) {
        return;
    }

    this.option.container.html(this.getPaginationHtml());
};

Pagination.prototype.getPaginationHtml = function () {
    let option = this.option;
    let html = '';
    let pageArray = [];
    let start = (option.pageNum - option.pageRange > 0) ? (option.pageNum - option.pageRange) : 1;
    let end = (option.pageNum + option.pageRange < option.pages) ? (option.pageNum + option.pageRange) : option.pages;

    pageArray.push({
        name: 'Prev',
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });

    for (let i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum)
        });
    }

    pageArray.push({
        name: 'Next',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });

    html = _mm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });

    return html;
};

module.exports = Pagination;