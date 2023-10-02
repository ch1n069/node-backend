const express = require("express");

// accessing the controller
const postController = require("../controllers/post.controller");
//
const router = express.Router();

router.post("/newPost", postController.save);
router.get("/", postController.getAllPosts);

// router.post("/", postController.getAll);
router.get("/:id", postController.show);

module.exports = router;
