const Character = require('../models/characters.model');

exports.test = function(req, res) {
  res.send('Greetings from the test controller!');
};

exports.character_create = function(req, res, next) {
  let character = new Character(
    {
      name: req.body.name,
      level: req.body.level,
      class: req.body.class
    }
  )
  character.save(function (err) {
    if(err) {
      return next(err);
    }
    res.send('Character created successfully!')
  })
}

exports.character_details = function (req, res) {
  Character.findById(req.params.id, function(err, character) {
    if(err) return next(err);
    res.send(character);
  })
};

exports.character_update  = function (req, res) {
  Character.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, character) {
    if(err) return next(err);
    res.send("Character Updated");
  });
};

exports.character_delete = function (req, res) {
  Character.findByIdAndRemove(req.params.id, function(err){
    if(err) return next(err);
    res.send('Character deleted');
  })
};
