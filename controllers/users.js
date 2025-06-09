const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken module
const User = require("../models/user"); // Import the User Mongoose Model

const {
  okStatusCode,
  createdStatusCode,
  badRequestStatusCode,
  unauthorizedStatusCode,
  notFoundStatusCode,
  conflictErrorStatusCode,
  internalServerStatusCode,
} = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
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
      const { password: _, ...userWithoutPassword } = user.toObject(); // destructuring with the rest operator
      res.status(createdStatusCode).send(userWithoutPassword);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(badRequestStatusCode)
          .send({ message: "Invalid data" });
      }
      if (err.code === 11000) {
        return res
          .status(conflictErrorStatusCode)
          .send({ message: "Email already exists" });
      }
      return res
        .status(internalServerStatusCode)
        .send({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(okStatusCode).send(user)) // returning user
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(notFoundStatusCode)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(badRequestStatusCode)
          .send({ message: "Invalid data" });
      }
      return res
        .status(internalServerStatusCode)
        .send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(badRequestStatusCode).send({ message: "Invalid data" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(okStatusCode).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        res
          .status(unauthorizedStatusCode)
          .send({ message: "Authorization required" });
      }
      res
        .status(internalServerStatusCode)
        .send({ message: "An error has occured on the server" });
    });
};

// allows users to update their own profile information
const updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(notFoundStatusCode)
          .send({ message: "Requested resource not found" });
      }
      return res.status(okStatusCode).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(badRequestStatusCode)
          .send({ message: "Invalid data" });
      }
      return res
        .status(internalServerStatusCode)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getCurrentUser, createUser, login, updateProfile };
