const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

module.exports = {
  /**
   * Validates a login request.
   * @param {object} httpRequest - The HTTP request object.
   * @param {object} httpRequest.body - The request body.
   * @param {string} httpRequest.body.phone - The phone number to validate.
   * @param {string} httpRequest.body.password - The password to validate.
   * @returns {object} - The validation result.
   */
  validateLogin: (httpRequest) => {
    const schema = Joi.object({
      phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
          'string.pattern.base': 'Provide valid phone number!',
        }),
      password: Joi.string().min(8).max(20).alphanum().required(),
    });
    return schema.validate(httpRequest.body, options);
  },
};
