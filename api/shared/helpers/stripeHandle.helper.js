const configCommon = require('./configCommon.helper');
const configStripe = configCommon.getStripePaymentConfig().secretKey;
const stripe = require('stripe')(configStripe)
const StripeCredit = require('stripe-payment-api').CreditCardApi;
const StripeConstant = require('stripe-payment-api').appConstant;

const StripeSite = new StripeCredit(stripe);

/**
 * @param number
 * @param month
 * @param year
 * @param cvc
 * @param currency
 * @param amount
 * @param description
 */

const payment = async (body) => {
    try {
        const resultCheck = await checkInforPayment(body)
        const inforPayment = {
            currency: body.currency || 'jpy',
            source: resultCheck.id,
            amount: body.amount,
            description: body.description
        }
        console.log(inforPayment)
        let result = await StripeSite.creditMethod(inforPayment, StripeConstant.PAYMENT_METHOD_CREDIT.CREATE_CHARGE);
        console.log(result)
        return {
            message: "Payment Successfully"

        }
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 * @param number
 * @param month
 * @param year
 * @param cvc
 */
const checkInforPayment = async (body) => {
    const creditInfo = {
        number: body.number,
        exp_month: Number(body.month),
        exp_year: Number(body.year),
        cvc: body.cvc
    }
    const result = await checkCreditCard(creditInfo)
    return result;
}

const checkCreditCard = async (body) => {
    try {
        const result = await StripeSite.creditMethod(body, StripeConstant.PAYMENT_METHOD_CREDIT.CREATE_TOKEN)
        return result;
    } catch (error) {
        let paramError = error.param;
        console.log(error)
        switch (paramError) {
            case 'number':
                throw Error("Your card number is incorrect.");
            case 'exp_month':
                throw Error("Exp month");
            case 'exp_year':
                throw Error("Exp year");
            case 'cvc':
                throw Error("Cvc");
            default:
                throw Error("Error info");

        }

    }
}

module.exports = {
    payment,
    checkInforPayment
}