const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// URL validator helper
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Email validator helper
const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

// card (clothing item) body validation
const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),

    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.only": 'The "weather" field must be "hot", "warm", or "cold"',
    }),
  }),
});

// create user validation
const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The name must be at least 2 characters",
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),

    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be a valid email',
    }),

    password: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});


const validateUserBodyEditProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": "The name must be at least 2 characters",
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
    }),

    password: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "password" field must be filled in',
      "string.min": 'The "password" must be at least 2 characters long',
    }),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.empty": '"itemId" is required',
      "string.length": '"itemId" should be 24 characters long',
      "string.hex": '"itemId" must have a valid hexadecimal string',
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required().messages({
      "string.empty": '"userId" is required',
      "string.length": '"userId" should be 24 characters long',
      "string.hex": '"userId" must have a valid hexadecimal string',
    }),
  }),
});

module.exports = {
  validateUserBody,
  validateUserBodyEditProfile,
  validateCardBody,
  validateAuthentication,
  validateItemId,
  validateUserId,
};
