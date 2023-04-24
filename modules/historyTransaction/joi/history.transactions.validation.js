const Joi = require("joi");

module.exports = {
    addHistoryTransactionsSchema:{
        body:Joi.object().required().keys({
            details : Joi.string().min(3).required(),
            company_id : Joi.number().min(1).required() ,
            transaction_id : Joi.number().min(1).required() ,
        })
    },
    updateHistoryTransactionsSchema:{
        body:Joi.object().required().keys({
            details : Joi.string().min(3).required(),
            company_id : Joi.number().min(1) ,
            transaction_id : Joi.number().min(1) ,

        }).min(1)
    }
}