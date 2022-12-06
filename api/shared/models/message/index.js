const schema = require('./schema')
const model = require('mongoose').model
const table = require('../../helpers/constant.helper').DATA_TABLE.MESSAGE
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
        .sort({created_at: -1})
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

const getByConversation = async (query, pagination) => {
    return new Promise((resolve, reject) => {
        Model
        .find(query)
        .sort({created_at: -1})
        .skip(pagination.limit*(pagination.page-1))
        .limit(pagination.limit)
        .select('user message type created_at')
        .populate('user', 'nick_name main_photo')
        .lean()
        .then(result => {
            Model.countDocuments(query)
            .then(count => {
                resolve({
                    total: count,
                    page: pagination.page,
                    limit: pagination.limit,
                    docs: result
                })
            })
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
    findById,
    getByConversation
}