const fs = require('fs')
// const { Storage } = require('@google-cloud/storage')
// const path = require('path')
const localesUtils = require('../helpers/localesUtils.helper')
const configCommon = require('../helpers/configCommon.helper')
var AWS = require('aws-sdk');

// const storage = new Storage({
//   keyFilename: path.join(__dirname, '../../config/omoide-286707-8457ab2d9261.json'),
//   projectId: 'omoide-286707',
// })
// const bucket = storage.bucket('omoide-stogare')

const upload = async (lang, name, base64String) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${configCommon.getImageDir()}/${name}`, base64String, 'base64', function(err) {
            if(err){
                console.log(err)
                reject(localesUtils.userMessage(lang).VERIFY.UNABLE_UPLOAD_IMAGE)
            }
            else{
                resolve(name)
            }
        });
    })
}

const uploadToStorage = async (name, base64String, folder=configCommon.s3().folder) => {
    return new Promise((resolve, reject) => {
        var buf = new Buffer(base64String, 'base64')
        var s3 = new AWS.S3({
            accessKeyId: configCommon.s3().accessKeyId,
            secretAccessKey: configCommon.s3().secretAccessKey
        });
        console.log({
            accessKeyId: configCommon.s3().accessKeyId,
            secretAccessKey: configCommon.s3().secretAccessKey
        })
        let bucket=configCommon.s3().bucket;
        if(folder){
            bucket=`${bucket}/${folder}`
        }
        s3.putObject({ Bucket: bucket, Key: name, Body: buf }, function (err, data) {
            console.log(err)
            if (err) {
                reject(err)
            } else {

                console.log("123456543212")
                console.log(data)
                resolve(`${configCommon.s3().host}${folder}/${name}`)
            }
        });
    })
}

// const uploadToCloud = async (lang, folder, name, base64String) => {
//     return new Promise((resolve, reject) => {
//         const buffer = Buffer.from(base64String, 'base64')
//         const blob = bucket.file(`${folder}/${name}`)
//         const blobStream = blob.createWriteStream({
//             resumable: false
//         })
//         blobStream.on('finish', () => {
//             resolve(`https://storage.googleapis.com/${bucket.name}/${folder}/${name}`)
//         })
//         .on('error', (error) => {
//             console.log(error.message)
//             reject(`Unable to upload image, something went wrong`)
//             reject(localesUtils.userMessage(lang).VERIFY.UNABLE_UPLOAD_IMAGE)
//         })
//         .end(buffer)
//     })
// }

const remove = async (dir) => {
    return new Promise((resolve, reject) => {
        fs.unlink(dir, function(err) {
            if(err){
                reject(err);
            }
            else{
                resolve()
            }
        });
    })
}

module.exports = {
    upload,
    // uploadToCloud,
    remove,
    uploadToStorage
}
