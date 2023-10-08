const express = require("express");
const router = express.Router();
const checkAuthMiddleware = require("../middleware/check-auth");

const commentsController = require("../controllers/comments.controller");

module.exports = router;

// endpoint to create a comments
router.get("/:postID", commentsController.getComment);
router.post("/", commentsController.createComment);
router.post(
  "/update/:id",
  checkAuthMiddleware.checkAuth,
  commentsController.updateComment
);

// endpoint to read comments
