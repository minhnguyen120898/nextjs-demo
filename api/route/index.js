const requestIp = require('request-ip');
// middleware
const authenMiddle = require('../middleware/authen.middle')
const tokenMiddle = require('../middleware/token.middle')
const ipClientMiddle = require('../middleware/ip_client.middle')
// routes
// routes
const registerRouter = require('./common/register.js')
const loginRouter = require('./common/login.js')
const resendRouter = require('./common/resend.js')
const verifyRouter = require('./common/verify.js')
const userRouter = require('./user/user.js')
const forgotRouter = require('./common/forgot_password.js')
const listRouter = require('./list/list.js')
const logoutRouter = require('./logout/logout')
const contactRouter=require("./contact/contact")
const notificationRouter=require("./notification/notification")
const categoryRouter=require("./category/category")
const tagRouter=require("./tag/tag")
const bannerRouter=require("./banner/banner")

const qaRouter=require("./qa/qa")
const newRouter=require("./news/news")

const registerRoutes = (app) => {
    app.use(requestIp.mw());

    app.use('/register',ipClientMiddle.verifyIpClient,authenMiddle.verifyAuth, registerRouter)
    app.use('/login', ipClientMiddle.verifyIpClient, authenMiddle.verifyAuth, loginRouter)
    app.use('/resend', authenMiddle.verifyAuth, resendRouter)
    app.use('/verify',ipClientMiddle.verifyIpClient, verifyRouter)
    app.use('/user', userRouter)
    app.use('/forgot-password', forgotRouter)
    app.use('/list', listRouter)
    app.use('/logout', logoutRouter)

    app.use('/contact', contactRouter)
    app.use('/qa', qaRouter)
    app.use('/notification', notificationRouter)
    app.use('/new', newRouter)
    app.use('/category', categoryRouter)
    app.use('/tag', tagRouter)
    app.use('/banner', bannerRouter)

}

module.exports = { 
    registerRoutes
};