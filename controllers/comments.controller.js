const models = require("../models");
const validator = require("fastest-validator");

const Comments = models.Comment;

// function to create a comment
function createComment(req, res) {
  const comment = {
    content: req.body.content,
    postId: req.body.postId,
    userId: 1,
  };

  //   schema for the validation
  const schema = {
    content: { type: "string", optional: false, max: "500" },
    postId: { type: "number", optional: false },
  };
  const v = new validator();
  const validationResponse = v.validate(comment, schema);
  if (validationResponse !== true) {
    return res
      .status(400)
      .json({ message: "Validation failed", error: validationResponse });
  }

  //   first get the post we want to add a comment to
  models.Post.findByPk(req.body.postId).then((response) => {
    if (response === null) {
      res.status(404).json({ message: "Post not found" });
    } else {
      models.Comment.create(comment)
        .then((response) => {
          res.status(200).json({
            message: "Comment created Successfully",
            comment: response,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Something wrong happened", error: err });
        });
    }
  });
}
// get comments that are related to a single post
function getComment(req, res) {
  const postId = req.params.postId;
  Comments.findAll({ where: { postId: postId } })
    .then((response) => {
      if (!response) {
        res
          .status(200)
          .json({ message: "There are no comments for the post yet" });
      } else {
        res.status(200).json({ comments: response });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong retrieving the comments",
        error: error,
      });
    });
}
// function to update a single comments
function updateComment(req, res) {
  // get the commentId
  const commentId = req.params.id;
  const userId = 1;

  const updatedComment = {
    content: req.body.content,
  };

  const schema = {
    content: { type: "string", optional: false, max: "500" },
  };
  const v = new validator();
  //   do a check of the comment being edited
  const validationResponse = v.validate(updatedComment, schema);
  if (validationResponse !== true) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: validationResponse });
  }
  //   check if the user is the owner of the comment
  Comments.findByPk(commentId)
    .then((comment) => {
      if (comment === null) {
        return res.status(404).json({ message: "Comment not found" });
      }
      if (comment.userId !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to  edit this comment" });
      }
      Comments.update(updatedComment, {
        where: { id: commentId, userId: userId },
      })
        .then((response) => {
          res
            .status(200)
            .json({ message: "Comment updated Successfully", post: response });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ message: "Something went wrong ", error: error });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ message: "something went wrong", error: error });
        });
    })
    .catch();
}

module.exports = {
  getComment: getComment,
  createComment: createComment,
  updateComment: updateComment,
};
