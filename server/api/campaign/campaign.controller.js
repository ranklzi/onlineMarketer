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
var updatesStatusDal = require('../../dal/updatesStatusDal').updatesStatusDal;
var url = require('url');

// Get the list of Campaigns
exports.index = function(req, res) {

  var queryData = url.parse(req.url, true).query;

  campaignsDal.getCampaignsStats(queryData.from, queryData.to, function (campaigns) {    
    if(!campaigns) { return res.send(200); }

    //console.log(campaigns);

    return res.json(campaigns);
  });
};

// Get a single campaign
exports.show = function(req, res) {  
  campaignsDal.getCampaign(req.params.id, function (campaign) {
    if(!campaign) { return res.send(404); }

    return res.json(campaign);
  });
};

// Creates a new campaign in the DB.
exports.create = function(req, res) {
  if(req.body.id) { delete req.body.id; }
  req.body.key = services.guidGenerator.generateGuid();

  campaignsDal.createCampaign(req.body, function(err, campaign) {
    if(err) { return handleError(res, err); }

    updatesStatusDal.update(new Date(), 1, function(err1) {
      if(err1) { return handleError(res, err1); }

      return res.json(200);

    });
  });
};

// Updates an existing campaign in the DB.
exports.update = function(req, res) {
  if(req.body.id) { delete req.body.id; }
  campaignsDal.updateCampaign(req.params.id, req.body, function(campaign) {
    //if(err) { return handleError(res, err); }
    
    updatesStatusDal.update(new Date(), 1, function(err1) {
      if(err1) { return handleError(res, err1); }

      return res.json(201, campaign);

    });
  });
};

// Deletes a campaign from the DB.
exports.destroy = function(req, res) {
  campaignsDal.deleteCampaign(req.params.id, function(err, campaign) {
    //if(err) { return handleError(res, err); }

    updatesStatusDal.update(new Date(), 1, function(err1) {
      if(err1) { return handleError(res, err1); }

      return res.json(201);
    });
  });
};
function handleError(res, err) {
  return res.send(500, err);
}