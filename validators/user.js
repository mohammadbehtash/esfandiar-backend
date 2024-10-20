const Joi = require('joi');
const userValidator = Joi.object({
    firsname: Joi.string().trim().required().messages({
      'any.required': 'نام شما الزامی است'
    }),
    description: Joi.string().trim().required().messages({
      'any.required': 'توضیحات شما الزامی است'
    }),
    tell: Joi.string().trim().required().messages({
      'any.required': 'تلفن شما الزامی است'
    }),
    email: Joi.string().trim().required().messages({
      'any.required': 'ایمیل شما الزامی است'
    }),
  });
module.exports = userValidator;
