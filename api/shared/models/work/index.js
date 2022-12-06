const _ = require('lodash');
const model = require('./schema.model')

const create = async (data) => {
    return new Promise((resolve, reject) => {
        model
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
        model
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
        model
            .findById(id)
            .populate("category")
            .populate("tag")
            .lean()
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}


const findOneByField = async (data) => {
    return new Promise((resolve, reject) => {
        model
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

const getAll = async (query) => {
    return new Promise((resolve, reject) => {
        model
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
    console.log(query)
    query = _.merge(query, { is_delete: 0 })
    return new Promise((resolve, reject) => {
        model.aggregate([
            { $match: query },
            {
                $addFields: {
                    cid: { $toString: "$_id" }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    let: { 'category_id': '$category' },
                    pipeline: [
                        {
                            $addFields: {
                                "_id1": { $toString: "$_id" }
                            }
                        },
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $in: ["$_id1", "$$category_id"] }
                                        ]
                                }
                            }
                        },
                        {
                            $project:
                            {
                                _id: 1,
                                title: 1
                            }
                        }
                    ],
                    as: 'category'
                }
            },
            {
                $lookup: {
                    from: "tags",
                    let: { 'tag_id': '$tag' },
                    pipeline: [
                        {
                            $addFields: {
                                "_id1": { $toString: "$_id" }
                            }
                        },
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $in: ["$_id1", "$$category_id"] }
                                        ]
                                }
                            }
                        },
                        {
                            $project:
                            {
                                _id: 1,
                                title: 1
                            }
                        }
                    ],
                    as: 'tag'
                }
            },
            {
                $project: {
                    status:1,//0 public,1 private
                    title:1,
                    eye_catching:1,
                    description:1,
                    video:1,
                    meta_title:1,
                    meta_description:1,
                    //-----
                    content_id:1,
                    spot_name:1,
                    explanatory_text:1,
                    url:1,
                    zip_code:1,
                    address:1,
                    address:1,
                    phone:1,
                    utilization_time:1,
                    holiday:1,
                    fee:1,
                    parking:1,
                    remark:1,
                    stay_time:1,
                    lat:1,
                    lng:1,
                    category1:1,
                    image:1,
                    is_featured:1,
                    time_start:1,
                    time_end:1,
                    created_at: 1,
                    category:1,
                    tag: 1
                }
            },
            {
                $facet: {
                    datas: [
                        { $sort: { created_at: -1 } },
                        { $skip: pagination.limit * (pagination.page - 1) },
                        { $limit: pagination.limit }
                    ],
                    total: [
                        { $count: 'total' }
                    ]
                }
            }
        ]).then(result => {
            const total = result[0].total.length != 0 ? result[0].total[0].total : result[0].total.length
            resolve({
                total: total,
                page: pagination.page,
                limit: pagination.limit,
                docs: result[0].datas
            })

        })
            .catch(error => {
                reject(error)
            })
    })
}

const remove = async (id) => {
    return new Promise((resolve, reject) => {
        model.findByIdAndRemove(id)
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
    remove,
    findOneByField
}