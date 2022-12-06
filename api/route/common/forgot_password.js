const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const forgotPasswordHandler = require('../../core/common/forgot_password.handler');

/**
 * get code to reset password
 */
router.route('/code').post(async (req, res) => {
    try {
        let lang = req.header('locale');
        let email = req.body.email
        let response = await forgotPasswordHandler.getCode(email, lang);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * reset password
 */
router.route('/reset').post(async (req, res) => {
    try {
        let lang = req.header('locale');
        let body = req.body
        let response = await forgotPasswordHandler.reset(lang, body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router