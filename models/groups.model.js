const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GroupSchema = new Schema({
  name: {type: String, required: true, max: 64},
  img: {type: String, default:"images/dragonImageNotFound.png"},
  summary: {type: String, default:"No summary yet"},
  users: {type: Array, default: []},
  characters: {type: Array, default: []},
});

module.exports = mongoose.model('Group', GroupSchema);
