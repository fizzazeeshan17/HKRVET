/* // Validation
const Joi = require("@hapi/joi");

// Register Validation
const registerationValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    phone: Joi.number().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerationValidation,
  loginValidation,
};
 */

const joi = require('@hapi/joi');
 
// validating registration
const registerValidation = (data) => {
    const schema = joi.object({
        fullName: joi.string().min(6).required(),
        phone: joi.string().min(10).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
 
    });
 
    return schema.validate(data)
};
 
const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
    return schema.validate(data);
 
};
 
module.exports = {
    registerValidation,
    loginValidation
}

