const workModel = require('../../shared/models/work')
const _ = require('lodash');
const localeUtils = require('../../shared/helpers/localesUtils.helper')
const validUtils = require('../../shared/helpers/validUtils.helper')
const fileHandle = require('../../shared/helpers/fileHandle.helper')
const moment = require("moment");

/**
 * @method POST
 * @path /work
 * @param locals default is english
 * @param body
 * @return success message
 */

const create = async (locals, body) => {
    if (body.eye_catching && validUtils.isBase64(body.eye_catching)) {
        let base64 = body.eye_catching.split(',')
        let extension = base64[0].split(';')[0].split('/')[1]
        let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
        body.eye_catching = await fileHandle.uploadToStorage(name, base64[1])
    }

    if (body.video && validUtils.isBase64(body.video)) {
        let base64 = body.video.split(',')
        let extension = base64[0].split(';')[0].split('/')[1]
        let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
        body.video = await fileHandle.uploadToStorage(name, base64[1])
    }

    if (body.image &&body.image.length>0 ) {
        for(let i=0;i<body.image.length;i++){
            const image=body.image[i]
            if( validUtils.isBase64(image)){
                let base64 = image.split(',')
                let extension = base64[0].split(';')[0].split('/')[1]
                let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
                body.image[i] = await fileHandle.uploadToStorage(name, base64[1])
            }
        }
 
    }

    await workModel.create(body)
    return {
        message: localeUtils.commonMessage(locals.lang).CREATE_SUCCESS
    }
}

/**
 * @method GET
 * @path /work/:work_id
 * @param locals default is english
 * @param id work
 * @return data
 */
const getById = async (locals, id) => {
    const work = await workModel.getById(id)
    if (!work) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    return work
}

/**
 * @method Put
 * @path /work/:work_id
 * @param locals default is english
 * @param body
 * @return success message
 */
const updateById = async (locals, id, body) => {
    const work = await workModel.getById(id)
    if (!work) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    if (body.eye_catching && validUtils.isBase64(body.eye_catching)) {
        let base64 = body.eye_catching.split(',')
        let extension = base64[0].split(';')[0].split('/')[1]
        let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
        body.eye_catching = await fileHandle.uploadToStorage(name, base64[1])
    }

    if (body.video && validUtils.isBase64(body.video)) {
        let base64 = body.video.split(',')
        let extension = base64[0].split(';')[0].split('/')[1]
        let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
        body.video = await fileHandle.uploadToStorage(name, base64[1])
    }

    if (body.image &&body.image.length>0 ) {
        for(let i=0;i<body.image.length;i++){
            const image=body.image[i]
            if( validUtils.isBase64(image)){
                let base64 = image.split(',')
                let extension = base64[0].split(';')[0].split('/')[1]
                let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
                body.image[i] = await fileHandle.uploadToStorage(name, base64[1])
            }
        }
 
    }

    await workModel.update(id, body)
    return {
        message: localeUtils.commonMessage(locals.lang).UPDATE_SUCCESS
    }
}


/**
 * @method delete
 * @path /work/:work_id
 * @param lang default is english
 * @param id user
 * @return success message
 */
const removeById = async (locals, id) => {
    const work = await workModel.getById(id)
    if (!work) {
        throw Error(localeUtils.commonMessage(locals.lang).NOT_FOUND)
    }
    await workModel.remove(id)
    return {
        message: localeUtils.commonMessage(locals.lang).REMOVE_SUCCESS
    }
}
/**
 * @method get
 * @path /work
 * @param query
 * @return data
 */
const getList = async (locals, query) => {
    const pagination = validUtils.paginationValidator(query)
    const work = await workModel.getByPagination({status:{$in:[0]}}, pagination)
    return work
}

/**
 * @method get
 * @path /work
 * @param query
 * @return data
 */
const admminGetList = async (locals, query) => {
    const pagination = validUtils.paginationValidator(query)
    const work = await workModel.getByPagination({}, pagination)
    return work
}

module.exports = {
    getList,
    create,
    removeById,
    updateById,
    getById,
    admminGetList
}