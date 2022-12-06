const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const auth = require('../../middleware/token.middle');
const qaHandler = require('../../core/qa/qa.handler');

/**
 * get all qa history
 */
router.route('/').get(auth.verifiedToken, async (req, res) => {
    try {
        let response = await qaHandler.getList(res.locals,req.query);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

// add qa
router.route('/').post(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await qaHandler.create(res.locals, req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// get qa
router.route('/:id').get(auth.verifiedToken, async (req, res) => {
    try {
        const response = await qaHandler.getById(res.locals, req.params.id);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})


// update qa
router.route('/:id').put(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await qaHandler.updateById(res.locals, req.params.id, req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// delete qa
router.route('/:id').delete(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await qaHandler.removeById(res.locals, req.params.id);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

module.exports = router