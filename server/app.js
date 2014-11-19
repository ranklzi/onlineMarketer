/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('newrelic');

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var models = require('./models');

var Schema = require('./config/pgSchema');
//var sequence = require('when/sequence');
var _ = require('lodash');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

  // Populate DB with sample data
if(config.seedDB) { 
	require('./config/seed'); 
  require('./config/pgseed');
}

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;