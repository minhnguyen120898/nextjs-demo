const bignumber = require('bignumber.js')
const round = (value, r) => {
    let n = parseFloat(value || 0);
    return Math.round(n * Math.pow(10, r)) / (Math.pow(10, r))
}
const roundDown = (value, r) => {
    let n = parseFloat(value || 0);
    return bignumber(parseInt(bignumber(n).multipliedBy(Math.pow(10, r)).toNumber())).multipliedBy(1/Math.pow(10, r)).toNumber()
}
module.exports = {
    round,
    roundDown
}