const mongoose = require("mongoose"); // import the mongoose library to interact with MongoDB
const validator = require("validator"); // import the validator library to validate values like URLs

const userSchema = new mongoose.Schema({
  // define a user schema
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL", // message shown if URL is invalid
    },
  },
});

module.exports = mongoose.model("user", userSchema);
