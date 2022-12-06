const _ = require('lodash');
const newHistoryModel = require('./news.model')

const create = async (data) => {
    return new Promise((resolve, reject) => {
        newHistoryModel
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
        newHistoryModel
            .findByIdAndUpdate(id, data)
            .then(result => {
                resolve()
            })
            .catch(error => {
                reject(error)
            })
    })
}

const getById = async (id) => {
    return new Promise((resolve, reject) => {
        newHistoryModel
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

const getAll = async (query) => {
    return new Promise((resolve, reject) => {
        newHistoryModel
            .find(query)
            .lean()
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const getByPagination = async (query, pagination) => {
    return new Promise((resolve, reject) => {
        newHistoryModel
            .find(query)
            .sort({ created_at: -1 })
            .skip(pagination.limit * (pagination.page - 1))
            .limit(pagination.limit)
            .lean()
            .then(result => {
                newHistoryModel
                    .countDocuments(query)
                    .then(count => {
                        resolve({
                            meta: {
                                total: count,
                                page: pagination.page,
                                limit: pagination.limit
                            },
                            data: result
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

const remove = async (id) => {
    return new Promise((resolve, reject) => {
        newHistoryModel.findByIdAndRemove(id)
            .then(result => {
                resolve()
            })
            .catch(error => {
                reject(error)
            })
    })
}

const findOneByField = async (data) => {
    return new Promise((resolve, reject) => {
        newHistoryModel
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

module.exports = {
    create,
    update,
    getById,
    getAll,
    getByPagination,
    remove,
    findOneByField
}