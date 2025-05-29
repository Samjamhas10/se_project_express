const User = require("../models/user"); // Import the User Mongoose Model
const {
  okStatusCode,
  createdStatusCode,
  badRequestStatusCode,
  notFoundStatusCode,
  internalServerStatusCode,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(okStatusCode).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(internalServerStatusCode)
        .send({ message: err.message }); // have something similiar to this in all your catch blocks'
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(createdStatusCode).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(badRequestStatusCode).send({ message: err.message });
      }
      return res
        .status(internalServerStatusCode)
        .send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(okStatusCode).send(user)) // returning user
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(notFoundStatusCode).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(badRequestStatusCode).send({ message: err.message });
      }
      return res
        .status(internalServerStatusCode)
        .send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
