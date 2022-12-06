const notificationModel = require('../../shared/models/notification')

const _ = require('lodash');
const localeUtils = require('../../shared/helpers/localesUtils.helper')
const notificationHelper = require("../../shared/helpers/notificationHelper")

/**
 * @method POST
 * @path /notification
 * @param locals default is english
 * @param body
 * @return success message
 */

const create = async (locals, body) => {
    await removeByDeviceId(locals,body.device_id)
    let data = await notificationModel.create(_.merge(body, { user_id: locals.uid }))
    return {
        message: localeUtils.notificationMessage(locals.lang).CREATE_SUCCESS,
        _id: data
    }
}

const getById = async (locals, id) => {
    const notification = await notificationModel.getById(id)
    if (!notification) {
        throw Error(localeUtils.notificationMessage(locals.lang).NOT_FOUND)
    }
    return notification
}

const updateById = async (locals, id, body) => {
    const notification = await notificationModel.getById(id)
    if (!notification) {
        throw Error(localeUtils.notificationMessage(locals.lang).NOT_FOUND)
    }
    await notificationModel.update(id, body)
    return {
        message: localeUtils.notificationMessage(locals.lang).UPDATE_SUCCESS
    }
}

const removeByDeviceId = async (locals, deviceId) => {
    console.log(deviceId)
    const notification = await notificationModel.getAll({device_id:deviceId})
    if(notification){
        for(let i=0;i<notification.length;i++){
            await notificationModel.remove(notification[i]._id.toString())
        }
    }
    return {
        message: localeUtils.notificationMessage(locals.lang).REMOVE_SUCCESS
    }
}

const getListByIdUser = async (idUser) => {
    const notification = await notificationModel.getAll({ user_id: idUser })
    return notification
}

const sendAllDevice=async(body)=>{
    const notification = await notificationModel.getAll({})
    for (let i = 0; i < notification.length; i++) {
        notificationHelper.pushMessage(notification[i].token_id, body);
    }
}

const sendNotificationToUser = async (idUser, body) => {
    let users = await getListByIdUser(idUser);
    for (let i = 0; i < users.length; i++) {
        notificationHelper.pushMessage(users[i].token_id, body);
    }
}


module.exports = {
    create,
    removeByDeviceId,
    updateById,
    getById,
    getListByIdUser,
    sendNotificationToUser,
    sendAllDevice
}