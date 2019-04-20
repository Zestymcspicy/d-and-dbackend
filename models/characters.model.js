const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CharacterSchema = new Schema({
  name: {type: String, required: true, max: 100},
  level: {type: Number, required: true},
  class: {type: String, required: true},
  user: {type: String},
  race: {type: String},
  summary: {type: String, required: false, max: 5000},
  icon: {type: String, required: false, default: "images/baseDragon.png"},
  // class: {type: String, required: false},
});

module.exports = mongoose.model('Character', CharacterSchema);
