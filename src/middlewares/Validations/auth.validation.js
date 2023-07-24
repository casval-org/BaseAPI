const joi = require("joi");
const APIError = require("../../utils/errors");

class AuthValidation {
  constructor() {}
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(50).required().messages({
            "string.base": `Name must be a type of 'text'`,
            "string.empty": `Name cannot be an empty field`,
            "string.min": `Name should have a minimum length of {#limit}`,
            "string.max": `Name should have a maximum length of {#limit}`,
            "any.required": `Name is a required field`,
          }),
          lastname: joi.string().trim().min(3).max(50).required().messages({
            "string.base": `Lastname must be a type of 'text'`,
            "string.empty": `Lastname cannot be an empty field`,
            "string.min": `Lastname should have a minimum length of {#limit}`,
            "string.max": `Lastname should have a maximum length of {#limit}`,
            "any.required": `Lastname is a required field`,
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(6)
            .max(100)
            .required()
            .messages({
              "string.base": `Email must be a type of 'text'`,
              "string.empty": `Email cannot be an empty field`,
              "string.email": `Email must be a valid email`,
              "string.min": `Email should have a minimum length of {#limit}`,
              "string.max": `Email should have a maximum length of {#limit}`,
              "any.required": `Email is a required field`,
            }),
          password: joi.string().trim().min(8).max(36).required().messages({
            "string.base": `Password must be a type of 'text'`,
            "string.empty": `Password cannot be an empty field`,
            "string.min": `Password should have a minimum length of {#limit}`,
            "string.max": `Password should have a maximum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
        })
        .validateAsync(req.body);
    } catch (err) {
      throw new APIError(err.details[0].message, 400);
    }
    next();
  };
  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi
            .string()
            .email()
            .trim()
            .min(6)
            .max(100)
            .required()
            .messages({
              "string.base": `Email must be a type of 'text'`,
              "string.empty": `Email cannot be an empty field`,
              "string.email": `Email must be a valid email`,
              "string.min": `Email should have a minimum length of {#limit}`,
              "string.max": `Email should have a maximum length of {#limit}`,
              "any.required": `Email is a required field`,
            }),
          password: joi.string().trim().min(8).max(36).required().messages({
            "string.base": `Password must be a type of 'text'`,
            "string.empty": `Password cannot be an empty field`,
            "string.min": `Password should have a minimum length of {#limit}`,
            "string.max": `Password should have a maximum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
        })
        .validateAsync(req.body);
    } catch (err) {
      throw new APIError(err.details[0].message, 400);
    }
    next();
  };
}

module.exports = AuthValidation;
