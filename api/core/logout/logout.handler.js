'use strict';
const tokenModel = require('../../shared/models/token');
const localesUtils = require('../../shared/helpers/localesUtils.helper');
const notificationHandle = require("../notification/notification.handler")
/**
 * @method POST
 * @path /logout
 * @param lang default is english
 * @param auth
 * @return success message
 */
const logout = async (token, body, lang) => {
    let accessToken = await tokenModel.findOneByField({ token })
    await tokenModel.remove(accessToken._id.toString())
    if (body.device_id) {
        await notificationHandle.removeByDeviceId({ lang: lang }, body.device_id)
    }
    return {
        message: localesUtils.userMessage(lang).LOGOUT.LOG_OUT_SUCCESSFULLY
    }
}

module.exports = {
    logout
}