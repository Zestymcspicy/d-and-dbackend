const User = require("../models/user.model");

exports.user_sign_in = async function(req, res, next) {
  await User.findOne({ displayName: req.body.displayName }).then(user => {
    if (user) {
      if (req.body.password !== user.password) {
        res.status(401).send({ message: "Wrong Password" });
      } else {
        res.status(200).send({
          message: "success",
          user: user
        });
      }
    } else {
      res.status(401).send({ message: "User Not Found" });
    }
  });
};

exports.user_create = async function(req, res, next) {
  User.findOne({ displayName: new RegExp(displayName, "i") })
    .then(user => {
      if (user) {
        console.log("A user with a similar name already exists");
        return res.send("A user with a similar name already exists");
      } else {
        let user = new User({
          displayName: req.body.displayName,
          password: req.body.password,
          email: req.body.email,
          admin: false
        });
        user.save(function(err) {
          if (err) {
            return next(err);
          }
          console.log("user saved successfully!");
          res.send("user saved successfully!");
        });
      }
    })
    .catch(err => res.send(err));
};
