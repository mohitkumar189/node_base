const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.route('/')
    .all((req, res, next) => {
        next()
    })
    .get(Controller.getAll)
    .post(Controller.save)
    .put(Controller.updateAll)
    .delete(Controller.deleteAll);


router.route('/:id')
    .all((req, res, next) => {
        next()
    })
    .get(Controller.getById)
    .post(Controller.save)
    .put(Controller.updateOne)
    .delete(Controller.deleteOne);

module.exports = router;