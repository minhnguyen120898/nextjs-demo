const tagModel = require('../../shared/models/tag')
const _ = require('lodash');
const localeUtils = require('../../shared/helpers/localesUtils.helper')
const validUtils = require('../../shared/helpers/validUtils.helper')
const fileHandle = require('../../shared/helpers/fileHandle.helper')
const moment = require("moment");

/**
 * @method POST
 * @path /tag
 * @param locals default is english
 * @param body
 * @return success message
 */

const create = async (locals, body) => {
    await tagModel.create(body)
    return {
        message: localeUtils.commonMessage(locals.lang).CREATE_SUCCESS
    }
}

/**
 * @method GET
 * @path /tag/:tag_id
 * @param locals default is english
 * @param id tag
 * @return data
 */
const getById = async (locals, id) => {
    const tag = await tagModel.getById(id)
    if (!tag) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    return tag
}

/**
 * @method Put
 * @path /tag/:tag_id
 * @param locals default is english
 * @param body
 * @return success message
 */
const updateById = async (locals, id, body) => {
    const tag = await tagModel.getById(id)
    if (!tag) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }

    await tagModel.update(id, body)
    return {
        message: localeUtils.commonMessage(locals.lang).UPDATE_SUCCESS
    }
}


/**
 * @method delete
 * @path /tag/:tag_id
 * @param lang default is english
 * @param id user
 * @return success message
 */
const removeById = async (locals, id) => {
    const tag = await tagModel.getById(id)
    if (!tag) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    await tagModel.remove(id)
    return {
        message: localeUtils.commonMessage(locals.lang).REMOVE_SUCCESS
    }
}
/**
 * @method get
 * @path /tag
 * @param query
 * @return data
 */
const getList = async (locals, query) => {
    const pagination = validUtils.paginationValidator(query)
    const tag = await tagModel.getByPagination({}, pagination)
    return tag
}

module.exports = {
    getList,
    create,
    removeById,
    updateById,
    getById
}