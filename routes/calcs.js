const express = require('express');
const router = express.Router();
const calc = require('../models/calc');

router.get('/', async (req, res) => {
  try {
    const calcs = await calc.find();
    res.send(calcs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getCalc, (req, res) => {
  res.send(res.Calc);
});

router.post('/', async (req, res) => {
  const Calc = new calc({
    title: req.body.title,
    fields: req.body.fields,
    createdBy: req.body.createdBy,
  });
  try {
    const newCalc = await Calc.save();
    res.status(201).json(newCalc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', getCalc, async (req, res) => {
  if (req.body.title != null) res.Calc.title = req.body.title;
  if (req.body.fields != null) res.Calc.fields = req.body.fields;
  if (req.body.createdBy != null) res.Calc.title = req.body.createdBy;
  try {
    const updatedCalc = await res.Calc.save();
    res.json(updatedCalc);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getCalc, async (req, res) => {
  try {
    await res.Calc.remove();
    res.json({ message: 'Deleted Calc' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

async function getCalc(req, res, next) {
  let Calc;
  try {
    Calc = await calc.findById(req.params.id);
    if (Calc === null) {
      return res.status(404).json({ message: 'Cannot find the Calc' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.Calc = Calc;
  next();
}

module.exports = router;
