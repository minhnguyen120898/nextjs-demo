const _pick = require('lodash/pick')
const moment = require('moment')
const validUtils = require('./validUtils.helper')
const userModel = require('../models/user')
const appConstant = require('./constant.helper')
const participantModel = require('../models/participant')
const conversationModel = require('../models/conversation')
const encodeDecode = require('../security/encodeDecode.security')
const fileHandle = require('./fileHandle.helper')
const messageModel = require('../models/message')
const notificationHandle = require("../../core/notification/notification.handler")
const localeUtils = require('../../shared/helpers/localesUtils.helper')

const startSocket = (io) => {
    io.on('connection', async (socket) => {
        console.log(`${socket.id} connected`)
        // user connect
        socket.on('golmo:user:connect', async (req, fn) => {
            console.log(req)
            console.log("connect",req.user_id)
            if (!req.user_id || !validUtils.mongoValidator(req.user_id)) {
                console.log("error",req.user_id)
                socket.emit('error', { ok: 0, message: 'invalid country id' })
                return
            }
            const user = await userModel.findById(req.user_id)
            socket.user = _pick(user, ['_id', 'nick_name', 'main_photo', 'role'])
            if (user.role !== appConstant.USER.ROLE.ADMIN) {
                socket.join(`room:user:${req.user_id}`)
                // const unseen = await participantModel.countUnseen(req.user_id)
                console.log("emit")
                socket.emit('golmo:user:connect', { ok: 1, message: null, unseen: 1 })
            }
            else {
                socket.join(`room:admin`)
                socket.emit('golmo:user:connect', { ok: 1, message: null, unseen: 1 })

                // const unseen = await participantModel.countUnseenByAdmin()
                // fn({ok: 1, message: null, unseen})
            }
        })

        // join conversation
        socket.on('golmo:conversation:list', async (req, fn) => {
            if (!socket.user) {
                fn({ ok: 0, message: 'invalid user' })
                socket.emit('error', { ok: 0, message: 'invalid user' })
                return
            }
            console.log(`list:conversation:${socket.user._id.toString()}`)
            socket.join(`list:conversation:${socket.user._id.toString()}`)
            socket.emit('golmo:conversation:list', { ok: 1, message: null, authen: encodeDecode.encode(`${req.conversation_id}:${socket.user._id.toString()}`, true) })
        })

        // join conversation
        socket.on('golmo:conversation:seen', async (req, fn) => {
            if (!socket.user) {
                socket.emit('error', { ok: 0, message: 'invalid user' })
                return
            }

            let participant = await participantModel.findOneByField({ conversation: req.conversation_id, user: socket.user._id.toString() })
            if (participant) {
                await participantModel.update(participant._id.toString(), { seen_at: moment().valueOf() })
            }
            io.in(`list:conversation:${socket.user._id.toString()}`).emit('golmo:conversation:seen', { seen_at: moment().valueOf(), conversation_id: req.conversation_id })

            socket.emit('golmo:conversation:seen', { ok: 1, message: null })
        })

        // join conversation
        socket.on('golmo:conversation:join', async (req, fn) => {
            console.log("join")
            console.log(socket.user)
            if (!socket.user) {
                socket.emit('error', { ok: 0, message: 'invalid user' })
                return
            }
            if (!req.conversation_id || !validUtils.mongoValidator(req.conversation_id)) {
                socket.emit('error', { ok: 0, message: 'invalid conversation id' })
                return
            }
            const conversation = await conversationModel.findById(req.conversation_id)
            if (!conversation || (socket.user.role !== appConstant.USER.ROLE.ADMIN && !conversation.participants.includes(socket.user._id.toString()))) {
                socket.emit('error', { ok: 0, message: 'invalid conversation id' })
                return
            }
            socket.join(`room:conversation:${req.conversation_id}`)
            socket.emit('golmo:conversation:join', { ok: 1, message: null, authen: encodeDecode.encode(`${req.conversation_id}:${socket.user._id.toString()}`, true) })
        })
        // send message
        socket.on('golmo:conversation:message', async (req, fn) => {
            console.log(req.authen)
            if (!req.authen) {
                socket.emit('error', { ok: 0, message: 'invalid authen' })
                return
            }
            console.log(req)
            const authen = encodeDecode.decode(req.authen, true)
            console.log(authen)
            const conversation_id = authen.split(':')[0]
            const user_id = authen.split(':')[1]
            console.log(validUtils.mongoValidator(conversation_id) && validUtils.mongoValidator(user_id) && Object.values(appConstant.CONVERSATION.MESSAGE).indexOf(req.type) >= 0)
            console.log(conversation_id)
            console.log(user_id)
            if (validUtils.mongoValidator(conversation_id) && validUtils.mongoValidator(user_id) && Object.values(appConstant.CONVERSATION.MESSAGE).indexOf(req.type) >= 0) {
                if (req.type === appConstant.CONVERSATION.MESSAGE.IMAGE) {
                    if (!validUtils.isBase64(req.message)) return
                    let base64 = req.message.split(',')
                    let extension = base64[0].split(';')[0].split('/')[1]
                    let name = `${conversation_id}${moment().valueOf()}.${extension}`;
                    req.message = await fileHandle.upload('en', `conversations`, name, base64[1])
                }
                let participants = await participantModel.findAllByField({ conversation: conversation_id });

                for (let i = 0; i < participants.length; i++) {
                    if (participants[i].user._id.toString() !== user_id) {
                    console.log(`list:conversation:${participants[i].user._id.toString()}`)
                    notificationHandle.sendNotificationToUser(participants[i].user._id.toString(), {
                        title: localeUtils.notificationMessage("ja").TITLE_MESSAGE.replace("#USER#", socket.user.nick_name),
                        body: req.message,
                        type: req.type,
                        data:{},
                        conversation_id: conversation_id
                    })
                }
                    io.in(`list:conversation:${participants[i].user._id.toString()}`).emit('golmo:conversation:message', { user: socket.user, message: req.message, type: req.type, conversation_id })
                    // }
                }

                io.in(`room:conversation:${conversation_id}`).emit('golmo:conversation:message', { user: socket.user, message: req.message, type: req.type, conversation_id })
                console.log({
                    conversation: conversation_id,
                    user: user_id,
                    message: req.message,
                    type: req.type,
                })
                messageModel.create({
                    conversation: conversation_id,
                    user: user_id,
                    message: req.message,
                    type: req.type,
                })
            }
        })
        // error
        socket.on('error', (error) => {
            console.log(error)
        });

        socket.on('disconnect', async () => {
            console.log(`client ${socket.id} disconnect`)
        })
    })
}

module.exports = {
    startSocket
};