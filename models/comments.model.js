const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
  auth_id: { type: String, required: true, max: 100},
  displayName: { type: String, required: true, max: 50 },
  content: { type: String, required: true, max: 50000 },
  childOf: {type: String, required: true},
  icon: {type: String, default: "images/baseDragon.png"},
  dateTime: { type: Date, default: Date.now },
  votes: {type: String, default: '{"score": 0}'},
});

module.exports = mongoose.model("Comment", CommentSchema);
