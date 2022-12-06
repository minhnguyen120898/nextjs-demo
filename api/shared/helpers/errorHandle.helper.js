const errorMapping = {
    100: 'INVALID_KEY',
    101: 'INVALID_TIME_ACCESS',
    102: 'INVALID_TOKEN',
    105: 'INVALID_AUTH',
    106: 'INVALID_ACCESS_TOKEN'
}

const handleError = (code, req, res, next) => {
    if (code) {
        if (code instanceof Error) {
            // logger(`unhandled Error ${code}`);
            res.status(400).send({ code: 400, message: code.message });
        } else if (errorMapping[code] !== undefined) {
            // logger(`handError ${code}`);
            res.status(401).send({ code: code, message: errorMapping[code] });
        } else {
            // logger(`unhandle error`);
            res.status(500).send({ code: 500, message: 'UNHANDLED_ERROR' });
        }
    } else {
        // logger(`unhandle error`);
        res.status(500).send({ code: 500, message: 'UNHANDLED_ERROR' });
    }
};

module.exports = {
    handleError
}