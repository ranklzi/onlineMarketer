/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var cookieParser = require('cookie-parser')

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/campaigns', require('./api/campaign'));
  app.use('/serve', require('./api/serve'));
  app.use('/conversion', require('./api/conversion'));

  app.use('/auth', require('./auth'));
  app.use(cookieParser());
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

   app.route('/testConversion')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/testConversion.html');
    });

  // All other routes should redirect to the index.html

  console.log(app.get('appPath'));
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
