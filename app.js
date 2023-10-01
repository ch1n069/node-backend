const express = require("express");
const bodyParser = require("body-parser");
// create an instance of express to access all the http methods
const app = express();

app.use(bodyParser.json());

const postsRoute = require("./routes/post");
// defining the middleware
app.use("/posts", postsRoute);

// export to be used by other modeles
module.exports = app;
