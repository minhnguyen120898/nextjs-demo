const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const auth = require('../../middleware/token.middle');
const notificationHandler = require('../../core/notification/notification.handler');

// add notification
router.route('/').post(auth.verifiedToken, async (req, res) => {
    try {
        const response = await notificationHandler.create(res.locals, req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})


module.exports = router