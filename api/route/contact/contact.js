const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const auth = require('../../middleware/token.middle');
const contactHandler = require('../../core/contact/contact.handler');

// admin contact
router.route('/admin').get(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await contactHandler.getListcontactAdmin(res.locals, req.query);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

/**
 * get all contact history
 */
router.route('/').get(auth.verifiedToken, async (req, res) => {
    try {
        let response = await contactHandler.getList(res.locals,req.query);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

// add contact
router.route('/').post(auth.verifiedToken, async (req, res) => {
    try {
        const response = await contactHandler.create(res.locals, req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})


// block user contact
router.route('/block').post(auth.verifiedToken, async (req, res) => {
    try {
        const response = await contactHandler.removeUser(res.locals, req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// get contact
router.route('/:id').get(auth.verifiedToken, async (req, res) => {
    try {
        const response = await contactHandler.getById(res.locals, req.params.id);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// get contact
router.route('/admin/reply/:id').put(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await contactHandler.replyContact(res.locals, req.params.id,req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// get contact
router.route('/admin/update/:id').put(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await contactHandler.updateById(res.locals, req.params.id,req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

module.exports = router