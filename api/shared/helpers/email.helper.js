const fs = require('fs')
const nodemailer = require('nodemailer');
const configCommon = require('./configCommon.helper')
const sesTransport = require('nodemailer-ses-transport');
const localesUtils = require('./localesUtils.helper');
const appConstant = require('./constant.helper');

const configEmail = configCommon.getEmail()
const emailAddress = configEmail.emailAddress;
const emailName = configEmail.emailName;
const accessKeyId = configEmail.accessKeyId;
const secretAccessKey = configEmail.secretAccessKey;
const region = configEmail.region;
const smtpConfig = {
    accessKeyId,
    secretAccessKey,
    region
};
const naturalPath = __dirname.split("/")
const mailPath = `${naturalPath.slice(0, naturalPath.length-2).join("/")}/shared/mail_templates`


const sendRegisterMail = async(email, lang, code) => {
    let mailTemplate = fs.readFileSync(`${mailPath}/register.html`, "utf8")
    mailTemplate = mailTemplate.replace(/##REGISTER_1##/g, localesUtils.mailMessage(lang).CONTENT.REGISTER_1)
    mailTemplate = mailTemplate.replace(/##REGISTER_2##/g, localesUtils.mailMessage(lang).CONTENT.REGISTER_2)
    mailTemplate = mailTemplate.replace(/##REGISTER_3##/g, localesUtils.mailMessage(lang).CONTENT.REGISTER_3)
    mailTemplate = mailTemplate.replace(/##REGISTER_4##/g, localesUtils.mailMessage(lang).CONTENT.REGISTER_4)
    mailTemplate = mailTemplate.replace(/##REGISTER_5##/g, localesUtils.mailMessage(lang).CONTENT.REGISTER_5)
    mailTemplate = mailTemplate.replace(/##REGISTER_6##/g, localesUtils.mailMessage(lang).CONTENT.REGISTER_6)

    mailTemplate = mailTemplate.replace(/##HOST##/g, configCommon.getHost())
    mailTemplate = mailTemplate.replace(/##EMAIL##/g, email)
    // mailTemplate = mailTemplate.replace(/##PASSWORD##/g, data.password)
    mailTemplate = mailTemplate.replace(/##ACTIVE_CODE##/g, code)
    mailTemplate = mailTemplate.replace(/##SIGNATURE_1##/g, localesUtils.mailMessage(lang).CONTENT.SIGNATURE_1)
    mailTemplate = mailTemplate.replace(/##SIGNATURE_2##/g, localesUtils.mailMessage(lang).CONTENT.SIGNATURE_2)
    mailTemplate = mailTemplate.replace(/##SIGNATURE_3##/g, localesUtils.mailMessage(lang).CONTENT.SIGNATURE_3)
    mailTemplate = mailTemplate.replace(/##SIGNATURE_4##/g, localesUtils.mailMessage(lang).CONTENT.SIGNATURE_4)
    sendEmail(localesUtils.mailMessage(lang).TITLE.REGISTER, email, null, null, mailTemplate)
    return {
        message: localesUtils.userMessage(lang).REGISTER.CREATE_ACCOUNT_SUCCESS
    }
}

const sendRegisterMailAdmin = async(email,data, lang) => {
    let mailTemplate = fs.readFileSync(`${mailPath}/register_admin.html`, "utf8")
    mailTemplate = mailTemplate.replace(/##REGISTER_1##/g, data);
    sendEmail(localesUtils.mailMessage(lang).TITLE.REGISTER, email, null, null, mailTemplate)
    return {
        message: localesUtils.userMessage(lang).REGISTER.CREATE_ACCOUNT_SUCCESS
    }
}

const sendForgotPasswordMail = async(email, lang, code) => {
    let mailTemplate = fs.readFileSync(`${mailPath}/forgot_password.html`, "utf8")
    mailTemplate = mailTemplate.replace(/##FORGOT_PASSWORD_1##/g, localesUtils.mailMessage(lang).CONTENT.FORGOT_PASSWORD_1)
    mailTemplate = mailTemplate.replace(/##HOST##/g, configCommon.getHost())
    mailTemplate = mailTemplate.replace(/##RESET_CODE##/g, code)
    mailTemplate = mailTemplate.replace(/##SIGNATURE_1##/g, localesUtils.mailMessage(lang).CONTENT.SIGNATURE_1)
    mailTemplate = mailTemplate.replace(/##SIGNATURE_2##/g, localesUtils.mailMessage(lang).CONTENT.SIGNATURE_2)
    mailTemplate = mailTemplate.replace(/##SIGNATURE_3##/g, localesUtils.mailMessage(lang).CONTENT.SIGNATURE_3)
    mailTemplate = mailTemplate.replace(/##SIGNATURE_4##/g, localesUtils.mailMessage(lang).CONTENT.SIGNATURE_4)
    sendEmail(localesUtils.mailMessage(lang).TITLE.RESET_PASSWORD, email, null, null, mailTemplate)
    return {
        message: localesUtils.userMessage(lang).SEND_EMAIL.SENT_EMAIL_SUCCESSFULLY
    }
}

/**
 * Contact mail
 * @param {*} email 
 * @param {*} data
 */

const sendContactMail = async(email, lang, content) => {
    let mailTemplate = fs.readFileSync(`${mailPath}/contact.html`, "utf8")
    mailTemplate = mailTemplate.replace(/##CONTENT##/g, content)
    sendEmail(localesUtils.mailMessage(lang).TITLE.REPLY_CONTACT, email, null, null, mailTemplate)
    return {
        message: localesUtils.userMessage(lang).CONTACT.SEND_SUCCESS
    }
}

/**
 * send mail handle
 * @param {*} subject 
 * @param {*} emailReceiver 
 * @param {*} cc 
 * @param {*} bcc 
 * @param {*} data 
 * @param {*} fromMail 
 * @param {*} lang 
 */
const sendEmail = (subject, emailReceiver, cc, bcc, data, fromMail, lang=appConstant.HEADER.LOCALE_DEFAULT) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(sesTransport(smtpConfig));
    // setup e-mail data with unicode symbols
    let name = fromMail ? `From ${fromMail}` : emailName;
    var mailOptions = {
        from: `"${name}" <${emailAddress}>`, // sender address
        to: emailReceiver,
        cc,
        bcc, // list of receivers
        subject: `${subject}`, // Subject line
        html: data
    };
    return transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error)
            return error;
            // throw new Error('Error send email from server');
        } else {
            return localesUtils.userMessage(lang).SEND_EMAIL.SENT_EMAIL_SUCCESSFULLY;
        }
    });
}

module.exports = {
    sendRegisterMail,
    sendForgotPasswordMail,
    sendContactMail,
    sendRegisterMailAdmin
}