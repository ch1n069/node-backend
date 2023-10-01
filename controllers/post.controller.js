// list all the blogs in the database
function index(req, res) {
  const posts = "posts lists";
  res.send(posts);
}
module.exports = {
  index: index,
};
