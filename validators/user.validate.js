const Joi = require('@hapi/joi');

const userValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = userValidator;
