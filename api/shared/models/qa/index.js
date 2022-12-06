const qaModel = require('./qa.model')
const create = async (data) => {
    return new Promise((resolve, reject) => {
        qaModel
        .create(data)
        .then(result => {
            resolve(result._id.toString())
        })
        .catch(error => {
            reject(error)
        })
    })
}

const getById = async (id) => {
    return new Promise((resolve, reject) => {
        qaModel
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

const getByQuery = async (query, pagination) => {
    return new Promise((resolve, reject) => {
        qaModel
        .find(query)
        .sort({updated_at: -1})
        .skip(pagination.limit*(pagination.page-1))
        .limit(pagination.limit)
        .lean()
        .then(result => {
            qaModel.countDocuments(query)
            .then(count => {
                resolve({
                    total : count,
                    limit : pagination.limit,
                    page : pagination.page,
                    docs: result
                })
            })
        })
        .catch(error => {
            reject(error)
        })
    })
}

const update = async (id, data) => {
    return new Promise((resolve, reject) => {
        qaModel
        .findByIdAndUpdate(id, data)
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
        qaModel
        .findByIdAndRemove(id)
        .lean()
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
    getById,
    getByQuery,
    update,
    remove
}