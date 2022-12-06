const moment = require('moment')
const appConstant = require('../../helpers/constant.helper');
const Schema = require('mongoose').Schema;

const schema = new Schema({
    user_name        : { type: String},
    password  : { type: String},
    email           : { type: String },
    role            : { type: Number, enum: Object.values(appConstant.USER.ROLE)},
    first_name      : { type: String },
    last_name       : { type: String },
    first_name_kata : { type: String },
    last_name_kata  : { type: String },
    company_name    : { type: String },
    verify_code      : { type: String },
    address        : { type: String },
    prefectuures: String,
    city: String,
    bulding_name: String,
    phone_number           : { type: String },
    zip_code: String,
    avatar         : { type: String },
    intro         : { type: String },
    status          : { type: Number, enum: Object.values(appConstant.USER.STATUS)},
    sex             : { type: Number, enum: Object.values(appConstant.USER.SEX) },
    operation_status:String,
    total_rating    : { type: Number },
    average_rating        : { type: Number },
    payment_method        : { type: Number },
    birthday        : { type: Number },
    intro_title         : { type: String },
    experience_years        : { type: Number },
    unit_price    : { type: Number },
    description_for_price         : { type: String },
    operation_condition    : { type: Number },
    history    : { type: Number },
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
