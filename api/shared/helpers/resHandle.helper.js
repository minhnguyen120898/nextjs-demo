module.exports = {

    sendResponse(res, data, status) {
        res.status(status ? status : 200).send(data);
    },

    sendError(res, error) {
        let err = error;
        if (error.message) {
            err = error.message;
        } else if (error && error.errors) {
            err = error.errors[0].message;
        }
        res.status(400).send({
            message: err
        });
    }
}