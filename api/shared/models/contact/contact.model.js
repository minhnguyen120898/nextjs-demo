const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const TABLE_CONTACT = appConstant.DATA_TABLE.CONTACT;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    user_id     : { type: String, ref: appConstant.DATA_TABLE.USER },
    message     : String,
    replies     : [Object],
    reason      : [Object],
    created_at  : Number,
    updated_at  : Number,
    status      :{ type: Number, default:appConstant.CONTACT_STATUS.NEW },
    type        :{ type: Number, default:0 }//0 contact,1 block
})
/**
 * Pre hook
 */
contactSchema
    .pre('save', function(next) {
        const time = moment().valueOf()
        if(!this.created_at) this.created_at = time
        if(!this.updated_at) this.updated_at = time
        next()
    });
contactSchema
    .pre(['findOneAndUpdate'], function(next) {
        if(this._update)this._update.updated_at = moment().valueOf()
        next()
    });
module.exports = mongoose.model(TABLE_CONTACT, contactSchema)
