const models = require("../models");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("fastest-validator");

const User = models.User;

// register users function
function registerUser(req, res) {
  // logic to check if the email exitsts
  User.findOne({ where: { email: req.body.email } }).then((result) => {
    if (result) {
      res
        .status(409)
        .json({ message: "Email already exists proceed to login" });
    } else {
      // generating the salt
      bcryptjs.genSalt(10, function (err, salt) {
        bcryptjs.hash(req.body.password, salt, function (err, hash) {
          const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
          };

          //   definition of a validation schema
          const schema = {
            name: { type: "string", optional: false, max: "100" },
            email: {
              type: "email",
              optional: false,
              message: { email: "Please provide a valid email address" },
            },
            password: {
              type: "string",
              optional: false,
              //   max: "32",
              min: "8",
              messages: { stringMin: "Password is too short" },
            },
          };
          const v = new validator();
          const validationResponse = v.validate(user, schema);
          if (validationResponse !== true) {
            return res.status(404).json({ message: validationResponse });
          }
          //   creating the users
          User.create(user)
            .then((response) => {
              res.status(201).json({
                message: "User registration was successful",
                user: response,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Something went wrong while registering user",
              });
            });
        });
      });
    }
  });

  // generate salt
  // we initialize the user object password to be empty

  // hashing of the password

  // user object
}

// login function
function login(req, res) {
  User.findOne({ where: { email: req.body.email } })
    .then((response) => {
      if (response === null) {
        res.status(401).json({ message: "invalid credential" });
      } else {
        // compare passwrods in the database and the user password
        bcryptjs.compare(
          req.body.password,
          response.password,
          function (err, result) {
            if (result) {
              // if the passwords match then generate access token for the user
              const token = jwt.sign(
                { email: response.email, userId: response.userId },
                "secret",
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication was successful ",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({ message: "Authentication failed" });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({});
    });
}
// export the methods defined in your controller
module.exports = {
  registerUser: registerUser,
  login: login,
};
