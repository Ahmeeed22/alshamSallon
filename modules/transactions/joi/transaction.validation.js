const Joi = require("joi");

module.exports = {
    addTransactionSchema:{
        body:Joi.object().required().keys({
            paymentAmount : Joi.number().required(),
            balanceDue : Joi.number().required(),
            price : Joi.number().required(),
            admin_id : Joi.number().required(),
            customer_id : Joi.number().required(),
            service_id : Joi.number().required(),
            company_id : Joi.number().min(1) ,
            sponsoredName : Joi.string(),
            active : Joi.boolean().default(true),
        })
    },
    deleteTransactionSchema:{
        params: Joi.object().required().keys({
            id : Joi.number().required()
        }),
    }  
    ,
    updateTransactionSchema:{
        params: Joi.object().required().keys({
            id : Joi.number().required()
        }),
        body:Joi.object().required().keys({
            paymentAmount : Joi.number(),
            balanceDue : Joi.number(),
            price : Joi.number(),
            admin_id : Joi.number(),
            customer_id : Joi.number(),
            service_id : Joi.number(),
            sponsoredName : Joi.string(),
            active : Joi.boolean(),
        }).min(1)
    },
    getAllTransaction:{
        body:Joi.object().required().keys({
            limit : Joi.number().min(1).max(1000).default(10),
            offset : Joi.number().min(0),
            customer_id : Joi.number(),
            admin_id : Joi.number(),
            startedDate : Joi.date().iso(),
            endDate : Joi.date().iso().min(Joi.ref('startedDate')),
            active : Joi.boolean(),
            balanceDue : Joi.number(),
            date :Joi.boolean(),
            company_id : Joi.number()
        }).min(1)
    },
    }

    