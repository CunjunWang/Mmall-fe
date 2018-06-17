require('./index.css');
let _mm = require('util/mm.js');
let templateIndex = require('./index.string');

let navSide = {
    option: {
        name: '',
        navList: [
            {
                name: 'user-center',
                desc: 'user center',
                href: './user-center.html'
            },
            {
                name: 'order-list',
                desc: 'order list',
                href: './order-list.html'
            },
            {
                name: 'user-pass-update',
                desc: 'password update',
                href: './user-pass-update.html'
            },
            {
                name: 'about',
                desc: 'About MMall',
                href: './about.html'
            }
        ]
    },
    init: function (option) {
        $.extend(this.option, option);
        this.renderNav();
    },
    renderNav: function () {
        for (let i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        let navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;