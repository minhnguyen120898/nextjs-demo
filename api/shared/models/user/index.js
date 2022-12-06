const schema = require('./schema')
const model = require('mongoose').model
const appConstant = require('../../helpers/constant.helper');
const table = require('../../helpers/constant.helper').DATA_TABLE.USER
const Model = model(table, schema)
const _ = require('lodash');

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
        .findOne(_.merge(data,{status:{$ne:appConstant.USER.STATUS.DELETE}}))
        .lean()
        .then(result => {
            if (result && result.status == appConstant.USER.STATUS.DELETE) {
                resolve(null)
            } else {
                resolve(result)
            }
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
            if (result && result.status == appConstant.USER.STATUS.DELETE) {
                resolve(null)
            } else {
                resolve(result)
            }
        })
        .catch(error => {
            reject(error)
        })
    })
}

const findByQuery = async (query, pagination) => {
    return new Promise((resolve, reject) => {
        Model
        .find(query)
        .sort({ created_at: -1 })
        .skip(pagination.limit * (pagination.page-1))
        .limit(pagination.limit)
        .select('_id main_photo nick_name birthday city gol_point status level kyc')
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
    findByQuery
}