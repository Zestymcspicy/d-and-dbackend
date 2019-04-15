const Comment = require("../models/comments.model");

exports.comments_get = function(req, res, next) {
  Comment.find().then(data => res.send(data))
  .catch(err=> console.log(err))
}

exports.comment_add = function(req, res, next) {
  let comment = new Comment({
    displayName: req.body.displayName,
    content: req.body.content,
    childOf: req.body.childOf
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send({
      message: "comment saved",
      comment: comment
    });
  });
};
