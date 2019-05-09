const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let ImageSchema = new Schema({
  address: {type: String, required: true}
});

module.exports = mongoose.model('Image', ImageSchema);
