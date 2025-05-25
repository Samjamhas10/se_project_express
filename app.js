const express = require("express"); // import Express library used to build our web server

const app = express(); // create an instance of an Express application

const { PORT = 3001 } = process.env; // get port number or use 3001 as default

app.listen(PORT, () => { // start the server
  console.log(`App listening at port ${PORT}`);
});
