const express = require('express')
const router = express.Router()
const _ = require('lodash');

const resHelper = require('../../shared/helpers/resHandle.helper');
const loginHandler = require('../../core/common/login.handler');
/**
 * Login by user
 */
router.route('/').post(async (req, res) => {
    try {
        let response = await loginHandler.login(res.locals);
        resHelper.sendResponse(res, response);
    } catch (error) {
        console.log(error)
        resHelper.sendError(res, error);
    }
})

module.exports = router