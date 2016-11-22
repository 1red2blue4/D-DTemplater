const models = require('../models');

const Character = models.Character;

const renderCharPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.render('seeallchars', { csrfToken: req.csrfToken(), characters: docs });
  });
};

const makerPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
};

const deleteCharacter = (req, res) => {
  const characterData = {
    name: req.body.name,
    owner: req.session.account._id,
  };

  console.log('Deleted!');

  Character.CharacterModel.remove(characterData, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.json({ redirect: '/maker' });
  });
};

const edit = (req, res) => {

  
  const { charId } = req.params;
  
  Character.CharacterModel.findById(charId).exec((err, result) => {
    if (err)
    {
      return res.status(400).json({ error: 'You are missing some information.' });
    }
    
    Character.CharacterModel.remove(result);
    
    console.log(result.playerName);
    
    return res.render('editApp', result);
    
    //create an editApp.handlebars page
    //similar to app.handlebars page, with {{this.thing}} as the "value"
    //create a POST form in editApp.handlebars
    //create another function here in the Character controller that finds the model by id and edits it
    //example: result.playerName = "Markie";
    //result.save((err, updatedResult) => {
      //if (err) return res.status(400).json({ error: 'You are missing some information.' });
      //res.send(updatedResult);
    //})
    
  });
};

const submitEdit = (req, res) => {
  if (!req.body.playerName || !req.body.characterName || !req.body.level || !req.body.myClass) {
    return res.status(400).json({ error: 'You are missing some information.' });
  }
  
  const characterData = {
    playerName: req.body.playerName,
    characterName: req.body.characterName,
    level: req.body.level,
    firstAlignment: req.body.firstAlignment,
    secondAlignment: req.body.secondAlignment,
    myClass: req.body.myClass,
    STR: req.body.STR,
    DEX: req.body.DEX,
    CON: req.body.CON,
    INT: req.body.INT,
    WIS: req.body.WIS,
    CHA: req.body.CHA,
    maxHealth: req.body.maxHealth,
    currentHealth: req.body.currentHealth,
    hitDie: req.body.hitDie,
    armorClass: req.body.armorClass,
    spellSaveDifficulty: req.body.spellSaveDifficulty,
    spells: req.body.spells,
    items: req.body.items,
    characterBackground: req.body.characterBackground,
    proficiencies: req.body.proficiencies,
    owner: req.session.account._id,
  };
  
  Character.CharacterModel.findOne(characterData, (err, thisCharacter) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }
    
    return res.save()
  });
  
};

const makeCharacter = (req, res) => {
  if (!req.body.playerName || !req.body.characterName || !req.body.level || !req.body.myClass) {
    return res.status(400).json({ error: 'You are missing some information.' });
  }

  // HERE
  const characterData = {
    playerName: req.body.playerName,
    characterName: req.body.characterName,
    level: req.body.level,
    firstAlignment: req.body.firstAlignment,
    secondAlignment: req.body.secondAlignment,
    myClass: req.body.myClass,
    STR: req.body.STR,
    DEX: req.body.DEX,
    CON: req.body.CON,
    INT: req.body.INT,
    WIS: req.body.WIS,
    CHA: req.body.CHA,
    maxHealth: req.body.maxHealth,
    currentHealth: req.body.currentHealth,
    hitDie: req.body.hitDie,
    armorClass: req.body.armorClass,
    spellSaveDifficulty: req.body.spellSaveDifficulty,
    spells: req.body.spells,
    items: req.body.items,
    characterBackground: req.body.characterBackground,
    proficiencies: req.body.proficiencies,
    owner: req.session.account._id,
  };

  const newCharacter = new Character.CharacterModel(characterData);

  return newCharacter.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.json({ redirect: '/maker' });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeCharacter;
module.exports.delete = deleteCharacter;
module.exports.edit = edit;
module.exports.renderCharPage = renderCharPage;
