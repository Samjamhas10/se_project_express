const express = require("express"); // import Express library used to build our web server
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express(); // create an instance of an Express application
const { PORT = 3001 } = process.env; // get port number or use 3001 as default

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "test",
  };
  next();
});
app.use("/", indexRouter);

app.listen(PORT, () => {
  // start the server
  console.log(`Server is running on port ${PORT}`);
});
