'use strict';
const moment = require('moment')
const emailHelper = require('../../shared/helpers/email.helper');
const userModel = require('../../shared/models/user')
const localesUtils = require('../../shared/helpers/localesUtils.helper')
const encodeDecode = require('../../shared/security/encodeDecode.security')
const passwordManagement = require('../../shared/security/passGenerator.security')

/**
 * @method POST
 * @path /resend/active
 * @param lang default is english
 * @return success message
 */
const resendActive = async (auth, lang) => {
        let auth_decode = encodeDecode.decode(auth)
        let email = auth_decode.split(':')[0]
        let password = auth_decode.split(':')[1]
        let user = await userModel.findOneByField({ email });
        if(!user){
            throw Error(localesUtils.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST)
        }
        if (! await passwordManagement.comparePassword(password, user.password)) {
            throw Error(localesUtils.userMessage(lang).LOGIN.PASSWORD_IS_NOT_VALID)
        }
        let code = passwordManagement.getNonceString(6, true)
        let verify_code = `${moment().valueOf()}:${code}`
        await userModel.update(user._id.toString(), { verify_code })
        emailHelper.sendRegisterMail(user.email, lang, encodeDecode.encode(`${user._id.toString()}:${verify_code}`))
        return {
            message: localesUtils.userMessage(lang).VERIFY.RESEND_CODE_SUCCESS
        }
}

module.exports = {
    resendActive
}