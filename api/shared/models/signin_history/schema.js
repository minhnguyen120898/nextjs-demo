const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const Schema = require('mongoose').Schema;

const schema = new Schema({
    user        : { type: String, ref: appConstant.DATA_TABLE.USER },
    browser     : { type: String },
    ip          : { type: String },
    location    : { type: String },
    os          : { type: String },
    created_at  : { type: Number },
    updated_at  : { type: Number }
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
