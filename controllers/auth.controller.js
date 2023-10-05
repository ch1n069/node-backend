const models = require("../models");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("fastest-validator");

const User = models.User;

// register users function
function registerUser(req, res) {
  // generate salt
  bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash(req.body.password, salt, function (err, hash) {
      // user object
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
            message: "User registration was successfull",
            user: response,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Something went wrong while registering user" });
        });
    });
  });
}

// export the methods defined in your controller
module.exports = {
  registerUser: registerUser,
};
