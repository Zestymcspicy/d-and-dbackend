const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

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
  const { errors, isValid } = validateRegisterInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
  const checkName = new RegExp(req.body.displayName, "i")
  User.findOne({ displayName: checkName })
    .then(user => {
      if (user) {
        console.log("A user with a similar name already exists");
        return res.status(400).json({displayName:"A user with a similar name already exists"})
        // return res.send();
      } else {
        let user = new User({
          displayName: req.body.displayName,
          password: req.body.password,
          email: req.body.email,
          admin: false
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.save(function(err) {
            if (err) {
              return next(err);
            }
            console.log("user saved successfully!");
            res.send({message:"user saved successfully!", user: user});
        });
      })
    })
    }
  })
    .catch(err => res.send(err));
};
