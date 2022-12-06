const _ = require('lodash');
const contactModel = require('./contact.model')
const appConstant = require('../../helpers/constant.helper');

const create = async (data) => {
    return new Promise((resolve, reject) => {
        contactModel.create(data)
        .then(result => {
            resolve(result._id.toString())
        })
        .catch(error => {
            reject(error.message)
        })
    })
}

const update = async (id, data) => {
    return new Promise((resolve, reject) => {
        contactModel
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
        contactModel.findById(id).lean()
        .then(result => {
            resolve(result)
        })
        .catch(error => {
            reject(error.message)
        })
    })
}

const getByPagination = async (query, pagination) => {
    return new Promise((resolve, reject) => {
        contactModel
        .find(query)
        .sort({updated_at: -1})
        .skip(pagination.limit*(pagination.page-1))
        .limit(pagination.limit)
        .populate('user_id', 'avatar email nick_name')
        .populate('category_id', 'name')
        .lean()
        .then(result => {
            contactModel.countDocuments(query)
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

const replyContact = async (id, reply) => {
    return new Promise((resolve, reject) => {
        contactModel.findByIdAndUpdate(id, { $push: { replies: reply },status:appConstant.CONTACT_STATUS.REPLY })
        .then(result => {
            resolve()
        })
        .catch(error => {
            reject(error.message)
        })
    })
}

const getAllContacts = async () => {
    return new Promise((resolve, reject) => {
        contactModel
        .find({})
        .lean()
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

module.exports = {
    create,
    getByPagination,
    getById,
    replyContact,
    getAllContacts,
    update
}