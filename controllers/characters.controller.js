const Character = require('../models/characters.model');
const User = require('../models/user.model')

exports.test = function(req, res) {
  res.send('Greetings from the test controller!');
};

exports.character_get_all = function(req, res, next){
  Character.find().then(x=> res.send({body:x}))
  .catch(err=> error.send(err))
}

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
    newCharacters.push(character._id);
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
    res.send({message: 'Character created successfully!', body: character})
  })
}

exports.character_details = function (req, res) {
  Character.findById(req.params.id, function(err, character) {
    if(err) return next(err);
    res.send(character);
  })
};

exports.character_update  = function (req, res) {
  Character.findById(req.params.id, function(err, character) {
    character[req.body.type] = req.body.content
    character.save( function(err) {
    if(err) {
      console.log(err)
      return next(err);
    }
    res.send({
      body: character,
    });
  });
});
};

exports.character_delete = function (req, res) {
  Character.findByIdAndRemove(req.params.id, function(err){
    if(err) return next(err);
    res.send('Character deleted');
  })
};
