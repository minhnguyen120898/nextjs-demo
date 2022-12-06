'use strict';
const moment = require('moment')
const appConstant = require('../../shared/helpers/constant.helper');
const encodeDecode = require('../../shared/security/encodeDecode.security');
const userModel = require('../../shared/models/user');
const passwordManagement = require('../../shared/security/passGenerator.security');
const localesUtils = require('../../shared/helpers/localesUtils.helper');
const emailHelper = require('../../shared/helpers/email.helper')

/**
 * @method POST
 * @path /forgot-password/code
 * @param lang default is english
 * @param email
 * @return success message
 */
const getCode = async (email, lang) => {
    const user = await userModel.findOneByField({ email })
    if (!user) {
        throw Error(localesUtils.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST)
    }
    // if (!user.is_active) {
    //     throw Error(localesUtils.userMessage(lang).LOGIN.ACCOUNT_NOT_ACTIVED);
    // }
    let code = passwordManagement.getNonceString(6, true)
    let verify_code = `${moment().valueOf()}:${code}`
    await userModel.update(user._id.toString(), { verify_code })
    await emailHelper.sendForgotPasswordMail(email, lang, encodeDecode.encode(`${user._id.toString()}:${verify_code}`))
    return {
        message: localesUtils.userMessage(lang).VERIFY.CODE_SENT
    }
}

/**
 * @method POST
 * @path /forgot-password/reset
 * @param lang default is english
 * @param body { code, new_password}
 * @return success message
 */
const reset = async (lang, body) => {
    console.log(body)
    let user_id = encodeDecode.decode(body.code).split(':')[0]
    let time = encodeDecode.decode(body.code).split(':')[1]
    let code = encodeDecode.decode(body.code).split(':')[2]
    console.log(user_id)
    const user = await userModel.findById(user_id);
    if (!user || user.status==appConstant.USER.STATUS.NEW) {
        throw Error(localesUtils.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    }
    let time_exp = user.verify_code.split(':')[0]
    let reset_code = user.verify_code.split(':')[1]
    if(reset_code !== code || time !== time_exp){
        throw Error(localesUtils.userMessage(lang).VERIFY.VERIFY_CODE_INCORRECT)
    }
    if(moment().valueOf() - parseInt(time_exp) > appConstant.TIME_EXP_RESET_PASSWORD){
        throw Error (localesUtils.userMessage(lang).VERIFY.CODE_HAS_EXPIRED)
    }
    let passwordEncode = await passwordManagement.hashPasswordMd5(encodeDecode.decode(body.new_password))
    await userModel.update(user._id.toString(), {
        password: passwordEncode,
        verify_code: ''
    });
    return {
        message: localesUtils.userMessage(lang).RESET_PASSWORD.RESET_PASSWORD_IS_SUCCESSFULLY,
    }
}

module.exports = {
    getCode,
    reset
}