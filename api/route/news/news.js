const express = require('express')
const router = express.Router()

const resHelper = require('../../shared/helpers/resHandle.helper');
const auth = require('../../middleware/token.middle');
const newsHandler = require('../../core/news/news.handler');


/**
 * get all news
 */
router.route('/').get(auth.verifiedToken, async (req, res) => {
    try {
        let response = await newsHandler.getNews(res.locals, req.query);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

// read news
router.route('/read/:id').put(auth.verifiedToken, async (req, res) => {
    try {
        const response = await newsHandler.readNewById(res.locals, req.params.id);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// read news
router.route('/count').get(auth.verifiedToken, async (req, res) => {
    try {
        const response = await newsHandler.countNotification(res.locals);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// add news
router.route('/').post(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        console.log(req.header('locale'))
        const response = await newsHandler.addNews(req.header('locale'), req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        console.log(error)
        resHelper.sendError(res, error)
    }
})

// get news
router.route('/:id').get(async (req, res) => {
    try {
        const response = await newsHandler.getNewsById(req.header('locale'), req.params.id);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

// update news
router.route('/:id').put(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await newsHandler.updateNewsById(req.header('locale'), req.params.id, req.body);
        resHelper.sendResponse(res, response);
    } catch (error) {
        console.log(error)
        resHelper.sendError(res, error)
    }
})

// delete news
router.route('/:id').delete(auth.verifiedTokenAdmin, async (req, res) => {
    try {
        const response = await newsHandler.removeNewsById(req.header('locale'), req.params.id);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error)
    }
})

module.exports = router