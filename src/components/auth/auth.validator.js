const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const validateRegisterData = (httpRequest) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(8).required(),
    password: Joi.string().min(8).max(20).alphanum().required()
  });
  return schema.validate(httpRequest.body, options);
};

module.exports = {
  validateRegisterData
};
