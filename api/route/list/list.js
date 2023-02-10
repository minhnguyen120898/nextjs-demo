const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const listHandler = require('../../core/list/list.handler');
/**
 * get jp prefectures
 */
router.route('/prefectures/jp').get(async (req, res) => {
    try {
        let response = await listHandler.getJapanPrefectures();
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})
/**
 * get experience settings
 */
router.route('/settings').get(async (req, res) => {
    try {
        let response = await listHandler.getSettings();
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * get bank name
 */
router.route('/bank/jp/name').get(async (req, res) => {
    try {
        let response = await listHandler.getJPBankName();
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

/**
 * get bank branch
 */
router.route('/bank/jp/branch/:bank_code').get(async (req, res) => {
    try {
        let response = await listHandler.getJPBankBranch(req.params.bank_code);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

/**
 * get jp prefectures
 */
router.route('/location/:zip_code').get(async (req, res) => {
    try {
        let response = await listHandler.getJPLocationByPostalCode(req.params.zip_code);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router