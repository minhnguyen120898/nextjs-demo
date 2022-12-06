const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    conversation    : { type: String, ref: appConstant.DATA_TABLE.CONVERSATION },
    user            : { type: String, ref: appConstant.DATA_TABLE.USER },
    message         : { type: String },
    type            : { type: Number, enum: Object.values(appConstant.CONVERSATION.MESSAGE)},
    created_at      : { type: Number },
    updated_at      : { type: Number }
})
/**
 * Validations
 */
/**
 * Pre hook
 */
schema
    .pre('save', function(next) {
        const time = moment().valueOf()
        if(!this.created_at) this.created_at = time
        if(!this.updated_at) this.updated_at = time
        next()
    });
schema
    .pre(['findOneAndUpdate'], function(next) {
        if(this._update)this._update.updated_at = moment().valueOf()
        next()
    });
module.exports = schema