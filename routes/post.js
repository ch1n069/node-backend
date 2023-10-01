const express = require("express");

// accessing the controller
const postController = require("../controllers/post.controller");
//
const router = express.Router();

router.post("/", postController.save);

module.exports = router;
