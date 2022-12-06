const userAuthentication = require('../shared/security/userAuth.security')
const appConstant = require('../shared/helpers/constant.helper')
const userModel = require("../shared/models/user")
const activedToken = async (req, res, next) => {
    try {
        let reqToken = req.header('token');
        let lang = req.header('locale');
        if (reqToken) {
            const token = await userAuthentication.verifyToken(reqToken, lang)
            if (token.user.status === appConstant.USER.STATUS.UPDATED) {
                res.locals.tid = token._id.toString()
                res.locals.uid = token.user._id.toString();

                res.locals.lang = lang;
                next();
            } else next(102)
        } else {
            next(102)
        }
    }
    catch (err) {
        console.log(err)
        next(102)
    }
}

const verifiedToken = async (req, res, next) => {
    try {
        let reqToken = req.header('token');
        let lang = req.header('locale');
        if (reqToken) {
            const token = await userAuthentication.verifyToken(reqToken, lang)
            if (appConstant.USER.STATUS.ACTIVED <= token.user.status && token.user.status != appConstant.USER.STATUS.BLOCKED) {
                res.locals.tid = token._id.toString()
                res.locals.uid = token.user._id.toString();
                res.locals.lang = lang;
                res.locals.status = token.user.status;
                next();
            } else next(102)
        } else {
            next(102)
        }
    }
    catch (err) {
        console.log(err)
        next(102)
    }
}

const verifiedTokenAdmin = async (req, res, next) => {
    try {
        let reqToken = req.header('token');
        let lang = req.header('locale');
        if (reqToken) {
            const token = await userAuthentication.verifyToken(reqToken, lang)
            console.log(token)
                const user = await userModel.findById(token.user._id.toString());
                if (user.role !== 0) {
                    next(102)
                } else {
                    res.locals.tid = token._id.toString()
                    res.locals.uid = token.user._id.toString();
                    res.locals.lang = lang;
                    res.locals.status = token.user.status;
                    next();
                }
        } else {
            next(102)
        }
    }
    catch (err) {
        console.log(err)
        next(102)
    }
}

const noCheckToken = async (req, res, next) => {
    try {
        let reqToken = req.header('token');
        let lang = req.header('locale');
        if (reqToken) {
            const token = await userAuthentication.verifyToken(reqToken, lang)
            res.locals.tid = token._id.toString()
            res.locals.uid = token.user._id.toString();
            res.locals.lang = lang;
            res.locals.status = token.user.status;
            next();
        } else {
            next();
        }
    }
    catch (err) {
        console.log(err)
        next();
    }
}
module.exports = {
    activedToken,
    verifiedToken,
    verifiedTokenAdmin,
    noCheckToken
}