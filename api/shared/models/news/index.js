const _ = require('lodash');
const newsModel = require('./news.model')

const create = async (data) => {
    return new Promise((resolve, reject) => {
        newsModel
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
        newsModel
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
        newsModel
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
        newsModel
            .find(query)
            .populate('from_user_id', '_id nick_name sex city birthday gol_point phone  gol_area gol_exp credit kyc type gol_point description main_photo')
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
        newsModel
            .find(query)
            .populate('from_user_id', '_id nick_name sex city birthday gol_point phone  gol_area gol_exp credit kyc type gol_point description main_photo')
            .sort({ created_at: -1 })
            .skip(pagination.limit * (pagination.page - 1))
            .limit(pagination.limit)
            .lean()
            .then(result => {
                newsModel
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
        newsModel.findByIdAndRemove(id)
            .then(result => {
                resolve()
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
    remove
}