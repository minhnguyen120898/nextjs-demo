'use strict';
const getConfig = () => {
    switch (process.env.MODE_BUILD) {
        case 'dev':
            return require('../../config/development')
        case 'prod':
            return require('../../config/production')
    }
    return require('../../config/development')
}

const getWhiteList = () => {
    return getConfig().whiteList;
}

const getMongoDb = () => {
    return getConfig().mongoDb
}

const getJwt = () => {
    return getConfig().jwt
}

const getEmail = () => {
    return getConfig().email
}

const getEncodeDecode = () => {
    return getConfig().encodeDecode;
}

const getRedisConfig = () => {
    return getConfig().redis
}

const getHost = () => {
    return getConfig().host
}

const getImageDir = () => {
    return getConfig().imageDir;
}

const getKeyPhone = () => {
    return getConfig().keyPhone;
}

const getLine = () => {
    return getConfig().line;
}

const getStripePaymentConfig=()=> {
    return getConfig().stripePayment;
}
const getAdminConfig=()=> {
    return getConfig().admin;
}

const getGoogleCloud=()=> {
    return getConfig().googleCloud;
}

const getDatabaseUrl=()=> {
    return getConfig().databaseURL;
}

const s3 = () => {
    return getConfig().s3
}

module.exports = {
    getWhiteList,
    getMongoDb,
    getJwt,
    getEmail,
    getEncodeDecode,
    getRedisConfig,
    getHost,
    getImageDir,
    getKeyPhone,
    getLine,
    getStripePaymentConfig,
    getAdminConfig,
    getGoogleCloud,
    getDatabaseUrl,
    s3
}