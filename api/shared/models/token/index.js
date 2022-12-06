const moment = require('moment')
const schema = require('./schema')
const model = require('mongoose').model
const appConstant = require('../../helpers/constant.helper')
const table = appConstant.DATA_TABLE.TOKEN
const Model = model(table, schema)

const create = async (data) => {
    return new Promise((resolve, reject) => {
        Model
        .create(data)
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const findOneByField = async (data) => {
    return new Promise((resolve, reject) => {
        Model
        .findOne(data)
        .lean()
        .populate('user', '_id email status role')
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const removeByUser = async (user_id) => {
    return new Promise((resolve, reject) => {
        Model
        .deleteMany({user_id})
        .lean()
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const findById = async (id) => {
    return new Promise((resolve, reject) => {
        Model
        .findById(id)
        .lean()
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const update = async (id, data) => {
    return new Promise((resolve, reject) => {
        Model
        .findByIdAndUpdate(id, data)
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const removeExpired= async (id) => {
    return new Promise((resolve, reject) => {
        Model
        .deleteOne({user_id: id, updated_at: { $lt: moment().valueOf() - appConstant.TIME_EXP_ACCESS_TOKEN }})
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const countByUser = async (user_id) => {
    return new Promise((resolve, reject) => {
        Model
        .countDocuments({user_id})
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const remove = async (id) => {
    return new Promise((resolve, reject) => {
        Model
        .findByIdAndDelete(id)
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}


module.exports = {
    create,
    findOneByField,
    findById,
    update,
    removeExpired,
    countByUser,
    remove,
    removeByUser
}