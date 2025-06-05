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
    .then((user) => res.status(createdStatusCode).send(user))
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

// module.exports.login = (req, res) => {
//   const { email, password } = req.body;
//   // attempt to find one user
//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         // if no user is foind, reject the Promise with an error
//         return Promise.reject(new Error("Incorrect email or password"));
//       }
//       // if user is found, compare the provided password
//       return bcrypt.compare(password, user.password);
//     })
//     .then((matched) => {
//       if (!matched) {
//         return Promise.reject(new Error("Incorrect email or password"));
//       }
//       // if everything is valid, send a success message
//       res.send({ message: "Everything is good" });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(unauthorizedStatusCode).send({ message: "Unauthorized" });
//     });
// };

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(unauthorizedStatusCode).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
