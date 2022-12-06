const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const logoutHandler = require('../../core/logout/logout.handler');

/**
 * get qa
 */
router.route('/').post(async (req, res) => {
    try {
        let token = req.header('token')
        let lang = req.header('locale')
        let response = await logoutHandler.logout(token, req.body, lang);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

module.exports = router