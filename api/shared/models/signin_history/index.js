const schema = require('./schema')
const model = require('mongoose').model
const table = require('../../helpers/constant.helper').DATA_TABLE.SIGNIN_HISTORY
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

const getByUser = async (user_id, pagination) => {
    return new Promise((resolve, reject) => {
        Model
        .find({user: user_id})
        .sort({created_at: -1})
        .skip(pagination.limit*(pagination.page-1))
        .limit(pagination.limit)
        .lean()
        .then(result => {
            Model
            .countDocuments({user_id})
            .then(count => {
                resolve({
                    total: count,
                    page: pagination.page,
                    limit: pagination.limit,
                    docs: result
                })
            })
            .catch(error => {
                reject(error)
            })
        })
        .catch(error => {
            reject(error)
        })
    })
}

module.exports = {
    create,
    getByUser,
}