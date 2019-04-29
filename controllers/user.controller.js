const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const secret = require("../secret")

exports.user_sign_in = async function(req, res, next) {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    console.log("validation")
    return res.status(400).json(errors);
  }
  await User.findOne({ displayName: req.body.displayName }).then(user => {
    if (!user) {
      console.log("user")
      return res.status(401).json({message: "user not found"});
    }
    console.log(req.body.displayName)
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if(isMatch) {
          //User Matched create jwt_payload
          const payload = {
            _id: user._id,
            name: user.name
          };
          jwt.sign(
            payload,
            secret.secretOrKey,
            {
              expiresIn: 31556926
            },
            (err, token) => {
              user.password = "";
              res.json({
                success: true,
                token: "Bearer " + token,
                user: user
              })
            }
          );
        } else {
          console.log("password")
          return res.status(400).json({message: "Incorrect Password"})
        }
      })
    })
  }


//     res.status(401).send({ message: "Wrong Password" });
// } else {
  //     res.status(200).send({
    //       message: "success",
    //       user: user
    //     });
    // }

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
            res.send({message:"success", user: user});
        });
      })
    })
    }
  })
    .catch(err => res.send(err));
};
