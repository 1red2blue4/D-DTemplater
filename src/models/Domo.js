const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();
const setClass = classs => _.escape(classs).trim();

const DomoSchema = new mongoose.Schema({
  // HERE

  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  classs: {
    type: String,
    trim: true,
    set: setClass,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
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

DomoSchema.statics.toAPI = doc => ({
  name: doc.name,
  age: doc.age,
  classs: doc.classs,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  // HERE
  return DomoModel.find(search).select('name age classs').exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
