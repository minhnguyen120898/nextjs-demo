const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const TABLE_NEWS = appConstant.DATA_TABLE.NEWS;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title       : String,
    content     : String,
    status     : {type:Number,default:0},
    from_user_id     : {type:String,default:appConstant.ID_NEW_DEFAULT,ref: appConstant.DATA_TABLE.USER },
    to_user_id     : {type:String,default:appConstant.ID_NEW_DEFAULT,ref: appConstant.DATA_TABLE.USER },
    type            :Number,
    image:String,
    created_at  : Number,
    updated_at  : Number,
})
/**
 * Validations
 */
/**
 * Pre hook
 */
newsSchema
    .pre('save', function(next) {
        const time = moment().valueOf()
        if(!this.created_at) this.created_at = time
        if(!this.updated_at) this.updated_at = time
        next()
    });
newsSchema
    .pre(['updateOne'], function(next) {
        this._update.$set.updated_at = moment().valueOf()
        next()
    });
module.exports = mongoose.model(TABLE_NEWS, newsSchema)
