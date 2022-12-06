const appConstant = require('../shared/helpers/constant.helper')

const verifyAuth = (req, res, next) => {
    let auth = req.header('auth');
    let lang = req.header('locale');
    const type = Number(req.body.type);
    try {
        if (!type||type === appConstant.USER.TYPE.PHONE) {
            if (!auth) {
                throw new Error('authentication token not found');
            }
            res.locals.auth = auth;
            res.locals.lang = lang;
            next();
        } else if (type === appConstant.USER.TYPE.FACEBOOK) {
            const accessToken = req.header(appConstant.HEADER.ACCESS_TOKEN);
            if (!accessToken) {
                next(106);
            } else {
                res.locals.accessToken = accessToken;
                res.locals.lang = lang;
                next();
            }
        } else {
            next(102);
        }
    } catch (err) {
        console.log(err);
        next(105);
    }
}

module.exports = {
    verifyAuth
}