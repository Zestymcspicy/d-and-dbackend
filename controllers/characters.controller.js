const Character = require('../models/characters.model');
const User = require('../models/user.model')

exports.test = function(req, res) {
  res.send('Greetings from the test controller!');
};

exports.character_create = async function(req, res, next) {
  let character = new Character(
    {
      name: req.body.name,
      level: req.body.level,
      class: req.body.class,
      race: req.body.race,
      user: req.body.user
    }
  )
  await User.findOne({_id: character.user}).then(user => {
    let newCharacters = user.characters
    if (newCharacters===undefined) {
      newCharacters=[];
    }
    newCharacters.push(character);
    user.characters = newCharacters;
    console.log(user)
    user.save(function (err){
      if(err) {
        err.send(err);
      }
      console.log('UserCharacter saved successfully!')
    })
  })
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
