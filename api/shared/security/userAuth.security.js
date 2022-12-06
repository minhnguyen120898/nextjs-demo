'use strict';
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const moment = require('moment');
const localesUtils = require('../helpers/localesUtils.helper');
const configCommon = require('../helpers/configCommon.helper')
const appConstant = require('../helpers/constant.helper');
const userModel = require('../models/user')
const newsModel = require('../models/news')

const tokenModel = require('../models/token')
const signinHistoryModel = require('../models/signin_history')
const baseService = require('../helpers/baseService.helper')
const ipLocation = require('iplocation').default
const client = require('twilio')(configCommon.getKeyPhone().accountSid, configCommon.getKeyPhone().authToken);


const generateAccessToken = (user) => {
    let now = moment().valueOf();
    if (user.accessToken) {
        user.accessToken = null;
    }
    let payload = {
        "iat": now,
        "exp": now + appConstant.TIME_EXP_ACCESS_TOKEN,
        "uid": user._id.toString(),
        "claims": {
            user
        }
    };
    return jwt.sign(payload, configCommon.getJwt().key);
}

const generateRefreshToken = (user, ua) => {
    let now = moment().valueOf();
    if (user.accessToken) {
        user.accessToken = null;
    }
    let payload = {
        "iat": now,
        "exp": now + appConstant.TIME_EXP_REFRESH_TOKEN,
        "uid": user._id.toString(),
        "claims": {
            ua
        }
    };
    return jwt.sign(payload, configCommon.getJwt().key);
}

const verifyToken = async (reqToken, lang) => {
    let decodedToken = jwt.verify(reqToken, configCommon.getJwt().key);
    const token = await tokenModel.findOneByField({ token: reqToken, user: decodedToken.uid })
    if (!token || token.updated_at < moment().valueOf() - appConstant.TIME_EXP_ACCESS_TOKEN) {
        throw Error(localesUtils.userMessage(lang).AUTH.INVALID_ACCESS_TOKEN)
    }
    if (token.user.status === appConstant.USER.STATUS.NEW || token.user.status === appConstant.USER.STATUS.BLOCKED) {
        throw Error(localesUtils.userMessage(lang).AUTH.INVALID_ACCESS_TOKEN)
    }
    await tokenModel.update(token._id.toString(), { updated_at: moment().valueOf() })
    return token
}

const verifyRefreshToken = (token, lang, ua) => {
    let decodedToken = jwt.verify(token, configCommon.getJwt().key);
    if (decodedToken.exp < moment().valueOf() || decodedToken.claims.ua !== ua) {
        throw new Error(localesUtils.userMessage(lang).AUTHEN.INVALID_REFRESH_TOKEN);
    }
    return decodedToken
}

const loginBySocialNetwork = async (locals, body) => {
    const socialAccount = await verifySocialAccount(locals.accessToken, locals.lang, body.type)
    const user = await userModel.findOneByField({ social_id: socialAccount.id })
    if (user) {
        return await loginVerify(user._id.toString(), locals)
    }
    const data = await initSocialAccount(socialAccount, locals.lang, body.type)
    return await loginVerify(data._id, locals)
}

const verifySocialAccount = async (accessToken, lang, type) => {
    switch (type) {
        case appConstant.USER.TYPE.FACEBOOK:
            return await accountFacebook(accessToken, lang);
        default:
            throw Error(localesUtils.userMessage(lang).LOGIN.FAIL);
    }
}

const accountFacebook = async (accessToken, lang) => {
    const fields = 'birthday,hometown,email,id,gender,location,link,name';
    const url = `https://graph.facebook.com/me?fields=${fields}&access_token=${accessToken}`;
    const response = await baseService.request('GET', url, null, null);
    if (response.error) {
        throw Error(localesUtils.userMessage(lang).LOGIN.FAIL);
    }
    return response
}

const initSocialAccount = async (socialAccount, lang, type) => {
    switch (type) {
        case appConstant.USER.TYPE.FACEBOOK:
            return await initAccountFacebook(socialAccount, lang);
        default:
            throw Error(localesUtils.userMessage(lang).LOGIN.FAIL);
    }
}

const initAccountFacebook = async (socialAccount, lang) => {
    const data = {
        phone: '',
        password: '',
        social_id: socialAccount.id,
        role: appConstant.USER.ROLE.USER,
        type: appConstant.USER.TYPE.FACEBOOK,
        status: appConstant.USER.STATUS.UPDATED,
        language: lang,
    }
    data._id = await userModel.create(data)
    return data
}

const filterUserInfo = (user) => {
    return _.pick(user, [
        'token',
        'refresh_token',
        'status',
        "_id"
    ])
}

const loginVerify = async (user_id, locals) => {
    const user = await userModel.findById(user_id)
    if (user.status === appConstant.USER.STATUS.BLOCKED) {
        throw Error(localesUtils.userMessage(locals.lang).LOGIN.ACCOUNT_BLOCKED);
    }
    if (user.status === appConstant.USER.STATUS.NEW) {
        throw Error(localesUtils.userMessage(locals.lang).LOGIN.ACCOUNT_NOT_ACTIVED);
    }
    const location = await getLocation(locals.ip)
    const raw = await createSignInHistory(user._id.toString(), locals, location);
    signinHistoryModel.create(raw);
    const loginInfo = await createToken(user, locals.userAgent.ua)
    let news = await newsModel.getAll({ from_user_id: appConstant.ID_NEW_DEFAULT, type: 1, to_user_id: user_id })
    if(news.length==0){
        await newsModel.create({
            title: localesUtils.notificationMessage(locals.lang).FIRST_REGISTER,
            type: 1,
            content: "",
            from_user_id: appConstant.ID_NEW_DEFAULT,
            to_user_id: user_id
        })
    }

    return filterUserInfo(loginInfo)
}

const createToken = async (user, ua) => {
    await tokenModel.removeExpired(user._id.toString())
    const token = await generateAccessToken(user);
    const refresh_token = await generateRefreshToken(user, ua);
    await tokenModel.create({
        user: user._id.toString(),
        token: token,
        refresh_token: refresh_token
    })
    return _.omit(_.merge(user, { token, refresh_token }), ['user_id', 'password']);
}

const createSignInHistory = async (user_id, data, iplocation) => {
    if (!data.userAgent) {
        return
    }
    const os = `${data.userAgent.os.name || ''} ${data.userAgent.os.version || ''}`
    const browser = `${data.userAgent.browser.name || ''} ${data.userAgent.browser.version || ''}`
    const ip = `${data.ip.replace('::ffff:', '')}`
    const location = iplocation ? `${iplocation.region ? iplocation.region + ',' : ''}${iplocation.city ? iplocation.city + ',' : ''}${iplocation.country || ''}` : ''
    return {
        user: user_id, os, browser, ip, location
    }
}

const getLocation = async (ip) => {
    try {
        const location = await ipLocation(ip)
        return location
    } catch (error) {
        return
    }
}

const sendVerifyPhone = async (lang, code, to, exp) => {
    return new Promise((resolve, reject) => {
        const text = `Your verify code is ${code}. This code is valid for ${exp} minutes`
        client.messages.create({
            from: configCommon.getKeyPhone().phoneTwilio,
            to: `+${to}`,
            body: text
        }).then(async message => {
            console.log(message)
            resolve();
        })
            .catch((err) => {
                console.log(err.message);
                reject(localesUtils.userMessage(lang).VERIFY.SEND_CODE_FAILD);
            })

    })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
    verifySocialAccount,
    loginVerify,
    loginBySocialNetwork,
    createToken,
    sendVerifyPhone
}