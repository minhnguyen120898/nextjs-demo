const categoryModel = require('../../shared/models/category')
const _ = require('lodash');
const localeUtils = require('../../shared/helpers/localesUtils.helper')
const validUtils = require('../../shared/helpers/validUtils.helper')
const fileHandle = require('../../shared/helpers/fileHandle.helper')
const moment = require("moment");

/**
 * @method POST
 * @path /category
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

    await categoryModel.create(body)
    return {
        message: localeUtils.commonMessage(locals.lang).CREATE_SUCCESS
    }
}

/**
 * @method GET
 * @path /category/:category_id
 * @param locals default is english
 * @param id category
 * @return data
 */
const getById = async (locals, id) => {
    const category = await categoryModel.getById(id)
    if (!category) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    return category
}

/**
 * @method Put
 * @path /category/:category_id
 * @param locals default is english
 * @param body
 * @return success message
 */
const updateById = async (locals, id, body) => {
    const category = await categoryModel.getById(id)
    if (!category) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    if (body.image && validUtils.isBase64(body.image)) {
        let base64 = body.image.split(',')
        let extension = base64[0].split(';')[0].split('/')[1]
        let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
        body.image = await fileHandle.uploadToStorage(name, base64[1])
    }

    await categoryModel.update(id, body)
    return {
        message: localeUtils.commonMessage(locals.lang).UPDATE_SUCCESS
    }
}


/**
 * @method delete
 * @path /category/:category_id
 * @param lang default is english
 * @param id user
 * @return success message
 */
const removeById = async (locals, id) => {
    const category = await categoryModel.getById(id)
    if (!category) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    await categoryModel.remove(id)
    return {
        message: localeUtils.commonMessage(locals.lang).REMOVE_SUCCESS
    }
}
/**
 * @method get
 * @path /category
 * @param query
 * @return data
 */
const getList = async (locals, query) => {
    const pagination = validUtils.paginationValidator(query)
    const category = await categoryModel.getByPagination({}, pagination)
    return category
}

module.exports = {
    getList,
    create,
    removeById,
    updateById,
    getById
}