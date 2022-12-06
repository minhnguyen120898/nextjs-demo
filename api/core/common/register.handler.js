'use strict';
const moment = require('moment')
const _ = require('lodash');
const speakeasy = require('speakeasy')
const emailValidator = require("email-validator");
const userModel = require('../../shared/models/user')
const settingModel = require('../../shared/models/setting')

const appConstant = require('../../shared/helpers/constant.helper')

const localesUtils = require('../../shared/helpers/localesUtils.helper')
const passwordManagement = require('../../shared/security/passGenerator.security')
const encodeDecode = require('../../shared/security/encodeDecode.security')
const emailHelper = require('../../shared/helpers/email.helper')
const validUtils = require('../../shared/helpers/validUtils.helper')

/**
 * @method POST
 * @path /register
 * @param locals
 * @param body
 * @return success message
 */
const register = async (locals, body) => {
        const authDecode = encodeDecode.decode(locals.auth)
        const email = (authDecode.split(":")[0]).toLowerCase()
        const password = authDecode.split(":")[1]
        if (!emailValidator.validate(email)) {
            throw Error(localesUtils.userMessage(locals.lang).VERIFY.INVALID_EMAIL)
        }
        if (!password) {
            throw Error(localesUtils.userMessage(locals.lang).LOGIN.PASSWORD_IS_NOT_VALID)
        }

        const user = await userModel.findOneByField({ email })
        if (user) {
            throw Error(localesUtils.userMessage(locals.lang).REGISTER.EMAIL_IS_EXIST)
        }
        let passwordEncode = await passwordManagement.hashPasswordMd5(password)
        let code = passwordManagement.getNonceString(6, true)
        let verify_code = `${moment().valueOf()}:${code}`

        if (body.referrer_id) {
            if(!(validUtils.mongoValidator(body.referrer_id)&&await userModel.findById(body.referrer_id))){
                throw Error(localesUtils.userMessage(locals.lang).REGISTER.REF_INVALID)

            }
        }

        const data = Object.assign(body, {
            email: email,
            password: passwordEncode,
            language: locals.lang,
            verify_code: verify_code,
            status: appConstant.USER.STATUS.NEW,
        })
        data._id = await userModel.create(data)

        emailHelper.sendRegisterMail(email, locals.lang, encodeDecode.encode(`${data._id}:${verify_code}`))
        return {
            message: localesUtils.userMessage(locals.lang).REGISTER.CREATE_ACCOUNT_SUCCESS
        }
}

module.exports = {
    register
}