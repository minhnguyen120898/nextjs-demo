'use strict';
const jpPrefecture = require("jp-prefecture");
const settingModel = require('../../shared/models/setting')
const baseService = require('../../shared/helpers/baseService.helper')
const _ = require('lodash')
const Oaza = require('jp-zipcode-lookup').Oaza

/**
 * @method GET
 * @path /prefectures/jp
 * @param locals
 * @return success message
 */
const getJapanPrefectures = async () => {
    return jpPrefecture.getAll("pref", "name");
}
/**
 * @method GET
 * @path /settings
 * @param locals
 * @return success message
 */
const getSettings = async () => {
    const settings = await settingModel.getAll()
    const config = {}
    for(let setting of settings){
        config[`${setting.name}`] = setting.config
    }
    return config
}

/**
 * @method GET
 * @path /user/bank/name
 * @param locals {uid, lang}
 * @return {}
 */
const getJPBankName = async () => {
    let bank_names = await baseService.request(
        'get',
        'https://raw.githubusercontent.com/zengin-code/zengin-js/master/lib/zengin-data.js',
        null,
        null
    )
    bank_names = bank_names.substring(17, bank_names.length-2);
    bank_names = JSON.parse(bank_names)
    return _.map(bank_names, bank => Object({name: bank.name, code: bank.code}))
}

/**
 * @method GET
 * @path /user/bank/branch/:bank_code
 * @param locals {uid, lang}
 * @return {}
 */
const getJPBankBranch = async (bank_code) => {
    let bank_names = await baseService.request(
        'get',
        'https://raw.githubusercontent.com/zengin-code/zengin-js/master/lib/zengin-data.js',
        null,
        null
    )
    bank_names = bank_names.substring(17, bank_names.length-2);
    bank_names = JSON.parse(bank_names)
    let bank = _.find(bank_names, bank => bank.code == bank_code)
    return bank ? _.map(bank.branches, branch => Object({name: branch.name, code: branch.code})) : []
}

/**
 * @method GET
 * @path /jp/address/:postal_code
 * @param locals {uid, lang}
 * @param postal_code
 * @return 
 */
const getJPLocationByPostalCode = async (postal_code) => {
    const oaza = Oaza.byZipcode(postal_code)[0];
    return {
        location: oaza ? `${oaza.name},${oaza.city.name},${oaza.pref.name}` : null
    }
}


module.exports = {
    getJapanPrefectures,
    getSettings,
    getJPBankName,
    getJPBankBranch,
    getJPLocationByPostalCode
}