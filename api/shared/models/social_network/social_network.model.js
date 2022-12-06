const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const TABLE_SOCIAL_NETWORK = appConstant.DATA_TABLE.SOCIAL_NETWORK;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialNetworkSchema = new Schema({
    user_id       : { type: String, ref: appConstant.DATA_TABLE.USER },
    type            : Number,
    uid             : String,
    token           : String,
    link            : String,
    created_at      : Number,
    updated_at      : Number,
})
/**
 * Validations
 */
/**
 * Pre hook
 */
socialNetworkSchema
    .pre('save', function(next) {
        const time = moment().valueOf()
        if(!this.created_at) this.created_at = time
        if(!this.updated_at) this.updated_at = time
        next()
    });
socialNetworkSchema
    .pre(['findOneAndUpdate'], function(next) {
        if(this._update)this._update.updated_at = moment().valueOf()
        next()
    });
module.exports = mongoose.model(TABLE_SOCIAL_NETWORK, socialNetworkSchema)
