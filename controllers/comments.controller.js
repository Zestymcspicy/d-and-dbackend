const Comment = require("../models/comments.model");

exports.comment_add = function(req, res, next) {
  let comment = new Comment({
    displayName: req.body.displayName,
    content: req.body.content
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
