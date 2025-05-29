const express = require("express"); // import Express library used to build our web server
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const { notFoundStatusCode } = require("./utils/errors");

const app = express(); // create an instance of an Express application
const { PORT = 3001 } = process.env; // get port number or use 3001 as default

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json()); // parse JSON request bodies
app.use((req, res, next) => {
  req.user = {
    _id: "6834ff5b66f67b0713936a33", // sets up the user object for all requests
  };
  next();
});
app.use("/", indexRouter); // application routes

app.use((req, res) => {
  res.status(notFoundStatusCode).send({ message: "Page not found" }); // 404 catch-all
});

app.listen(PORT, () => {
  // start the server
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
