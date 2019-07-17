const Group = require("../models/groups.model")

exports.groups_get_all = function(req, res, next) {
  Group.find().then( x => res.send({body : x}))
  .catch(err => {
    console.log(err)
    error.send(err)
  })
}

exports.new_group = function(req, res, next) {
  let group = new Group({
    name: req.body.name,
    img: req.body.image,
    admin: req.body.user,
    
  })
}
