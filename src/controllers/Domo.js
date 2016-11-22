const models = require('../models');

const Domo = models.Domo;

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const deleteDomo = (req, res) => {
  const domoData = {
    name: req.body.name,
    owner: req.session.account._id,
  };

  console.log('Deleted!');

  Domo.DomoModel.remove(domoData, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.json({ redirect: '/maker' });
  });
};

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'RAWR! Both name and age are required!' });
  }

  // HERE
  const domoData = {
    name: req.body.name,
    age: req.body.age,
    classs: req.body.classs,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  return newDomo.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.json({ redirect: '/maker' });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.delete = deleteDomo;
