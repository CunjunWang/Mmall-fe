// Created by CunjunWang on 2018/6/20

let _nim = require('util/nim.js');
let _address = require('service/address-service.js');
let _cities = require('util/cities/index.js');
let templateAddressModal = require('./address-modal.string');

let addressModal = {
    show: function (option) {
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');

        this.loadModal();
        this.bindEvent();
    },
    bindEvent: function () {
        let _this = this;

        this.$modalWrap.find('#receiver-province').change(
            function () {
                let selectedProvince = $(this).val();
                _this.loadCities(selectedProvince);
            }
        );

        this.$modalWrap.find('.address-btn').click(
            function () {
                let receiverInfo = _this.getReceiverInfo();
                let isUpdate = _this.option.isUpdate;

                if (!isUpdate && receiverInfo.status) {
                    _address.save(receiverInfo.data, function (res) {
                        _nim.successTips("Address added successfully!");
                        _this.hide();

                        typeof _this.option.onSuccess === "function"
                        && _this.option.onSuccess(res);
                    }, function (errMsg) {
                        _nim.errorTips(errMsg);
                    });
                } else if (isUpdate && receiverInfo.status) {
                    _address.update(receiverInfo.data, function (res) {
                        _nim.successTips("Address edit successfully!");
                        _this.hide();

                        typeof _this.option.onSuccess === "function"
                        && _this.option.onSuccess(res);
                    }, function (errMsg) {
                        _nim.errorTips(errMsg);
                    });
                } else {
                    _nim.errorTips(receiverInfo.errMsg || "Something wrong.");
                }
            }
        );

        // prevent event bubbling
        this.$modalWrap.find('.modal-container').click(
            function (e) {
                e.stopPropagation();
            }
        );
        // close popup
        this.$modalWrap.find('.close').click(
            function () {
                _this.hide();
            }
        );
    },
    loadModal: function () {
        let addressModalHtml = _nim.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addressModalHtml);

        this.loadProvince();
    },
    loadProvince: function () {
        let provinces = _cities.getProvinces() || [];
        let $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));

        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities: function (selectedProvince) {
        let cities = _cities.getCities(selectedProvince) || [];
        let $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));

        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    getReceiverInfo: function () {
        let receiverInfo = {};
        let result = {
            status: false
        };

        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

        if(this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }

        if (!receiverInfo.receiverName) {
            result.errMsg = 'Please input receiver name'
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = 'Please select receiver province'
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = 'Please select receiver city'
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = 'Please input receiver phone number'
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = 'Please select receiver address'
        } else {
            result.status = true;
            result.data = receiverInfo;
        }

        return result;
    },
    getSelectOption: function (optionArray) {
        let html = '<option value="">Select</option>';

        for (let i = 0, length = optionArray.length; i < length; i++) {
            html += `<option value="${optionArray[i]}">${optionArray[i]}</option>`;
        }
        return html;
    },
    hide: function () {
        this.$modalWrap.empty();
    }
};

module.exports = addressModal;