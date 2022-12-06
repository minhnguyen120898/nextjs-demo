const contactModel = require('../../shared/models/contact')
const _ = require('lodash');
const localeUtils = require('../../shared/helpers/localesUtils.helper')
const validUtils = require('../../shared/helpers/validUtils.helper')
const userModel = require("../../shared/models/user")
const constantHelper = require("../../shared/helpers/constant.helper")
const notificationHandler = require("../notification/notification.handler")
const newModel = require("../../shared/models/news")
const appConstant = require('../../shared/helpers/constant.helper')
const moment=require("moment")

/**
 * @method POST
 * @path /contact
 * @param locals default is english
 * @param body
 * @return success message
 */

const create = async (locals, body) => {

    await contactModel.create(_.merge(body, { user_id: locals.uid }))
    return {
        message: localeUtils.contactMessage(locals.lang).CREATE_SUCCESS
    }
}

/**
 * @method POST
 * @path /contact/block
 * @param locals default is english
 * @param body
 * @return success message
 */

const removeUser = async (locals, body) => {
    console.log(body)
    await contactModel.create(_.merge(body, { user_id: locals.uid, type: 1 }))
    await userModel.update(locals.uid, { status: constantHelper.USER.STATUS.DELETE })
    return {
        message: localeUtils.contactMessage(locals.lang).REMOVE_SUCCESS
    }
}

/**
 * @method GET
 * @path /contact/:contact_id
 * @param locals default is english
 * @param id contact
 * @return data
 */
const getById = async (locals, id) => {
    const contact = await contactModel.getById(id)
    if (!contact) {
        throw Error(localeUtils.contactMessage(locals.lang).NOT_FOUND)
    }
    return contact
}

/**
 * @method get
 * @path /contact
 * @param query
 * @return data
 */
const getList = async (locals, query) => {
    console.log(query)
    const pagination = validUtils.paginationValidator(query)
    let q = { user_id: locals.uid }
    const contact = await contactModel.getByPagination(q, pagination)
    return contact
}

/**
 * @method get
 * @path /contact/admin
 * @param query
 * @return data
 */
const getListcontactAdmin = async (locals, query) => {
    let q = {};
    if (query.search) {
        const pagination = validUtils.paginationValidator({});
        console.log("dgdfgdg")
        const members = await userModel.findByQuery({ nick_name: RegExp(query.search) }, pagination)
        if (_.isEmpty(members)) {
            return {
                total: 0,
                limit: pagination.limit,
                page: pagination.page,
                docs: []
            }
        }
        let member_ids = []
        for (let member of members.docs) {
            member_ids.push(member._id.toString())
        }
        q = { user_id: { $in: member_ids } }
    }
    const pagination = validUtils.paginationValidator(query)

    const contact = await contactModel.getByPagination(q, pagination)
    return contact
}

/**
 * @method put
 * @path /contact/admin/reply
 * @param query
 * @return data
 */

const replyContact = async (locals, id, body) => {
    const user = await userModel.findById(locals.uid)
   
    const contact = await contactModel.getById(id)
    if(!contact){
        throw Error(localeUtils.contactMessage(locals.lang).CONTACT.CONTACT_DOES_NOT_EXIST)
    }
    await contactModel.replyContact(contact._id.toString(), {
        email: user.email,
        content: body.content,
        created_at: moment().valueOf()
    })
   let dataNotification = {
        title: localeUtils.notificationMessage(locals.lang).TITLE_CONTACT,
        body: body.contact,
        data: {
            type: appConstant.NOTIFICATION.NEWS
        }
    }
    newModel.create({
        title: dataNotification.title,
        content: dataNotification.body,
        from_user_id: appConstant.ID_NEW_DEFAULT,
        to_user_id: contact.user_id
    })
    notificationHandler.sendNotificationToUser(contact.user_id, dataNotification);

    return {
        message: localeUtils.contactMessage(locals.lang).CREATE_SUCCESS
    }
}

/**
 * @method PUT
 * @path /contact/:contact_id
 * @param locals default is english
 * @param id contact
 * @return data
 */
const updateById = async (locals, id,body) => {
    const contact = await contactModel.getById(id)
    if (!contact) {
        throw Error(localeUtils.contactMessage(locals.lang).NOT_FOUND)
    }
    await contactModel.update(id,body)
    return {
        message: localeUtils.contactMessage(locals.lang).UPDATE_SUCCESS
    }}

module.exports = {
    getList,
    create,
    getById,
    getListcontactAdmin,
    removeUser,
    replyContact,
    updateById
}