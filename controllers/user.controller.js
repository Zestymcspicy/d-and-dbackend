const User = require('../models/user.model');

exports.user_create = function(req, res, next) {
  let user = new User(
    {
      displayName: req.body.displayName,
      password: req.body.password,
      email: req.body.email,
    }
  )
  const userExists = check_user(user);
  if(userExists) {
    return res.send('A user with a similar name already exists')
  } else {
    user.save(function (err){
      if(err) {
        return next(err);
      }
      res.send('user saved successfully!')
    })
  }
}

async function check_user (user) {
  await user.checkDisplayName(function(err, users) {
    return (users.length>0);

  })
}
