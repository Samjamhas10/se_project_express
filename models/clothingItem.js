const mongoose = require("mongoose"); // import the mongoose library to interact with MongoDB
const validator = require("validator");

// define a schema for clothing item
const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"], // only allow these specific string values
  },
  imageUrl: {
    type: String,
    required: [true, "The imageUrl is required"], // custom error message if missing
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // reference to MongoDB
    ref: "User",
    required: true,
  },

  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [], // default is an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now, // default to current date
  },
});

module.exports = mongoose.model("item", clothingItemSchema);
