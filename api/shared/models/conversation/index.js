const schema = require('./schema')
const model = require('mongoose').model
const table = require('../../helpers/constant.helper').DATA_TABLE.CONVERSATION
const Model = model(table, schema)

const create = async (data) => {
    return new Promise((resolve, reject) => {
        Model
        .create(data)
        .then(result => {
            resolve(result._id.toString())
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
        .then(() => {
            resolve()
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

module.exports = {
    create,
    update,
    findOneByField,
    findById
}