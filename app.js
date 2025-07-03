const express = require("express"); // import Express library used to build our web server
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");
const {
  validateUserBody,
  validateAuthentication,
} = require("./middlewares/validation.js");
const { NotFoundError } = require("./utils/errors");
const { login, createUser } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");

const app = express(); // create an instance of an Express application
const { PORT = 3001 } = process.env; // get port number or use 3001 as default

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to DB");
  })
  .catch(console.error);

// app.use(helmet()); // sets response headers automatically to help protect your app
app.use(express.json()); // parse JSON request bodies

// allow requests from the client to the server to be processed
app.use(cors());

app.post("/signin", validateAuthentication, login); // NOT protected
app.post("/signup", validateUserBody, createUser); // NOT protected

app.use("/", indexRouter); // application routes

app.use((req, res, next) => {
  next(new NotFoundError("Request resource not found"));
});

// celebrate error handler
app.use(errors());

// centralized handler
app.use(errorHandler);

app.listen(PORT, () => {
  // start the server
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
