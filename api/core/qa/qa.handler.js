const qaModel = require('../../shared/models/qa')
const _ = require('lodash');
const localeUtils = require('../../shared/helpers/localesUtils.helper')
const validUtils = require('../../shared/helpers/validUtils.helper')
/**
 * @method POST
 * @path /qa
 * @param locals default is english
 * @param body
 * @return success message
 */

const create = async (locals, body) => {

    await qaModel.create(body)
    return {
        message: localeUtils.qaMessage(locals.lang).CREATE_SUCCESS
    }
}

/**
 * @method GET
 * @path /qa/:qa_id
 * @param locals default is english
 * @param id qa
 * @return data
 */
const getById = async (locals, id) => {
    const qa = await qaModel.getById(id)
    if (!qa) {
        throw Error(localeUtils.qaMessage(locals.lang).NOT_FOUND)
    }
    return qa
}

/**
 * @method Put
 * @path /qa/:qa_id
 * @param locals default is english
 * @param body
 * @return success message
 */
const updateById = async (locals, id, body) => {
    const qa = await qaModel.getById(id)
    if (!qa) {
        throw Error(localeUtils.qaMessage(locals.lang).NOT_FOUND)
    }
    await qaModel.update(id, body)
    return {
        message: localeUtils.qaMessage(locals.lang).UPDATE_SUCCESS
    }
}


/**
 * @method delete
 * @path /qa/:qa_id
 * @param lang default is english
 * @param id user
 * @return success message
 */
const removeById = async (locals, id) => {
    const qa = await qaModel.getById(id)
    if (!qa) {
        throw Error(localeUtils.qaMessage(locals.lang).NOT_FOUND)
    }
    await qaModel.remove(id)
    return {
        message: localeUtils.qaMessage(locals.lang).REMOVE_SUCCESS
    }
}
/**
 * @method get
 * @path /qa
 * @param query
 * @return data
 */
const getList = async (locals, query) => {
    const pagination = validUtils.paginationValidator(query)
    const qa = await qaModel.getByQuery({}, pagination)
    return qa
}

module.exports = {
    getList,
    create,
    removeById,
    updateById,
    getById
}