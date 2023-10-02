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
function show(req, res) {
  // get the id of the post
  const id = req.params.id;
  Post.findByPk(id)
    .then((response) => {
      res.status(200).json(response);
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
// to use the methid
module.exports = {
  save: save,
  show: show,
  getAllPosts: getAllPosts,
  //   getAllPosts: getAllPosts,
};
