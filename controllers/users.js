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
        .send({ message: "An error has occurred on the server" }); // have something similiar to this in all your catch blocks'
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(createdStatusCode).send(user))
    .catch((err) => {
      console.error(err);
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

const getUser = (req, res) => {
  const { userId } = req.params;
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

module.exports = { getUsers, createUser, getUser };
