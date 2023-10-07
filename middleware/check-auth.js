const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  try {
    // grab the token from the
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret");
    token, "secret";
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication required", err: error });
  }
}

module.exports = {
  checkAuth: checkAuth,
};
