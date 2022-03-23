const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9_@\.\-]+$/)
    .required(),
  password: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9!@#%^&*+-=]{6,15}$/)
    .required(),
});

const registerSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required(),
  lastName: Joi.string()
    .trim()
    .required(),
  email: Joi.string().trim().email().lowercase(),
  phone: Joi.string()
    .trim()
    .pattern(/^\d{10}$/)
    .required(),
  username: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9_@\.\-]+$/)
    .required(),
  password: Joi.string()
    .trim()
    .min(6)
    .max(15)
    .required(),
  avatar: Joi.string().trim().uri(),
  type: Joi.string().trim().valid("farmer", "expert").required(),
});

module.exports = {
  loginSchema,
  registerSchema,
};
