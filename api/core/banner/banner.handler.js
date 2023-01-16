const bannerModel = require('../../shared/models/banner')
const _ = require('lodash');
const localeUtils = require('../../shared/helpers/localesUtils.helper')
const validUtils = require('../../shared/helpers/validUtils.helper')
const fileHandle = require('../../shared/helpers/fileHandle.helper')
const moment = require("moment");

/**
 * @method POST
 * @path /banner
 * @param locals default is english
 * @param body
 * @return success message
 */

const create = async (locals, body) => {
    if (body.image && validUtils.isBase64(body.image)) {
        let base64 = body.image.split(',')
        let extension = base64[0].split(';')[0].split('/')[1]
        let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
        body.image = await fileHandle.uploadToStorage(name, base64[1])
    }

    await bannerModel.create(body)
    return {
        message: localeUtils.commonMessage(locals.lang).CREATE_SUCCESS
    }
}

/**
 * @method GET
 * @path /banner/:banner_id
 * @param locals default is english
 * @param id banner
 * @return data
 */
const getById = async (locals, id) => {
    const banner = await bannerModel.getById(id)
    if (!banner) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    return banner
}

/**
 * @method Put
 * @path /banner/:banner_id
 * @param locals default is english
 * @param body
 * @return success message
 */
const updateById = async (locals, id, body) => {
    const banner = await bannerModel.getById(id)
    if (!banner) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    if (body.image && validUtils.isBase64(body.image)) {
        let base64 = body.image.split(',')
        let extension = base64[0].split(';')[0].split('/')[1]
        let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
        body.image = await fileHandle.uploadToStorage(name, base64[1])
    }

    await bannerModel.update(id, body)
    return {
        message: localeUtils.commonMessage(locals.lang).UPDATE_SUCCESS
    }
}


/**
 * @method delete
 * @path /banner/:banner_id
 * @param lang default is english
 * @param id user
 * @return success message
 */
const removeById = async (locals, id) => {
    const banner = await bannerModel.getById(id)
    if (!banner) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    await bannerModel.remove(id)
    return {
        message: localeUtils.commonMessage(locals.lang).REMOVE_SUCCESS
    }
}
/**
 * @method get
 * @path /banner
 * @param query
 * @return data
 */
const getList = async (locals, query) => {
    const pagination = validUtils.paginationValidatorArr(query)
    const banner = await bannerModel.getByPagination({}, pagination)
    return banner
}

module.exports = {
    getList,
    create,
    removeById,
    updateById,
    getById
}