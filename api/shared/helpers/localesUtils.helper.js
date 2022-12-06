const i18n = require('i18n');
const LOCALE_DEFAULT = 'ja';
const locales = ['en', 'ja'];

const userMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'USER',
        locale: lang
    });
    return language;
}

const mailMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'MAIL',
        locale: lang
    });
    return language;
}

const middMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'MIDD',
        locale: lang
    });
    return language;
}

const favMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'FAV',
        locale: lang
    });
    return language;
}


const followMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'FOLLOW',
        locale: lang
    });
    return language;
}

const reportMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'REPORT',
        locale: lang
    });
    return language;
}


const blockMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'BLOCK',
        locale: lang
    });
    return language;
}

const withdrawMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'WITHDRAW',
        locale: lang
    });
    return language;
}


const accountMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'ACOUNT1',
        locale: lang
    });
    return language;
}

const paymentMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'PAYMENT',
        locale: lang
    });
    return language;
}

const eventMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'EVENT',
        locale: lang
    });
    return language;
}

const eventJoinMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'EVENT_JOIN',
        locale: lang
    });
    return language;
}

const contactMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'CONTACT',
        locale: lang
    });
    return language;
}

const qaMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'QA',
        locale: lang
    });
    return language;
}

const notificationMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'NOTIFICATION',
        locale: lang
    });
    return language;
}

const newMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'NEWS',
        locale: lang
    });
    return language;
}

const imageMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'IMAGE',
        locale: lang
    });
    return language;
}

const viewMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'VIEW',
        locale: lang
    });
    return language;
}


const commonMessage = (lang = LOCALE_DEFAULT) => {
    if (!lang || locales.indexOf(lang) === -1) {
        lang = LOCALE_DEFAULT;
    }
    let language = i18n.__({
        phrase: 'COMMON',
        locale: lang
    });
    return language;
}

module.exports = {
    userMessage,
    mailMessage,
    middMessage,
    favMessage,
    followMessage,
    reportMessage,
    blockMessage,
    paymentMessage,
    accountMessage,
    eventMessage,
    contactMessage,
    qaMessage,
    eventJoinMessage,
    notificationMessage,
    newMessage,
    imageMessage,
    withdrawMessage,
    viewMessage,
    commonMessage
}