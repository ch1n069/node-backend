const express = require("express");

// accessing the controller
const postController = require("../controllers/post.controller");
//
const router = express.Router();

router.get("/", postController.index);

module.exports = router;
