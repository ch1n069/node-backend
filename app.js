const express = require("express");
// create an instance of express to access all the http methods
const app = express();

const postsRoute = require("./routes/post");
// defining the middleware
app.use("/posts", postsRoute);

// export to be used by other modeles
module.exports = app;
