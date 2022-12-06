const debug = require('debug');
const appPrefix = "api"

const getLogger = (name) => {
    var logger = debug(appPrefix + ":" + name);
    return logger;
}

module.exports = {
    getLogger
}