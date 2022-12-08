const ObjectId = require('mongoose').Types.ObjectId
const appConstant = require('./constant.helper')
const _ = require('lodash')
const isBase64encode = require('is-base64')

const mongoValidator = (str) => {
    return ObjectId.isValid(str)
}
const asciiCharacterValidator = (str) =>{
    let accii = /[^\x20-\x7F]/ ;
    return accii.test(str)
}
const paginationValidator = (query) => {
    let page = query.page && query.page>0 ? Number(query.page) : appConstant.PAGINATION.PAGE_DEFAULT
    let limit = query.limit && query.limit>0 ? Number(query.limit) : appConstant.PAGINATION.LIMIT_DEFAULT
    let sort = query.sort ? Number(query.sort) : appConstant.PAGINATION.SORT_DEFAULT
    return { page, limit, sort }
}
const isValidParams = (params, keys) => {
    let paramKeys = Object.keys(params)
    paramKeys.sort()
    keys.sort()
    return _.isEqual(paramKeys, keys)
}
const cleanObject = (obj) => {
    for(let key of Object.keys(obj)){
        if(obj[key] === null || obj[key] === undefined || obj[key] === "")delete obj[key]
    }
    return obj
}
const hasKeysInObject = (obj, keys) => {
    let isHas = true
    for(let key of keys){
        if(obj[key] === null || obj[key] === undefined || obj[key] === "")isHas = false 
    }
    return isHas
}
const isBase64 = (string) => {
    return string&&string.trim().indexOf("data:")>=0
}
const isValidFile = (extension) => {
    return Object.values(appConstant.FILE.EXTENSION).indexOf(extension.toLowerCase()) >= 0
}
module.exports = {
    mongoValidator,
    asciiCharacterValidator,
    paginationValidator,
    isValidParams,
    cleanObject,
    hasKeysInObject,
    isBase64,
    isValidFile
}