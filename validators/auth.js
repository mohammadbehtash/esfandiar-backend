const Joi = require('joi');

const loginValidators = Joi.object({
    username: Joi.string().required().trim().messages({
        'any.required': 'نام کاربر الزامی است'
    }),
    password: Joi.string().required().messages({
        'any.required': 'رمز عبور الزامی است'
    }),
});

module.exports = loginValidators;
