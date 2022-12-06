const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const userHandler = require('../../core/user/user.handler');
const tokenMiddle = require('../../middleware/token.middle')
const baseService=require("../../shared/helpers/baseService.helper")

/**
 * get profile
 */
router.route('/profile').get(tokenMiddle.verifiedToken,async (req, res) => {
    try {
        let response = await userHandler.profile(res.locals);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * update profile
 */
router.route('/profile').put(tokenMiddle.verifiedToken,async (req, res) => {
    try {
        let response = await userHandler.updateProfile(res.locals, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})




/**
 * get user detail
 */
router.route('/users/:user_id').get(tokenMiddle.verifiedToken,async (req, res) => {
    try {
        let response = await userHandler.getUserById(res.locals, req.params.user_id);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})


/**
 * get user detail
 */
router.route('/conversations').get(tokenMiddle.verifiedToken,async (req, res) => {
    try {
        let response = await userHandler.getConversations(res.locals, req.query);
        resHelper.sendResponse(res,response)
    } catch (error) {
        console.log(error)
        resHelper.sendError(res,error);
    }
})

/**
 * delete
 */
router.route('/conversations/delete/:conversation_id').delete(tokenMiddle.verifiedToken,async (req, res) => {
    try {
        let response = await userHandler.deleteConversationsById(res.locals, req.params.conversation_id);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * get user detail
 */
router.route('/conversations/:conversation_id').get(tokenMiddle.verifiedToken,async (req, res) => {
    try {
        let response = await userHandler.getConversationById(res.locals, req.params.conversation_id, req.query);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

/**
 * get user detail
 */
router.route('/conversation/create').post(tokenMiddle.verifiedToken,async (req, res) => {
    try {
        let response = await userHandler.createConversation(res.locals, req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

// admin

/**
 * get user detail
 */
router.route('/admin/list').get(tokenMiddle.verifiedTokenAdmin,async (req, res) => {
    try {
        let response = await userHandler.getListUser(req.query);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})


/**
 * get user detail
 */
router.route('/admin/conversations').get(tokenMiddle.verifiedTokenAdmin,async (req, res) => {
    try {
        let response = await userHandler.adminGetConversations(res.locals, req.query);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})



/**
 * get user detail
 */
router.route('/admin/:userId').get(tokenMiddle.verifiedTokenAdmin,async (req, res) => {
    try {
        let response = await userHandler.adminGetUserById(res.locals,req.params.userId);
        resHelper.sendResponse(res,response)
    } catch (error) {
        resHelper.sendError(res,error);
    }
})

router.route('/admin/:userId').put(tokenMiddle.verifiedTokenAdmin,async (req, res) => {
    try {
        let response = await userHandler.adminUpdateUser(res.locals,req.params.userId,req.body);
        resHelper.sendResponse(res,response)
    } catch (error) {
        console.log(error)
        resHelper.sendError(res,error);
    }
})



module.exports = router