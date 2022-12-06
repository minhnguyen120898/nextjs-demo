const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const TABLE = appConstant.DATA_TABLE.WORK;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    status:{type:Number,default:0},//0 public,1 private
    title:String,
    eye_catching:String,
    description:String,
    category:[ {type:String,ref: appConstant.DATA_TABLE.CATEGORY }],
    tag:[ {type:String,ref: appConstant.DATA_TABLE.TAG }],
    video:String,
    meta_title:String,
    meta_description:String,
    //-----
    content_id:String,
    spot_name:String,
    explanatory_text:String,
    url:String,
    zip_code:String,
    address:String,
    address:String,
    phone:String,
    utilization_time:String,
    holiday:String,
    fee:String,
    parking:String,
    remark:String,
    stay_time:String,
    lat:Number,
    lng:Number,
    category1:String,
    image:String,
    is_featured:{type:Boolean,default:true},
    time_start:Number,
    time_end:Number,
    created_at: Number,
    updated_at: Number,
})
/**
 * Validations
 */
/**
 * Pre hook
 */
schema
    .pre('save', function (next) {
        const time = moment().valueOf()
        if (!this.created_at) this.created_at = time
        if (!this.updated_at) this.updated_at = time
        next()
    });
schema
    .pre(['findOneAndUpdate'], function (next) {
        if (this._update) this._update.updated_at = moment().valueOf()
        next()
    });
module.exports = mongoose.model(TABLE, schema)
