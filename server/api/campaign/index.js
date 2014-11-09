'use strict';

var express = require('express');
var controller = require('./campaign.controller');

var router = express.Router();

router.get('/manage', controller.index);
router.get('/manage/:id', controller.show);
router.post('/manage', controller.create);
router.put('/manage/:id', controller.update);
router.patch('/manage/:id', controller.update);
router.delete('/manage/:id', controller.destroy);
router.get('/track/:id', controller.track);

module.exports = router;