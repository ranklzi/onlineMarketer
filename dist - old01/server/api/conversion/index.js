'use strict';

var express = require('express');
var controller = require('./conversion.controller');

var router = express.Router();

// router.get('/', controller.index);
router.get('/', controller.track);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);
// router.get('/serve/:id', controller.track);

module.exports = router;