const express = require("express"); // import Express library used to build our web server
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");
const { notFoundStatusCode } = require("./utils/errors");
const { login, createUser } = require("./controllers/users");
const auth = require("./middleware/auth");

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

// allow requests from the client to the server to be processed
app.use(cors());

app.post("/signin", login);
app.post("/signup", createUser);

// authorization
app.use(auth);

app.use("/", indexRouter); // application routes

app.use((req, res) => {
  res
    .status(notFoundStatusCode)
    .send({ message: "Requested resource not found" }); // 404 catch-all
});

app.listen(PORT, () => {
  // start the server
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
