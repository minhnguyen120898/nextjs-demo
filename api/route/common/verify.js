const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const verifyHandler = require('../../core/common/verify.handler');
const appConstant = require('../../shared/helpers/constant.helper')

/**
 * Verify account
 */
router.route('/active/:code').post(async(req, res) => {
    try {
        let lang = req.header(appConstant.HEADER.LOCALE_HEADER);
        let response = await verifyHandler.activeUser(res.locals, lang, req.params.code);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

module.exports = router