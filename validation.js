const joi = require("@hapi/joi");

// validating registration
const registerValidation = (data) => {
  const schema = joi.object({
    phone: joi.number().min(10).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  });
  return schema.validate(data);
};

const bookingValidation = (data) => {
  const schema = joi.object({
    pet: joi.string().min(4).required(),
    reason: joi.string().min(20).required(),
    fullName: joi.string.min(6).required(),
    time: joi.date().required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  bookingValidation,
};
