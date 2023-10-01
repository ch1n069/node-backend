const express = require("express");
// create an instance of express to access all the http methods
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

// export to be used by other modeles
module.exports = app;
