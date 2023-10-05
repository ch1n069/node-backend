const express = require("express");
const bodyParser = require("body-parser");

const postsRoute = require("./routes/post");
const authRoute = require("./routes/auth");
// create an instance of express to access all the http methods
const app = express();

app.use(bodyParser.json());

// defining the middleware
// defining of the route prefixes
app.use("/posts", postsRoute);
app.use("/auth", authRoute);

// export to be used by other modeles
module.exports = app;
