const Joi = require("joi");

module.exports = {
    addCustomerSchema:{
        body:Joi.object().required().keys({
            name : Joi.string().min(3).required().messages({
                "string.empty":"sorry ...name is required"
            }),
            email : Joi.string().email().messages({
                "string.email":"sorry ...please enter valid email"
            }),
            phoneNo :Joi.number(),
            active : Joi.boolean(),
            company_id:Joi.number().required().min(0),
            admin_id:Joi.number().required().min(0),
            deposite : Joi.number().default(0)
        })
    },
    updateCustomerSchema:{
        params: Joi.object().required().keys({
            id : Joi.number().required()
        }),
        body:Joi.object().required().keys({
            name : Joi.string().min(3).required().messages({
                "string.empty":"sorry ...name is required"
            }),
            email : Joi.string().email().messages({
                "string.email":"sorry ...please enter valid email"
            }),
            phoneNo :Joi.number(),
            active : Joi.boolean(),
            company_id:Joi.number().required().min(0),
            deposite : Joi.number()
        }).min(1)
    }
}