const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (e) { next(e); }
});

router.post(
  '/',
  [body('name').notEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const cat = new Category({ name: req.body.name });
      await cat.save();
      res.status(201).json(cat);
    } catch (e) { next(e); }
  }
);

module.exports = router;