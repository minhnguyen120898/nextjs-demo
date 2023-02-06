'use strict';
const _ = require("lodash");
const moment = require("moment");
const userModel = require('../../shared/models/user')

const localesUtils = require('../../shared/helpers/localesUtils.helper')
const validUtils = require('../../shared/helpers/validUtils.helper');
const appConstant = require('../../shared/helpers/constant.helper')
const encodeDecode = require('../../shared/security/encodeDecode.security')
const participantModel = require('../../shared/models/participant')
const messageModel = require('../../shared/models/message')
const fileHandle = require('../../shared/helpers/fileHandle.helper')
const passwordManagement = require('../../shared/security/passGenerator.security')

const conversationModel = require('../../shared/models/conversation')

/**
 * @method GET
 * @path /user/profile
 * @param locals
 * @return success message
 */
const profile = async (locals) => {
    try {
        const user = await userModel.findById(locals.uid)
        return _.omit(_.merge(user,{}), ["password", "verify_code", 'auth_code'])
    } catch (error) {
        throw Error(error.message || error)
    }
}

/**
 * @method PUT
 * @path /user/profile
 * @param locals
 * @return success message
 */
const updateProfile = async (locals, body) => {
    try {
        const user = await userModel.findById(locals.uid)
        if (body.avatar) {
            let base64 = body.avatar.split(',')
            let extension = base64[0].split(';')[0].split('/')[1]
            let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
            body.avatar = await fileHandle.uploadToStorage( name, base64[1])
        }
        if (body.password) {
            if (! await passwordManagement.comparePassword(encodeDecode.decode(body.old_password), user.password)) {
                throw Error(localesUtils.userMessage(locals.lang).LOGIN.PASSWORD_IS_NOT_VALID)
            }
            body.password = await passwordManagement.hashPasswordMd5(encodeDecode.decode(body.password))
        }
        if (body.email) {
            if (! await passwordManagement.comparePassword(encodeDecode.decode(body.old_password), user.password)) {
                throw Error(localesUtils.userMessage(locals.lang).LOGIN.PASSWORD_IS_NOT_VALID)
            }
            const userWithEmail = await userModel.findOneByField({ email: body.email })
            if (userWithEmail && userWithEmail._id.toString() != user._id.toString()) {
                throw Error(localesUtils.userMessage(locals.lang).REGISTER.EMAIL_IS_EXIST)
            }
        }

        await userModel.update(locals.uid, _.merge(body, { status: user.status === appConstant.USER.STATUS.ACTIVED ? appConstant.USER.STATUS.UPDATED : user.status }))

        return {
            message: localesUtils.userMessage(locals.lang).UPDATE.INFO_SUCCESS
        }
    } catch (error) {
        console.log(error)
        throw Error(error.message || error)
    }
}


/**
 * @method GET
 * @path /user/users/:user_id
 * @param locals
 * @param user_id
 * @return success message
 */
const getUserById = async (locals, user_id) => {
    console.log(user_id)
    const user = await userModel.findById(user_id)
    if (user.role === appConstant.USER.ROLE.ADMIN) {
        throw Error(localesUtils.userMessage(locals.lang).LOGIN.USER_DOES_NOT_EXIST)
    }

    return _.omit(user, ["password", "verify_code", 'auth_code'])
}

/**
 * @method GET
 * @path /user/conversations
 * @param locals
 * @param query
 * @return success message
 */
const getConversations = async (locals, query) => {
    const pagination = validUtils.paginationValidator(query)
    console.log(pagination)
    let result = await participantModel.getByUser(locals.uid, pagination, appConstant.CONVERSATION.ADMIN.USER)
    if (pagination.page == 1) {
        let ownerConversation = await getConversationAdmin(locals, appConstant.USER.ROLE.OWNER, appConstant.CONVERSATION.ADMIN.OWNER)
        result.docs = [ownerConversation].concat(result.docs);
        let adminConversation = await getConversationAdmin(locals, appConstant.USER.ROLE.ADMIN, appConstant.CONVERSATION.ADMIN.ADMIN);
        result.docs = [adminConversation].concat(result.docs);
    }
    return result;
}

/**
 * @method PUT
 * @path /user/conversations/:conversation_id
 * @param locals
 * @param query
 * @return success message
 */
const deleteConversationsById = async (locals, conversation_id) => {
    let participant = await participantModel.findOneByField({ conversation: conversation_id, user: locals.uid })
    if (!participant) {
        throw Error(localesUtils.userMessage(locals.lang).GET.CONVERSATION_ID_NOT_FOUND)
    }
    await participantModel.update(participant._id.toString(), { delete_at: moment().valueOf(), is_delete: 1 })
    return { message: localesUtils.userMessage(locals.lang).REMOVE.SUCCESS };
}

/**
 * @method GET
 * @path /user/conversations/:conversation_id
 * @param locals
 * @param query
 * @return success message
 */
const getConversationById = async (locals, conversation_id, query) => {
    if (!validUtils.mongoValidator(conversation_id)) {
        throw Error(localesUtils.userMessage(locals.lang).GET.CONVERSATION_ID_NOT_FOUND)
    }
    let conversation = await conversationModel.findById(conversation_id)
    if (!conversation) {
        throw Error(localesUtils.userMessage(locals.lang).GET.CONVERSATION_ID_NOT_FOUND)
    }
    const pagination = validUtils.paginationValidator(query)
    conversation.participants = await participantModel.findAllByField({ conversation: conversation_id })
    let participant = _.find(conversation.participants, (o) => {
        return o.user._id.toString() === locals.uid
    })

    let query1 = {
        conversation: conversation_id
    }

    if (participant) {
        query1.created_at = { $gt: participant.delete_at }
    }
    console.log(query1)
    conversation.messages = await messageModel.getByConversation(query1, pagination)
    console.log(conversation.messages)
    return conversation
}

/**
 * @method POST
 * @path /user/conversation/create
 * @param locals
 * @param body
 * @return success message
 */
const createConversation = async (locals, body) => {
    if (!validUtils.mongoValidator(body.user_id) || body.user_id === locals.uid) {
        throw Error(localesUtils.userMessage(locals.lang).GET.CONVERSATION_ID_NOT_FOUND)
    }
    const user = await userModel.findById(body.user_id)
    const userCurrent = await userModel.findById(locals.uid)

    if (!user) {
        throw Error(localesUtils.userMessage(locals.lang).LOGIN.USER_DOES_NOT_EXIST)
    }

    // let blockData = await blockModel.getAll({ $or: [{ user_id: locals.uid, user_blocked: body.user_id }, { user_blocked: locals.uid, user_id: body.user_id }] });
    // if (blockData.length > 0) {
    //     throw Error(localesUtils.userMessage(locals.lang).LOGIN.USER_DOES_NOT_EXIST)
    // }


    let userAdmin;
    let role;
    if (user.role !== appConstant.USER.ROLE.USER) {
        userAdmin = userCurrent._id.toString();
        role = user.role;
    }

    if (userCurrent.role !== appConstant.USER.ROLE.USER) {
        userAdmin = user._id.toString();
        role = userCurrent.role;
    }

    let conversation;
    if (userAdmin) {
        conversation = await conversationModel.findOneByField({ participants: [userAdmin], category: role })
    } else {
        conversation = await conversationModel.findOneByField({ $or: [{ participants: [locals.uid, body.user_id] }, { participants: [body.user_id, locals.uid] }] })
    }

    let conversation_id = conversation ? conversation._id.toString() : null
    if (!conversation) {
        if (userAdmin) {

            conversation_id = await conversationModel.create({
                participants: [userAdmin],
                category: role,
                type: 0
            })

            // if (body.type == appConstant.CONVERSATION.TYPE.SINGLE) {
            await participantModel.create({
                conversation: conversation_id,
                user: locals.uid,
                seen_at: 0,
                type: role == appConstant.USER.ROLE.ADMIN ? appConstant.CONVERSATION.ADMIN.ADMIN : appConstant.CONVERSATION.ADMIN.OWNER
            })

            await participantModel.create({
                conversation: conversation_id,
                user: body.user_id,
                seen_at: 0,
                type: role == appConstant.USER.ROLE.ADMIN ? appConstant.CONVERSATION.ADMIN.ADMIN : appConstant.CONVERSATION.ADMIN.OWNER
            })
            // }
        } else {
            conversation_id = await conversationModel.create({
                participants: [locals.uid, body.user_id],
                category: appConstant.USER.ROLE.USER,
                type: 0
            })
            // if (body.type == appConstant.CONVERSATION.TYPE.SINGLE) {
            await participantModel.create({
                conversation: conversation_id,
                user: locals.uid,
                seen_at: 0
            })

            await participantModel.create({
                conversation: conversation_id,
                user: body.user_id,
                seen_at: 0
            })
            // }
        }

    }

    await participantModel.updateMany({ conversation: conversation_id }, { is_delete: 0 })

    return {
        message: localesUtils.userMessage(locals.lang).CREATE.SUCCESS,
        _id: conversation_id
    }
}

const getConversationAdmin = async (locals, role, type) => {
    let conversation = await conversationModel.findOneByField({ participants: [locals.uid], category: role })
    let userAdmin = await userModel.findOneByField({ role: role });
    console.log(locals)
    console.log(role, type)
    console.log("1234567865432123456543")
    if (!conversation) {
        let conversation_id = await conversationModel.create({
            participants: [locals.uid],
            category: role,
            type: 0
        })

        await participantModel.create({
            conversation: conversation_id,
            user: locals.uid,
            seen_at: 0,
            type: type
        })

        await participantModel.create({
            conversation: conversation_id,
            user: userAdmin._id.toString(),
            seen_at: 0,
            type: type
        })
    }

    conversation = await conversationModel.findOneByField({ participants: [locals.uid], category: role })

    let participant = await participantModel.findAllByField({ conversation: conversation._id.toString() });
    let participantUser = _.find(participant, (o) => {
        return o.user._id == locals.uid
    })
    let message = await messageModel.findOneByField({ conversation: conversation._id.toString() });

    let count = await messageModel.countData({ created_at: { $gt: (participantUser ? participantUser.seen_at : 0) }, conversation: conversation._id.toString() })
    console.log("item113432", count)
    return {
        count,
        seen_at: participantUser ? participantUser.seen_at : 0,
        is_admin: true,
        participants: [
            {
                user: userAdmin
            }
        ],
        message: message ? message : {
            message: "運営へのご質問等お声がけください。",
            user: userAdmin._id.toString()
        },
        conversation
    }
}

//user/list
const getListUser = async (query) => {
    let q = {};
    const pagination = validUtils.paginationValidator(query);
    if (query.search) {
        q.nick_name = RegExp(query.search);
    }
    if (query.status) {
        q.status = Number(query.status);
    }
    if (query.status_coach) {
        q.status_coach = Number(query.status_coach);
    }

    const members = await userModel.findByQuery(q, pagination)

    return members
}

//user/admin/:userId
const adminUpdateUser = async (locals, userId, body) => {
    const user = await userModel.findById(userId)
    if (user.role === appConstant.USER.ROLE.ADMIN) {
        throw Error(localesUtils.userMessage(locals.lang).LOGIN.USER_DOES_NOT_EXIST)
    }

    if (body.declaration && body.declaration.length > 0) {
        for (let i = 0; i < body.declaration.length; i++) {
            if (validUtils.isBase64(body.declaration[i].url)) {
                let base64 = body.declaration[i].url.split(',')
                let extension = base64[0].split(';')[0].split('/')[1]
                let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
                body.declaration[i].url = await fileHandle.upload(locals.lang, name, base64[1])
            }

        }

    }

    if (body.life_plan && body.life_plan.length > 0) {
        for (let i = 0; i < body.life_plan.length; i++) {
            if (validUtils.isBase64(body.life_plan[i].url)) {
                let base64 = body.life_plan[i].url.split(',')
                let extension = base64[0].split(';')[0].split('/')[1]
                let name = `user${locals.uid}${moment().valueOf()}.${extension}`;
                body.life_plan[i].url = await fileHandle.upload(locals.lang, name, base64[1])
            }

        }

    }

    console.log(body)

    if (body.credit) {
        let keys = Object.keys(body.credit);
        for (let i = 0; i < keys.length; i++) {
            body.credit[keys[i]] = encodeDecode.encode(encodeDecode.decode(body.credit[keys[i]]), true)
        }
    }

    await userModel.update(userId, body)
    return { message: localesUtils.userMessage(locals.lang).UPDATE.INFO_SUCCESS }
}

/**
 * @method GET
 * @path /user/admin/:user_id
 * @param locals
 * @param user_id
 * @return success message
 */
const adminGetUserById = async (locals, user_id) => {
    console.log(user_id)
    const user = await userModel.findById(user_id)
    if (user.role === appConstant.USER.ROLE.ADMIN) {
        throw Error(localesUtils.userMessage(locals.lang).LOGIN.USER_DOES_NOT_EXIST)
    }
    return _.omit(user, ["password", "verify_code", 'auth_code'])
}

/**
 * @method GET
 * @path /user/admin/conversations
 * @param locals
 * @param query
 * @return success message
 */
const adminGetConversations = async (locals, query) => {
    const user = await userModel.findById(locals.uid);
    const pagination = validUtils.paginationValidator(query)
    let listUserByRole = await userModel.getUsers({ role: user.role })
    let ids = [];
    _.forEach(listUserByRole, (o) => {
        ids.push(o._id.toString())
    })
    let result = await participantModel.getByAdmin(ids, pagination, user.role == appConstant.USER.ROLE.ADMIN ? appConstant.CONVERSATION.ADMIN.ADMIN : appConstant.CONVERSATION.ADMIN.OWNER)
    return result;
}


module.exports = {
    profile,
    updateProfile,
    getUserById,
    getConversations,
    getConversationById,
    createConversation,
    getListUser,
    adminUpdateUser,
    adminGetUserById,
    adminGetConversations,
    deleteConversationsById
}