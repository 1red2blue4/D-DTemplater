const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let CharacterModel = {};

const convertId = mongoose.Types.ObjectId;
const setPlayerName = playerName => _.escape(playerName).trim();
const setCharacterName = characterName => _.escape(characterName).trim();
//const setLevel = level => _.escape(level).trim();
const setFirstAlignment = firstAlignment => _.escape(firstAlignment).trim();
const setSecondAlignment = secondAlignment => _.escape(secondAlignment).trim();
const setMyClass = myClass => _.escape(myClass).trim();
const setHitDie = hitDie => _.escape(hitDie).trim();
const setSpells = spells => _.escape(spells).trim();
const setItems = items => _.escape(items).trim();
const setCharacterBackground = characterBackground => _.escape(characterBackground).trim();
const setProficiencies = proficiencies => _.escape(proficiencies).trim();

const CharacterSchema = new mongoose.Schema({
  // HERE

  playerName: {
    type: String,
    required: true,
    trim: true,
    set: setPlayerName,
  },
  
  characterName: {
    type: String,
    required: true,
    trim: true,
    set: setCharacterName,
  },

 level: {
    type: Number,
    required: true,
    min: 0,
  },
  
  firstAlignment: {
    type: String,
    required: true,
    trim: true,
    set: setFirstAlignment,
  },
  
  secondAlignment: {
    type: String,
    required: true,
    trim: true,
    set: setSecondAlignment,
  },
  
  myClass: {
    type: String,
    required: true,
    trim: true,
    set: setMyClass,
  },
  
  STR: {
    type: Number,
    required: true,
    min: -5,
    max: 5,
  },
  
  DEX: {
    type: Number,
    required: true,
    min: -5,
    max: 5,
  },
  
  CON: {
    type: Number,
    required: true,
    min: -5,
    max: 5,
  },
  
  INT: {
    type: Number,
    required: true,
    min: -5,
    max: 5,
  },
  
  WIS: {
    type: Number,
    required: true,
    min: -5,
    max: 5,
  },
  
  CHA: {
    type: Number,
    required: true,
    min: -5,
    max: 5,
  },
  
  maxHealth: {
    type: Number,
    required: true,
    min: 1,
  },
  
  currentHealth: {
    type: Number,
    required: true,
    min: 1,
  },
  
  hitDie: {
    type: String,
    trim: true,
    set: setHitDie,
  },
  
  armorClass: {
    type: Number,
    required: true,
    min: 1,
  },
  
  spellSaveDifficulty: {
    type: Number,
    min: 1,
  },
  
  spells: {
    type: String,
    trim: true,
    set: setSpells,
  },
  
  items: {
    type: String,
    trim: true,
    set: setItems,
  },
  
  characterBackground: {
    type: String,
    trim: true,
    set: setCharacterBackground,
  },
  
  proficiencies: {
    type: String,
    trim: true,
    set: setProficiencies,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },

});

CharacterSchema.statics.toAPI = doc => ({
  playerName: doc.playerName,
  characterName: doc.characterName,
  level: doc.level,
  firstAlignment: doc.firstAlignment,
  secondAlignment: doc.secondAlignment,
  myClass: doc.myClass,
  STR: doc.STR,
  DEX: doc.DEX,
  CON: doc.CON,
  INT: doc.INT,
  WIS: doc.WIS,
  CHA: doc.CHA,
  maxHealth: doc.maxHealth,
  currentHealth: doc.currentHealth,
  hitDie: doc.hitDie,
  armorClass: doc.armorClass,
  spellSaveDifficulty: doc.spellSaveDifficulty,
  spells: doc.spells,
  items: doc.items,
  characterBackground: doc.characterBackground,
  proficiencies: doc.proficiencies,
});

CharacterSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  // HERE
  return CharacterModel.find(search).select('playerName characterName level firstAlignment secondAlignment myClass STR DEX CON INT WIS CHA maxHealth currentHealth hitDie armorClass spellSaveDifficulty').exec(callback);
};

CharacterModel = mongoose.model('Character', CharacterSchema);

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;