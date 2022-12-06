const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const resendHandler = require('../../core/common/resend.handler');

/**
 * resend
 */
router.route('/active').post(async (req, res) => {
    try {
        let auth = req.header('auth')
        let lang = req.header('locale');
        let response = await resendHandler.resendActive(auth, lang);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router