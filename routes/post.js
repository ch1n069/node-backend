const express = require("express");
const checkAuthMiddleware = require("../middleware/check-auth");

// accessing the controller
const postController = require("../controllers/post.controller");
//
const router = express.Router();

router.post("/newPost", checkAuthMiddleware.checkAuth, postController.save);
router.get("/", postController.getAllPosts);
router.post(
  "/updatePost/:id",
  checkAuthMiddleware.checkAuth,
  postController.updateRecord
);
router.post(
  "/deletePost/:id",
  checkAuthMiddleware.checkAuth,
  postController.deletePost
);

// router.post("/", postController.getAll);
router.get("/:id", postController.show);

module.exports = router;
