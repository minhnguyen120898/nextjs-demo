'use strict';
const moment = require('moment');
const appConstant = require('../../shared/helpers/constant.helper');
const userModel = require('../../shared/models/user');
const localesUtils = require('../../shared/helpers/localesUtils.helper');
const userAuthentication = require('../../shared/security/userAuth.security')
const encodeDecode = require('../../shared/security/encodeDecode.security')

/**
 * @method POST
 * @path /verify/active/:code
 * @param lang default is english
 * @param code
 * @param locals
 * @return success message
 */
const activeUser = async (locals, lang, code) => {
        const activeCode = encodeDecode.decode(code)
        let user_id = activeCode.split(':')[0]
        let time = activeCode.split(':')[1]
        let verifyCode = activeCode.split(':')[2]
        const user = await userModel.findById(user_id)
        if (user) {
            let time_exp = user.verify_code.split(':')[0]
            let code = user.verify_code.split(':')[1]
            if(code !== verifyCode || time !== time_exp){
                throw Error(localesUtils.userMessage(lang).VERIFY.VERIFY_CODE_INCORRECT)
            }
            if(moment().valueOf() - parseInt(time_exp) > appConstant.TIME_EXP_ACTIVE){
                throw Error (localesUtils.userMessage(lang).VERIFY.CODE_HAS_EXPIRED)
            }
            await userModel.update(user_id, {status: appConstant.USER.STATUS.ACTIVED, verify_code: null});
            return await userAuthentication.loginVerify(user_id, locals)
        } else {
            throw Error(localesUtils.userMessage(lang).VERIFY.VERIFY_CODE_INCORRECT);
        }
}

module.exports = {
    activeUser
}