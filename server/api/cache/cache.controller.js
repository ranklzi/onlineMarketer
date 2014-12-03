/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var services = require('../../services');
var campaignsDal = require('../../dal/campaignsDal');
var applicationCacheManager = require('../../bl/applicationCacheManager').applicationCacheManager;
var config = require('../../config/environment');
var logManager = require('../../services/logManager').logManager;

// Get the list of Campaigns
exports.index = function(req, res) {
  applicationCacheManager.setCampaignsToCache(function() {
    logManager.logger().log('info', 'updated cache for server listening on port - %d)', config.port);
    return res.send(200);  
  });
};

function handleError(res, err) {
  return res.send(500, err);
}