// this is where we write the server
// importing htpp
// define a port that the server should run
const http = require("http");
const app = require("./app");
const port = 3000;

// constant for the server
const server = http.createServer(app);
server.listen(port);
