const mongoose = require("mongoose"); // import the mongoose library to interact with MongoDB

const clothingItemSchema = new mongoose.Schema({});

module.exports = mongoose.model("item", clothingItemSchema);
