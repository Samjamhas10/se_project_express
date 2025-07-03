const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken module
const User = require("../models/user"); // Import the User Mongoose Model
const { NotFoundError, BadRequestError } = require("../utils/errors");
const { okStatusCode, createdStatusCode } = require("../utils/statusCodes");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash, // adding the hash to the database
        name,
        avatar,
      })
    )
    .then((user) => {
      // eslint-disable-next-line no-unused-vars
      const { password: _, ...userWithoutPassword } = user.toObject(); // destructuring with the rest operator
      res.status(createdStatusCode).send(userWithoutPassword);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError("Requested resource not found"))
    .then((user) => res.status(okStatusCode).send(user)) // returning user
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Invalid data"));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(okStatusCode).send({ token });
    })
    .catch(next);
};

// allows users to update their own profile information
const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Requested resource not found"));
      }
      return res.status(okStatusCode).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUser, createUser, login, updateProfile };
