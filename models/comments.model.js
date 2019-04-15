const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
  displayName: { type: String, required: true, max: 50 },
  content: { type: String, required: true, max: 50000 },
  childOf: {type: String, required: true},
  dateTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);
