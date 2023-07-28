const Joi = require("joi");

const schemaCreateSession = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  text: Joi.string().min(3).required(),
  author: Joi.string().min(3).required(30),
  variation: Joi.string().min(3).required(30),
  date: Joi.date(),
  numberSession: Joi.number(),
  file: Joi.string().min(3).max(100).required(),
  isFavorite: Joi.boolean().optional(),
});

const schemaUpdateSession = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  text: Joi.string().min(3).required(),
  author: Joi.string().min(3).max(30).required(),
  variation: Joi.string().min(3).required(30),
  date: Joi.date(),
  numberSession: Joi.number(),
  file: Joi.string().min(3).max(100).required(),
}).or("title", "author", "text", "date", "file", "numberSession");

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, ""),
    });
  }
};

module.exports = {
  validationCreateSession: (req, res, next) => {
    return validate(schemaCreateSession, req.body, next);
  },
  validationUpdateSession: (req, res, next) => {
    return validate(schemaUpdateSession, req.body, next);
  },
};
