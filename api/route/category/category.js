const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const auth = require('../../middleware/token.middle');
const categoryHandler = require('../../core/category/category.handler');

/**
 * get all qa history
 */
router.route('/').get(auth.noCheckToken, async (req, res) => {
    try {
        let response = await categoryHandler.getList(res.locals,req.query);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

// add qa
router.route('/').post(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await categoryHandler.create(res.locals, req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// get qa
router.route('/:id').get(auth.noCheckToken, async (req, res) => {
    try {
        const response = await categoryHandler.getById(res.locals, req.params.id);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})


// update qa
router.route('/:id').put(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await categoryHandler.updateById(res.locals, req.params.id, req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// delete qa
router.route('/:id').delete(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await categoryHandler.removeById(res.locals, req.params.id);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

module.exports = router