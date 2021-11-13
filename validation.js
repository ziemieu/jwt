//Validation of user input using @hapi/joi
const Joi = require("@hapi/joi");

//Constructing Schema for Joi for user input validation
//Wrap in a function because of multiple Schema

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  //return Joi.validate(data, schema);
  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  //return Joi.validate(data, schema);
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

//// For the new version

// const schema = Joi.object({ name: Joi.string() .min(6) .required(),
// email: Joi.string() .min(6) .required() .email(),
// password: Joi.string() .min(6) .required() });

// const validation = schema.validate(req.body);
// res.send(validation);
