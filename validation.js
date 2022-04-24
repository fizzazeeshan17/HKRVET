// Validation
const Joi = require("@hapi/joi");

// Register Validation
<<<<<<< HEAD
const registerationValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    phone: Joi.number().min(6).required(),
=======
const registerValidation = (data) => {
  const schema = Joi.object({
>>>>>>> 1548641dc70edcb3c3d6a8faf118ddd0d759cbdb
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
<<<<<<< HEAD
  registerationValidation,
=======
  registerValidation,
>>>>>>> 1548641dc70edcb3c3d6a8faf118ddd0d759cbdb
  loginValidation,
};
