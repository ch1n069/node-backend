// import all the models
const models = require("../models");
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
// get all posts
function getAllPosts() {}
// to use the methid
module.exports = {
  save: save,
  //   getAllPosts: getAllPosts,
};
