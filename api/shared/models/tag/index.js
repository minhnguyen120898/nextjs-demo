const Model = require('./schema')
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

const getById = async (id) => {
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

const getByPagination = async (query, pagination) => {
    return new Promise((resolve, reject) => {
        Model
        .find(query)
        .sort({updated_at: -1})
        .skip(pagination.limit*(pagination.page-1))
        .limit(pagination.limit)
        .lean()
        .then(result => {
            Model.countDocuments(query)
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
        Model
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
        Model
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

const getAll = async (query) => {
    return new Promise((resolve, reject) => {
        Model
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


module.exports = {
    create,
    getById,
    getByPagination,
    update,
    remove,
    getAll
}