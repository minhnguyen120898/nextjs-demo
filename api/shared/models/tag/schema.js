const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const TABLE = appConstant.DATA_TABLE.TAG;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title   : { type: String },
    created_at : { type: Number },
    updated_at : { type: Number }
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
module.exports = mongoose.model(TABLE, schema)
