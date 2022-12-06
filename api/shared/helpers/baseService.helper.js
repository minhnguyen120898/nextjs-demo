const _ = require('lodash');
const axios = require('axios');
const qs = require('querystring')

const request = async (method, url, header, data) => {
    return await axios({
        method: method.toUpperCase(),
        url: url,
        data: data,
        headers: _.merge({
            "Content-Type": "application/json",
        }, header)
    })
    .then(function (response) {
        console.log(response)
        return response.data
    })
    .catch(function (error) {
        console.log(error)
        const response = {error: true}
        if(error.response){
            response.message = error.response.statusText || error.response.data.message
            return response
        }
        response.message = error.message
        return response
    });
};

module.exports = {
    request
}