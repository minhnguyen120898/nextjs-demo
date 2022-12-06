const moment = require('moment')
const Schema = require('mongoose').Schema;

const schema = new Schema({
    name            : { type: String, required: true},
    config          : { type: Array, required: true},
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
