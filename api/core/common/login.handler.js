'use strict';
const _ = require('lodash');
const emailValidator = require("email-validator");
const userModel = require('../../shared/models/user')
const localesUtils = require('../../shared/helpers/localesUtils.helper')
const appConstant = require('../../shared/helpers/constant.helper')
const passwordManagement = require('../../shared/security/passGenerator.security')
const encodeDecode = require('../../shared/security/encodeDecode.security');
const userAuthentication = require('../../shared/security/userAuth.security')

/**
 * @method POST
 * @path /login/:type
 * @param lang default is english
 * @param auth
 * @return success message
 */
const login = async (locals) => {
    let decodedAuth = encodeDecode.decode(locals.auth);
    let email = decodedAuth.toString().split(':')[0].toLowerCase();
    let password = decodedAuth.toString().split(':')[1];
    let role = decodedAuth.toString().split(':')[2];
    console.log(decodedAuth)
    let user = await userModel.findOneByField({ email });
    if(!user||user.role!=role){
        throw Error(localesUtils.userMessage(locals.lang).LOGIN.USER_DOES_NOT_EXIST)
    }
    // const role = appConstant.USER.ROLE[`${String(type).toUpperCase()}`]
    // if(user.role !== role){
    //     throw Error(localesUtils.userMessage(locals.lang).LOGIN.USER_DOES_NOT_EXIST)
    // }
    if (! await passwordManagement.comparePassword(password, user.password)) {
        throw Error(localesUtils.userMessage(locals.lang).LOGIN.PASSWORD_IS_NOT_VALID)
    }
    let res=await userAuthentication.loginVerify(user._id.toString(), locals);
    if(user.status===appConstant.USER.STATUS.NEW){
        res=_.omit(res,["token"])
    }
    return res
}

module.exports = {
    login
}