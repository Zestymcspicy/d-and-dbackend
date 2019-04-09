const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  displayName: {type: String, required: true, max: 50},
  password: {type: String, required: true, max: 64},
  email: {type: String, required: true, max: 64},
});

UserSchema.methods.checkDisplayName = function(cb) {
  return this.model('User').find({displayName: new RegExp(this.displayName, 'i')}, cb);
  
}

module.exports = mongoose.model('User', UserSchema);
