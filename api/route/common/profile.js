const express = require('express')
const router = express.Router()
const _ = require('lodash');

const resHelper = require('../../shared/helpers/resHandle.helper');
const profileHandler = require('../../core/common/profile.handler');

/**
 * get profile
 */
router.route('/info').get(async(req, res) => {
    try {
        let response = await profileHandler.getInfo(res.locals);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});
/**
 * update kyc
 */
router.route('/info').put(async(req, res) => {
    try {
        let response = await profileHandler.updateInfo(res.locals, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
});

/**
 * confirm password
 */
router.route('/password/confirm').post(async (req, res) => {
    try {
        let response = await profileHandler.confirmPassword(res.locals, req.body.password);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * reset password
 */
router.route('/password/reset').post(async (req, res) => {
    try {
        let response = await profileHandler.resetPassword(res.locals, req.body.password);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * upload photo
 */
router.route('/photo/upload').post(async (req, res) => {
    try {
        let response = await profileHandler.uploadPhoto(res.locals, req.body.photo);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

module.exports = router