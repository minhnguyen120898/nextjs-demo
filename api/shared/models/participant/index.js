const schema = require('./schema')
const model = require('mongoose').model
const appConstant = require('../../helpers/constant.helper');

const table = require('../../helpers/constant.helper').DATA_TABLE.PARTICIPANT
const Model = model(table, schema)

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

const findAllByField = async (data) => {
    return new Promise((resolve, reject) => {
        Model
            .find(data)
            .select('user seen_at delete_at created_at')
            .populate('user', '_id nick_name main_photo')
            .lean()
            .then(result => {
                resolve(result)
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
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const getByAdmin = async (user, pagination) => {
    return new Promise((resolve, reject) => {
        Model
            .aggregate([

                // { $match: {type: appConstant.CONVERSATION.ADMIN.USER} },
                {
                    $group: {
                        _id: "$conversation",
                        conversation: { $first: "$conversation" },
                        updated_at: { $max: "$updated_at" }
                    }
                },
                {
                    $addFields: {
                        cid: { $toObjectId: "$conversation" }
                    }
                },
                {
                    $lookup: {
                        from: "messages",
                        let: { "conversation": "$conversation" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: ["$conversation", "$$conversation"] }
                                            ]
                                    }
                                }
                            },
                            { $sort: { created_at: -1 } },
                            { $limit: 1 },
                            {
                                $project:
                                {
                                    _id: 1,
                                    user: 1,
                                    message: 1,
                                    type: 1,
                                    created_at: 1
                                }
                            }
                        ],
                        as: 'messages'
                    }
                },
                {
                    $addFields: {
                        message: { $arrayElemAt: ["$messages", 0] }
                    }
                },
                {
                    $addFields: {
                        seen: { $arrayElemAt: ["$messages.created_at", 0] }
                    }
                },
                { $sort: { seen: -1, created_at: -1 } },
                { $skip: pagination.limit * (pagination.page - 1) },
                { $limit: pagination.limit },
                {
                    $lookup:
                    {
                        from: 'conversations',
                        localField: 'cid',
                        foreignField: '_id',
                        as: 'conversations'
                    }
                },
                {
                    $lookup:
                    {
                        from: 'participants',
                        let: { "conversation": "$conversation" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: ["$conversation", "$$conversation"] }
                                            ]
                                    },

                                }
                            },
                            {
                                $addFields: {
                                    uid: { $toObjectId: "$user" }
                                }
                            },
                            {
                                $lookup:
                                {
                                    from: 'users',
                                    let: { "user_id": "$uid" },
                                    pipeline: [
                                        {
                                            $match:
                                            {
                                                $expr:
                                                {
                                                    $and:
                                                        [
                                                            { $eq: ["$_id", "$$user_id"] }
                                                        ]
                                                }
                                            }
                                        },
                                        {
                                            $project:
                                            {
                                                _id: 1,
                                                nick_name: 1,
                                                main_photo: 1
                                            }
                                        }
                                    ],
                                    as: 'user'
                                }
                            },
                            {
                                $project:
                                {
                                    user: { $arrayElemAt: ["$user", 0] },
                                    _id: {
                                        _id: {
                                            $arrayElemAt: ["$user._id", 0]
                                        }
                                    }
                                }
                            }
                        ],
                        as: 'participants'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        conversation: { $arrayElemAt: ["$conversations", 0] },
                        participants: {
                            $filter: {
                                input: "$participants",
                                as: "participants",
                                cond: { $ne: ["$$participants._id", {}] }
                            }
                        },
                        seen_at: 1,
                        seen: 1,
                        message: 1
                    }
                }
            ])
            .then(result => {
                console.log(result.length)
                Model.countDocuments({ user }).then(amount => {
                    resolve({
                        total: amount,
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

const getByUser = async (user, pagination) => {
    return new Promise((resolve, reject) => {
        Model
            .aggregate([
                { $match: { user, type: appConstant.CONVERSATION.ADMIN.USER, is_delete: { $ne: 1 } } },
                {
                    $addFields: {
                        cid: { $toObjectId: "$conversation" }
                    }
                },
                {
                    $lookup: {
                        from: "messages",
                        let: { "conversation1": "$conversation","delete_at":"$delete_at" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: ["$conversation", "$$conversation1"] },
                                                {$lt:["$$delete_at","$created_at"]}
                                            ]
                                    }
                                }
                            },
                            { $sort: { created_at: -1 } },
                            { $limit: 1 },
                            {
                                $project:
                                {
                                    _id: 1,
                                    user: 1,
                                    message: 1,
                                    type: 1,
                                    created_at: 1
                                }
                            }
                        ],
                        as: 'messages'
                    }
                },
                {
                    $addFields: {
                        message: { $arrayElemAt: ["$messages", 0] }
                    }
                },
                {
                    $addFields: {
                        seen: { $arrayElemAt: ["$messages.created_at", 0] }
                    }
                },
                { $sort: { seen: -1, created_at: -1 } },
                { $skip: pagination.limit * (pagination.page - 1) },
                { $limit: pagination.limit },
                {
                    $lookup:
                    {
                        from: 'conversations',
                        localField: 'cid',
                        foreignField: '_id',
                        as: 'conversations'
                    }
                },
                {
                    $lookup:
                    {
                        from: 'participants',
                        let: { "conversation": "$conversation" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: ["$conversation", "$$conversation"] }
                                            ]
                                    },

                                }
                            },
                            {
                                $addFields: {
                                    uid: { $toObjectId: "$user" }
                                }
                            },
                            {
                                $addFields: {
                                    uidc: { $toObjectId: user }
                                }
                            },
                            {
                                $lookup:
                                {
                                    from: 'users',
                                    let: { "user_id": "$uid", "user_id_current": "$uidc" },
                                    pipeline: [
                                        {
                                            $match:
                                            {
                                                $expr:
                                                {
                                                    $and:
                                                        [
                                                            { $eq: ["$_id", "$$user_id"] },
                                                            { $ne: ["$_id", "$$user_id_current"] }
                                                        ]
                                                }
                                            }
                                        },
                                        {
                                            $project:
                                            {
                                                _id: 1,
                                                nick_name: 1,
                                                main_photo: 1
                                            }
                                        }
                                    ],
                                    as: 'user'
                                }
                            },
                            {
                                $project:
                                {
                                    user: { $arrayElemAt: ["$user", 0] },
                                    _id: {
                                        _id: {
                                            $arrayElemAt: ["$user._id", 0]
                                        }
                                    }
                                }
                            }
                        ],
                        as: 'participants'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        conversation: { $arrayElemAt: ["$conversations", 0] },
                        participants: {
                            $filter: {
                                input: "$participants",
                                as: "participants",
                                cond: { $ne: ["$$participants._id", {}] }
                            }
                        },
                        seen_at: 1,
                        seen: 1,
                        message: 1
                    }
                }
            ])
            .then(result => {
                Model.countDocuments({ user }).then(amount => {
                    resolve({
                        total: amount,
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

const countUnseen = async (user) => {
    return new Promise((resolve, reject) => {
        Model
            .aggregate([
                { $match: { user } },
                {
                    $lookup: {
                        from: "messages",
                        localField: 'conversation',
                        foreignField: 'conversation',
                        as: 'messages'
                    }
                },
                {
                    $addFields: {
                        message: { $arrayElemAt: ["$messages", 0] }
                    }
                },
                {
                    $addFields: {
                        seen: { "$cond": [{ "$lt": ["$seen_at", "$message.created_at"], "$ne": ["$user", "$message.user"] }, 0, 1] }
                    }
                }
            ])
            .then(result => {
                resolve(result.filter(e => e.seen === 0).length)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const updateMany = async (query, data) => {
    return new Promise((resolve, reject) => {
        Model
            .updateMany(query, { $set: data })
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
    findOneByField,
    findAllByField,
    findById,
    getByUser,
    countUnseen,
    getByAdmin,
    updateMany
}