const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const validateSample = (httpRequest) => {
  const schema = Joi.object({
    phone: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        'string.pattern.base': 'Provide valid phone number!'
      }),
    password: Joi.string().min(8).max(20).alphanum().required()
  });
  return schema.validate(httpRequest.body, options);
};

module.exports = {
  validateSample
};
