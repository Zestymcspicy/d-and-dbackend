const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  groups: {type: Array, default: []},
  displayName: {type: String, required: true, max: 50},
  password: {type: String, required: true, max: 64},
  email: {type: String, required: true, max: 64},
  admin: {type: Array, required: []},
  characters: {type: Array, default: []},
  comments: {type: Array, default: []},
  icon: {type: String, default: "images/baseDragon.png"},
});


module.exports = mongoose.model('User', UserSchema);
