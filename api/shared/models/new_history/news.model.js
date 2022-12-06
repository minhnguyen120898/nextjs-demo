const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const TABLE_NEWS = appConstant.DATA_TABLE.NEW_HISTORY;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newHistorySchema = new Schema({
    user_id     : {type:String,ref: appConstant.DATA_TABLE.USER },
    new_id      : {type:String,ref:appConstant.DATA_TABLE.NEWS},
    created_at  : Number,
    updated_at  : Number,
})
/**
 * Validations
 */
/**
 * Pre hook
 */
newHistorySchema
    .pre('save', function(next) {
        const time = moment().valueOf()
        if(!this.created_at) this.created_at = time
        if(!this.updated_at) this.updated_at = time
        next()
    });
newHistorySchema
    .pre(['updateOne'], function(next) {
        this._update.$set.updated_at = moment().valueOf()
        next()
    });
module.exports = mongoose.model(TABLE_NEWS, newHistorySchema)
