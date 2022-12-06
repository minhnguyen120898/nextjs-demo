const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const NOTIFICATION = appConstant.DATA_TABLE.NOTIFICATION;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    user_id     : {type:String,ref:appConstant.DATA_TABLE.USER},
    token_id    : String,
    device_id   : String,
    created_at  : Number,
    updated_at  :Number
})
/**
 * Validations
 */
/**
 * Pre hook
 */
notificationSchema
    .pre('save', function(next) {
        const time = moment().valueOf()
        if(!this.created_at) this.created_at = time
        if(!this.updated_at) this.updated_at = time
        next()
    });
notificationSchema
    .pre(['updateOne'], function(next) {
        this._update.$set.updated_at = moment().valueOf()
        next()
    });
module.exports = mongoose.model(NOTIFICATION, notificationSchema)
