// import all the models
const models = require("../models");
// import of the validation package
const validator = require("fastest-validator");
const Post = models.Post;

// method to insert a posts into the
function save(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: 1,
  };

  // create validation schema to validate the data before setting it to the database
  const schema = {
    title: { type: "string", optional: "false", max: "100" },
    content: { type: "string", optional: "false", max: "500" },
    imageUrl: { type: "string", optional: "false" },
    categoryId: { type: "number", optional: "false" },
  };
  const v = new validator();
  const validationResponse = v.validate(post, schema);
  // perform a check to check if the validation passes the schema
  //it will always return true or an array of error messages
  if (validationResponse !== true) {
    return res
      .status(400)
      .json({ message: "Validation failed", error: validationResponse });
  }
  Post.create(post)
    .then((result) => {
      res.status(201).json({
        message: "Post was created Successfully",
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        err: err,
      });
    });
}
function show(req, res) {
  // get the id of the post
  const id = req.params.id;
  Post.findByPk(id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Theres is no post that exists using the record ",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}
// get all posts
function getAllPosts(req, res) {
  // method from sequelize
  Post.findAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
}
// update a record from the database
function updateRecord(req, res) {
  const id = req.params.id;
  const userId = 1;

  const updatePost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
  };

  // create an instance of the validator
  const v = new validator();
  // define a schema for our update method
  const schema = {
    title: { type: "string", optional: "false", max: "100" },
    content: { type: "string", optional: "false", max: "500" },
    imageUrl: { type: "string", optional: "false" },
    categoryId: { type: "number", optional: "false" },
  };
  const validationResponse = v.validate(updatePost, schema);
  // performing to check if the valdation passed or not
  if (validationResponse !== true) {
    return res
      .status(400)
      .json({ message: "Validation failed", error: validationResponse });
  }
  Post.update(updatePost, { where: { id: id, userId: userId } })
    .then((response) => {
      res
        .status(200)
        .json({ message: "Record updated successfully", post: response });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something happening when updating the post",
        err: err,
      });
    });
}
// delete a record
function deletePost(req, res) {
  const postId = req.params.id;
  const userId = 1;
  Post.destroy({ where: { id: postId, userId: userId } })
    .then((response) => {
      res
        .status(200)
        .json({ message: "Post was delete Successfully", post: response });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}
// to use the methid
module.exports = {
  save: save,
  show: show,
  getAllPosts: getAllPosts,
  updateRecord: updateRecord,
  deletePost: deletePost,
  //   getAllPosts: getAllPosts,
};
