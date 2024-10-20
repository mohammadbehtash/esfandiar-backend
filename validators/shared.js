const Joi = require('joi');

const SharedValidators=Joi.object({
    name:Joi.string().required().messages({
        'any.required': 'نام الزامی است'
    }),
    link:Joi.string().required().messages({
        'any.required': 'لینک الزامی است'
    }),
    icon:Joi.string().required().messages({
        'any.required': 'ایکن الزامی است'
    }),
})

module.exports=SharedValidators