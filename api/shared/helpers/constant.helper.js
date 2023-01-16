'use strict';

module.exports = Object.freeze({
    TIME_EXP_ACCESS_TOKEN: 15 * 24 * 30 * 60000,     // 15d
    TIME_EXP_ACTIVE: 5 * 60000,                    // 1'
    TIME_EXP_RESET_PASSWORD: 30 * 60000,       // 30'
    TIME_EXP_REFRESH_TOKEN: 24 * 60 * 60000,   // 1d
    DEFAULT_LOCATION: 'VN',
    ID_NEW_DEFAULT:"6059af719689fd168b1eaab0",
    HEADER: {
        LOCALE_DEFAULT: 'ja',
        LOCALE_HEADER: 'locale',
        AUTH: 'auth',
        ACCESS_TOKEN: 'access-token',
        REFRESH_TOKEN: 'refresh-token',
        TOKEN: 'token',
        LOCALE_ENGLISH: 'en',
        AGENT: 'user-agent'
    },
    USER: {
        ROLE: {
            ADMIN: 0,
            USER: 1,
        },
        TYPE: {
            PHONE: 0,
            FACEBOOK: 1
        },
        STATUS: {
            NEW: 1,
            ACTIVED: 2,
            UPDATED: 3,
            VERIFYED: 4,
            KYC: 5,
            CONFIRMED: 6,
            REJECT: 7,
            BLOCKED:8,
            DELETE:9
        },
        SEX: {
            MALE: 1,
            FEMALE: 2
        }
    },
    CONVERSATION: {
        CATEGORY: {
            CHAT: 1,
            HELP: 2
        },
        MESSAGE: {
            TEXT: 1,
            IMAGE: 2
        },
        TYPE:{
            SINGLE:0,
            GROUP:1
        },
        ADMIN:{
            USER:0,
            ADMIN:1
        }
    },
    PAGINATION: {
        PAGE_DEFAULT: 1,
        LIMIT_DEFAULT: 50,
        SORT_DEFAULT:-1
    },
    FILE: {
        EXTENSION: {
            PNG: 'png',
            JPG: 'jpg',
            JPEG: 'jpeg',
            PDF: 'pdf'
        }
    },
    DATA_TABLE: {
        USER: 'user',
        TOKEN: 'token',
        SIGNIN_HISTORY: 'signin_history',
        SETTING: 'setting',
        CONVERSATION: 'conversation',
        PARTICIPANT: 'participant',
        MESSAGE: 'message',
        CONTACT: "contact",
        QA: "qa",
        NOTIFICATION:"notification",
        NEWS:"new",
        NEW_HISTORY:"new_history",
        SOCIAL_NETWORK: 'social_network',
        CATEGORY:"category",
        TAG:"tag",
        BANNER:"banner",
        WORK:"work"
    },
    NOTIFICATION:{
        EVENT:1,
        MESSAGE:2,
        NEWS:3
    },
    IMAGE:{
        NEW:1,
        APPROVE:2,
        REJECT:3
    },
    CONTACT_STATUS:{
        NEW:1,
        READ:2,
        REPLY:3
    },
    
});