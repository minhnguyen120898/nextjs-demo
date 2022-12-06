'use strict';
const bcrypt = require("bcrypt")

const getNonceString = (length, isNumber) => {
    var text = "";
    var possible;
    if (isNumber) {
        possible = "0123456789"
    } else {
        possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    }
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const getPassString = (length) => {
    var text = ""
    var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < length - 3; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += possible.charAt(Math.floor(Math.random() * (25 - 0 + 1)) + 0)
    text += possible.charAt(Math.floor(Math.random() * (51 - 26 + 1)) + 26)
    text += possible.charAt(Math.floor(Math.random() * (61 - 52 + 1)) + 52)
    return text;
}

const hashPasswordMd5 = async (password) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

module.exports = {
    getNonceString,
    getPassString,
    hashPasswordMd5,
    comparePassword
}