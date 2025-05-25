const express = require("express"); // import Express library used to build our web server
const mongoose = require("mongoose");

const app = express(); // create an instance of an Express application
const { PORT = 3001 } = process.env; // get port number or use 3001 as default

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  // start the server
  console.log(`Server is running on port ${PORT}`);
});
