const express = require("express");

// accessing the controller
const postController = require("../controllers/post.controller");
//
const router = express.Router();

router.post("/newPost", postController.save);
// router.post("/", postController.getAll);

module.exports = router;
