const _ = require('lodash');
const notificationModel = require('./notification.model')

const create = async (data) => {
    return new Promise((resolve, reject) => {
        notificationModel
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
        notificationModel
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
        notificationModel
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
        notificationModel
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

const remove = async (id) => {
    return new Promise((resolve, reject) => {
        notificationModel.findByIdAndRemove(id)
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
    remove
}