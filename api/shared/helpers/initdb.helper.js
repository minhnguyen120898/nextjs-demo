const mongoose = require('mongoose')
const _ = require('lodash')
const passGenerator = require('../security/passGenerator.security')
const appConstant = require('./constant.helper')
const configCommon = require('./configCommon.helper')


const init = async () => {
    mongoose.connection.db.listCollections().toArray(async (err, collectionNames) => {
        if(err){
            console.log(err)
            process.exit(-1)
        }
        // create admin account
        if(!_.find(collectionNames, collection => collection.name === 'users')){
            await createAdmin()
        }
        // create experience settings
        if(!_.find(collectionNames, collection => collection.name === 'settings')){
            await createSetting()
        }
    })
}

const createAdmin = async () => {
    const password = await passGenerator.hashPasswordMd5(configCommon.getAdminConfig().password)
    mongoose.model(appConstant.DATA_TABLE.USER).create({
        phone           : configCommon.getAdminConfig().phone,
        password        : password,
        email:configCommon.getAdminConfig().email,
        role            : appConstant.USER.ROLE.ADMIN,
        type            : appConstant.USER.TYPE.PHONE,
        status          : appConstant.USER.STATUS.UPDATED,
        language        : appConstant.HEADER.LOCALE_ENGLISH,
    })
}
const createSetting = async () => {
  
}

module.exports = {
    init
}