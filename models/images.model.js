const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let ImageSchema = new Schema({
  img: {type: Buffer, contentType: String}
});

module.exports = mongoose.model('Image', ImageSchema);
