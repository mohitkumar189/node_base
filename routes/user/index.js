const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/', Controller.getAll); //all list
router.get('/:id', Controller.getById); //details
router.post('/', Controller.save); //save
router.put('/', Controller.updateAll); //update all
router.put('/:id', Controller.updateOne); //update matching id
router.delete('/', Controller.deleteAll); //delete all
router.delete('/:id', Controller.deleteOne); //delete matching id

module.exports = router;