
const cron = require('node-cron')
const init =async () => {
    cron.schedule('0 0 10 * *', async () => {
        console.log("start withdraw")
    })
}

module.exports = {
    init
}