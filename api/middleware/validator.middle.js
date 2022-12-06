const { body } = require('express-validator')

const registerBank = () => {
    return [
        body('first_name', 'INVALID_FIRST_NAME').not().isEmpty().isString(),
        body('last_name', 'INVALID_LAST_NAME').not().isEmpty().isString(),
        body('bank_auth', 'INVALID_AUTH').not().isEmpty().isString()
    ]
}

const contact = () => {
    return [
        body('first_name', 'INVALID_FIRST_NAME').not().isEmpty().isString(),
        body('last_name', 'INVALID_LAST_NAME').not().isEmpty().isString(),
        body('first_name_katakana', 'INVALID_FIRST_NAME_KATAKANA').optional().isString(),
        body('last_name_katakana', 'INVALID_LAST_NAME_KATAKANA').optional().isString(),
        body('email', 'INVALID_EMAIL').not().isEmpty().isEmail(),
        body('category', 'INVALID_CATEGORY').not().isEmpty().isString(),
        body('content', 'INVALID_CONTENT').not().isEmpty().isString(),
    ]
}

module.exports = {
    registerBank,
    contact
}