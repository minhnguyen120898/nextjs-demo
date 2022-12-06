const requestIp = require('request-ip');
const parser = require('ua-parser-js');

const verifyIpClient = (req, res, next) => {
    const clientIp = requestIp.getClientIp(req);
    res.locals.userAgent = parser(req.headers['user-agent']);
    if (clientIp) {
        res.locals.ip = clientIp
        next();
    } else {
        res.locals.ip = ""
        next();
    }
}

module.exports = {
    verifyIpClient
}