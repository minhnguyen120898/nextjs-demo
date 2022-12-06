const _ = require('lodash');
const Imap = require('imap');
const configCommon = require('./configCommon.helper');

const configEmail = configCommon.getEmail()
const emailAddress = configEmail.emailAddress;
const passWord = configEmail.password;
const hostImap = configEmail.hostImap;
const contactModel = require('../models/contact')

const imap = new Imap({
    user: emailAddress,
    password: passWord,
    host: hostImap,
    port: 993,
    tls: true,
    connTimeout: 10000, // Default by node-imap
    authTimeout: 5000, // Default by node-imap
});

async function openInbox(cb) {
    imap.openBox('INBOX', false, cb)
}

async function getListContact() {
    const contacts = await contactModel.getAllContacts()
    return _.orderBy(contacts || [], ['created_at'], ['desc']);
}

async function bodyGmail(dataBody) {
    const textStart = 'Content-Transfer-Encoding: '
    const start = await dataBody.indexOf(textStart);
    if (start !== -1) {
        const encodeTypeStart = await dataBody.indexOf(textStart);
        const encodeTypeEnd = await dataBody.indexOf('\r\n\r\n', encodeTypeStart)
        const encodeType = dataBody.substring(encodeTypeStart + textStart.length, encodeTypeEnd)
        let end
        let messageView
        if (encodeType.trim() === 'base64') {
            const endBase64 = await dataBody.indexOf('=', encodeTypeEnd);
            const message = dataBody.substring(encodeTypeEnd, endBase64 + 1)
            const buf = Buffer.from(message, 'base64').toString();
            end = await buf.indexOf('\r\n\r\n', 0);
            messageView = buf.substring(0, end)
        } else {
            end = await dataBody.indexOf('\r\n\r\n', encodeTypeEnd + 4);
            const messageReplyOfUser = dataBody.substring(encodeTypeEnd + 4, end);
            const messageUtf8 = messageReplyOfUser.split('=').join('\\x')
            messageView = utf8ToText(messageUtf8);
        }
        return messageView
    }
    return null
}

async function bodyAmazon(dataBody) {
    const textStart = 'Content-Transfer-Encoding: ';
    const start = await dataBody.indexOf(textStart);
    if (start !== -1) {
        const encodeTypeStart = await dataBody.indexOf(textStart);
        const encodeTypeEnd = await dataBody.indexOf('\r\n\r\n', encodeTypeStart)
        const encodeType = dataBody.substring(encodeTypeStart + textStart.length, encodeTypeEnd)
        let end
        let messageView
        if (encodeType.trim() === 'base64') {
            const endBase64 = await dataBody.indexOf('=', encodeTypeEnd);
            const message = dataBody.substring(encodeTypeEnd, endBase64 + 1)
            const buf = Buffer.from(message, 'base64').toString();
            end = await buf.indexOf('\r\n\r\n-----Original message-----', 0);
            messageView = buf.substring(0, end)
        } else {
            end = await dataBody.indexOf('\r\n\r\n-----Original message-----', encodeTypeEnd + 4);
            const messageReplyOfUser = dataBody.substring(encodeTypeEnd + 4, end);
            const messageUtf8 = messageReplyOfUser.split('=').join('\\x')
            messageView = utf8ToText(messageUtf8);
        }
        return messageView
    }
    return null
}

const onHandlerReadEmail = async () => {
    try {
        imap.on('ready', async () => {
            await openInbox(async (err) => {
                if (err) throw err;
                imap.on('mail', async () => {
                    const contacts = await getListContact();
                    for (let i = 0; i < contacts.length; i++) {
                        const contact = contacts[i];
                        imap.search(['UNSEEN', ['SUBJECT', `[RE${contact._id.toString()}]`]], async (err2, results) => {
                            if (err2) throw err2;
                            if (results.length > 0) {
                                const f = imap.fetch(results, { bodies: '', markSeen: true });
                                f.on('message', async (msg) => {
                                    msg.on('body', async (stream) => {
                                        // const buffer = '';
                                        stream.on('data', async (chunk) => {
                                            const dataBody = chunk.toString('utf8');
                                            // console.log('data', dataBody)
                                            // get from mail
                                            const textFortmatEmail = 'From: ';
                                            const indexEmailSend = dataBody.indexOf(textFortmatEmail);
                                            const startEmailToRead = dataBody.indexOf('<', indexEmailSend);
                                            const endEmailToRead = dataBody.indexOf('>', indexEmailSend);
                                            const emailSend = dataBody.substring(startEmailToRead + 1, endEmailToRead);
                                            // get mail type
                                            const textMailType = 'Message-ID: ';
                                            const indexMailType = dataBody.indexOf(textMailType);
                                            const startMailType = dataBody.indexOf('<', indexMailType);
                                            const endMailType = dataBody.indexOf('>', indexMailType);
                                            const mailType = dataBody.substring(startMailType + 1, endMailType).trim()
                                            // console.log(mailType)
                                            let messageView;
                                            if (await mailType.indexOf('@mail.gmail.com') !== -1) {
                                                messageView = await bodyGmail(dataBody)
                                            }
                                            if (await mailType.indexOf('@email.amazonses.com') !== -1) {
                                                messageView = await bodyAmazon(dataBody);
                                            }

                                            if (!_.isUndefined(messageView)) {
                                                const dataReply = {
                                                    content: messageView,
                                                    name: contact.name,
                                                    email: emailSend
                                                }
                                                await contactModel.replyContact(contact._id.toString(), dataReply)
                                            }
                                        });
                                        stream.on('end', () => {
                                            // console.log('end');
                                        });
                                    });
                                    msg.on('end', () => {
                                    // console.log('Finished');
                                    });
                                });
                                f.on('error', (error) => {
                                    console.log(`Fetch error: ${error}`);
                                });
                                f.on('end', () => {
                                    console.log('Done fetching all messages!');
                                });
                            }
                        });
                    }
                });
            });
        });

        imap.on('error', (err) => {
        console.log(err);
        });

        imap.on('end', () => {
        console.log('Connection ended');
        });

        imap.connect();
    } catch (error) {
        console.log(error)
    }
}

function utf8ToText(a) { return text8ToText(utf8ToText8(a)) }

function utf8ToText8(a) { const b = '\\\\x'; return a.replace(new RegExp(`${b}([0-9a-fA-F]{2})`, 'g'), (c, d) => { return String.fromCharCode(parseInt(d, 16)) }) }

function text8ToText(b) { const d = []; const c = b.length; const f = false; let e; for (let a = 0; a < c; a++) { e = b.charCodeAt(a); if (f === false && isWhitespace(e) === true) { d.push(b.charAt(a)) } else if (e < 128) { d.push(b.charAt(a)) } else if (e < 224) { d.push(String.fromCharCode(((e & 31) << 6) | (b.charCodeAt(++a) & 63))) } else if (e < 240) { d.push(String.fromCharCode(((e & 15) << 12) | ((b.charCodeAt(++a) & 63) << 6) | (b.charCodeAt(++a) & 63))) } else if (e < 248) { d.push(String.fromCharCode(((e & 7) << 18) | ((b.charCodeAt(++a) & 63) << 12) | ((b.charCodeAt(++a) & 63) << 6) | (b.charCodeAt(++a) & 63))) } else if (e < 252) { d.push(String.fromCharCode(((e & 3) << 24) | ((b.charCodeAt(++a) & 63) << 18) | ((b.charCodeAt(++a) & 63) << 12) | ((b.charCodeAt(++a) & 63) << 6) | (b.charCodeAt(++a) & 63))) } else if (e < 254) { d.push(String.fromCharCode(((e & 1) << 30) | ((b.charCodeAt(++a) & 63) << 24) | ((b.charCodeAt(++a) & 63) << 18) | ((b.charCodeAt(++a) & 63) << 12) | ((b.charCodeAt(++a) & 63) << 6) | (b.charCodeAt(++a) & 63))) } } return d.join('') }

function isWhitespace(a) { if (a === 9 || a === 10 || a === 13 || a === 32) { return true } return false }

module.exports = {
    onHandlerReadEmail
}
