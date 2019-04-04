const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CharacterSchema = new Schema({
  name: {type: String, required: true, max: 100},
  level: {type: Number, required: true},
  class: {type: String, required: true},
})
