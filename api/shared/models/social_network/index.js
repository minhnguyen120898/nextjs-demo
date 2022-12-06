const socialNetworkModel = require('./social_network.model')

const create = async (data) => {
    return new Promise((resolve, reject) => {
        socialNetworkModel
        .create(data)
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const update = async (query, data) => {
    return new Promise((resolve, reject) => {
        socialNetworkModel
        .findOneAndUpdate(query, data, {upsert: true})
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const findByUserId = async (user_id, type) => {
    return new Promise((resolve, reject) => {
        socialNetworkModel
        .findOne({user_id, type})
        .lean()
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const findOneByQuery = async (query) => {
    return new Promise((resolve, reject) => {
        socialNetworkModel
        .findOne(query)
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
    findByUserId,
    findOneByQuery
}