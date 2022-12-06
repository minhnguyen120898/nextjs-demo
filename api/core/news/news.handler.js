const newsModel = require('../../shared/models/news')
const newHistoryModel = require('../../shared/models/new_history')
const userModel = require('../../shared/models/user')
const fileHandle = require('../../shared/helpers/fileHandle.helper')
const moment = require("moment")
const configCommon = require("../../shared/helpers/configCommon.helper")
const ObjectId = require('mongoose').Types.ObjectId

const _ = require('lodash');
const localeUtils = require('../../shared/helpers/localesUtils.helper')
const validUtils = require('../../shared/helpers/validUtils.helper')
const appConstant = require('../../shared/helpers/constant.helper')
const emailHelper = require('../../shared/helpers/email.helper')

/**
 * @method POST
 * @path /news/create
 * @param lang default is english
 * @param body
 * @return success message
 */

const addNews = async (lang, body) => {
    let content = body.content;
    if (content) {
        while (content.indexOf('data:image') >= 0) {
            let dataImage = content.substring(content.indexOf('data:image'), content.indexOf('\"', content.indexOf('data:image')));
            let base64 = dataImage.split(',')
            let extension = base64[0].split(';')[0].split('/')[1]
            let name = `${moment().valueOf()}.${extension}`;
            let url = await fileHandle.uploadToStorage( name, base64[1])
            content = _.replace(content, dataImage, `${url}`);
        }
        body.content = content;
    }

    if (body.image && validUtils.isBase64(body.image)) {
        let base64 = body.image.split(',')
        let extension = base64[0].split(';')[0].split('/')[1]
        let name = `news${moment().valueOf()}.${extension}`;
        body.image = await fileHandle.uploadToStorage( name, base64[1])
    }

    body.type=1;//new
    if (body.to_user_id && body.to_user_id.length == 0) {
        body.to_user_id = [appConstant.ID_NEW_DEFAULT]
    }

    await newsModel.create(body)
    return {
        message: localeUtils.newMessage(lang).CREATE_SUCCESS
    }
}

/**
 * @method GET
 * @path /news/:news_id
 * @param lang default is english
 * @param id new
 * @return data
 */
const getNewsById = async (lang, id) => {
    const news = await newsModel.getById(id)
    if (!news) {
        throw Error(localeUtils.newMessage(lang).NOT_FOUND)
    }
    return news
}

/**
 * @method Put
 * @path /news/:news_id
 * @param lang default is english
 * @param body
 * @return success message
 */
const updateNewsById = async (lang, id, body) => {
    const news = await newsModel.getById(id)
    if (!news) {
        throw Error(localeUtils.newMessage(lang).NOT_FOUND)
    }
    let content = body.content;
    if (content) {
        while (content.indexOf('data:image') >= 0) {
            let dataImage = content.substring(content.indexOf('data:image'), content.indexOf('\"', content.indexOf('data:image')));
            let base64 = dataImage.split(',')
            let extension = base64[0].split(';')[0].split('/')[1]
            let name = `${moment().valueOf()}.${extension}`;
            let url = await fileHandle.uploadToStorage( name, base64[1])
            content = _.replace(content, dataImage, `${url}`);
        }
        body.content = content;
    }


    if (body.to_user_id && body.to_user_id.length == 0) {
        body.to_user_id = [appConstant.ID_NEW_DEFAULT]
    }

    if (body.image && validUtils.isBase64(body.image)) {
        let base64 = body.image.split(',')
        let extension = base64[0].split(';')[0].split('/')[1]
        let name = `news${moment().valueOf()}.${extension}`;
        body.image = await fileHandle.uploadToStorage( name, base64[1])
    }

    await newsModel.update(id, body)

    return {
        message: localeUtils.newMessage(lang).UPDATE_SUCCESS
    }
}


/**
 * @method delete
 * @path /news/:news_id
 * @param lang default is english
 * @param id user
 * @return success message
 */
const removeNewsById = async (lang, id) => {
    const news = await newsModel.getById(id)
    if (!news) {
        throw Error(localeUtils.newMessage(lang).NOT_FOUND)
    }
    await newsModel.remove(id)
    return {
        message: localeUtils.newMessage(lang).REMOVE_SUCCESS
    }
}

/**
 * @method get
 * @path /news?title,role
 * @param query
 * @return data
 */
const getNews = async (locals, query) => {
    const pagination = validUtils.paginationValidator(query)
    let q = {}
    if (query.search) q.title = RegExp(query.search)

    if (query.status) {
        q.status = Number(query.status)
    }

    if (query.type) {
        q.type = Number(query.type)
    }

    if (query.category) {
        q.category = {$in:query.category.split(",")}
    }

    let user = await userModel.findById(locals.uid)
    if (user&&user.role != appConstant.USER.ROLE.ADMIN) {
        q.to_user_id = { $in: [locals.uid, appConstant.ID_NEW_DEFAULT] }
        // q.created_at = { $gte: user.created_at }
    }

    let news = await newsModel.getByPagination(q, pagination)
    let newsId = [];
    _.forEach(news.data, (o) => {
        newsId.push(o._id.toString())
    })
    let newHistory = await newHistoryModel.getAll({ user_id: locals.uid, new_id: { $in: newsId } })

    _.forEach(news.data, (o) => {
        o.read = !_.find(newHistory, (o1) => {
            return o._id.toString() === o1.new_id
        }) ? false : true
    })
    return news;
}

/**
 * @method put
 * @path /new/read/:id
 * @param lang default is english
 * @param id user
 * @return success message
 */
const readNewById = async (locals, id) => {
    const newHistoryData = await newHistoryModel.findOneByField({ new_id: id, user_id: locals.uid })
    if (!newHistoryData) {
        console.log({ new_id: id, user_id: locals.uid })
        await newHistoryModel.create({ new_id: id, user_id: locals.uid })
    }
    return {
        message: ""
    }
}

/**
 * @method get
 * @path /news/count
 * @param lang default is english
 * @param id user
 * @return success message
 */
const countNotification = async (locals) => {
    let user = await userModel.findById(locals.uid)

    let news = await newsModel.getAll({ to_user_id: { $in: [locals.uid, appConstant.ID_NEW_DEFAULT] }, status: 1, created_at: { $gte: user.created_at } });
    let newHistory = await newHistoryModel.getAll({ user_id: locals.uid })
    return {
        count: _.filter(news, (o) => {
            return !_.find(newHistory, (o1) => {
                return o._id.toString() === o1.new_id
            })
        }).length
    }
}

module.exports = {
    getNews,
    addNews,
    getNewsById,
    updateNewsById,
    removeNewsById,
    readNewById,
    countNotification
}