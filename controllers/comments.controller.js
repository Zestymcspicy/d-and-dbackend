const Comment = require("../models/comments.model");
const User = require("../models/user.model");
const Character = require("../models/characters.model");

exports.comments_get = function(req, res, next) {
  Comment.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
};

exports.comment_votes = function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if(err) {
      console.log(err);
      return next(err);
    } else {
      comment.votes = JSON.parse(req.body.votes);
      // comment.votes = req.body.votes;
      comment.save(function(err) {
        if(err) {
          console.log(err)
          return next(err);
        } else {
          res.send({body: comment})
        }
      });
    }
  })
};


exports.comment_add = async function(req, res, next) {
  let comment = new Comment({
    auth_id: req.body.auth_id,
    displayName: req.body.displayName,
    content: req.body.content,
    childOf: req.body.childOf,
    icon: req.body.icon
  });
    await User.findById(req.body.auth_id).then((err, user) => {
      if(user){
      let newComments = user.comments;
      if (newComments===undefined) {
          newComments = [];
        }
        newComments.push(comment._id);
        user.comments = newComments;
        user.save(function(err) {
          if (err) {
            return next(err);
          }
          res.send({ message: "success", comment: comment, user: user });
        });
      }
    })
    await Character.findById(req.body.auth_id).then((err, character) => {
      if (character) {
        let newComments = character.comments;
        if (newComments===undefined) {
          newComments = [];
        }
        newComments.push(comment._id);
        character.comments = newComments
        character.save(function(err) {
          if (err) {
            console.log(err);
            return next(err);
          }
          return res.send({
            message: "success",
            comment: comment,
            character: character
          });
        });
      }
    })
    .catch(err => console.log(err))
    comment.save(function(err) {
      if (err) {
        return next(err);
      }
    console.log(comment._id);
    res.send({
      message: "comment saved",
      comment: comment
    });
  });
};
