const Character = require('../models/characters.model');
const User = require('../models/user.model')

exports.delete_journal = function(req, res, next) {
  Character.findById(req.body.character_id, function(err, character) {
    res.send(req.body)
    const journal_or_carousel_id = req.body.journal_or_carousel_id
    if(err) return next(err);
    let newJournalOrCarousel = character[req.body.type].filter
    (journalOrCarousel => Number(journalOrCarousel._id) !== Number(journal_or_carousel_id));
    character[req.body.type] = newJournalOrCarousel;
    character.save(function(err) {
      if(err){
        res.send(err)
      } else {
        res.send({message:`${req.body.type} deleted`, [req.body.type]: journal_or_carousel_id})
      }
    })
  })
}

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
    let content;

    if(req.body.type==="journals" || req.body.type === "carousel") {
      let newJournalOrCarousel;
      if(!character[req.body.type]) {
        character[req.body.type] = [];
      }
      let myJournalOrCarousel = JSON.parse(req.body.content)
      if(character[req.body.type].every
        (journalOrCarousel =>`${journalOrCarousel._id}`!==`${myJournalOrCarousel._id}`)){
          newJournalOrCarousel = character[req.body.type];
      } else {
        newJournalOrCarousel = character[req.body.type].filter
        (journalOrCarousel => `${journalOrCarousel._id}` !== `${myJournalOrCarousel._id}`);
      }
      if(err) res.send(err);
      newJournalOrCarousel.push(myJournalOrCarousel);
      content = newJournalOrCarousel;



    } else {
      content=req.body.content
    }
    console.log(content)
    character[req.body.type] = content;
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
