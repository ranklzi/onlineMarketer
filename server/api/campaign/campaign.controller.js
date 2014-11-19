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
var models = require('../../models');
var services = require('../../services');
var campaignsDal = require('../../dal/campaignsDal');
var Campaign = models.campaign;//require('./campaign.model');

// Get the list of Campaigns
exports.index = function(req, res) {
  campaignsDal.getCampaigns(function (campaigns) {
    if(!campaigns) { return res.send(404); }

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
    return res.json(201, campaign);
  });
};

// Updates an existing campaign in the DB.
exports.update = function(req, res) {
  if(req.body.id) { delete req.body.id; }
  campaignsDal.updateCampaign(req.params.id, req.body, function(err, campaign) {
    if(err) { return handleError(res, err); }

    return res.json(201, campaign);
  });
};

// Deletes a campaign from the DB.
exports.destroy = function(req, res) {
  campaignsDal.deleteCampaign(req.params.id, function(err, campaign) {
    if(err) { return handleError(res, err); }
    return res.json(201);
  });
};

//track campaign click
exports.track = function(req, res) {
  Campaign.findById(req.params.id, function (err, campaign) {
    if (err) { return handleError(res, err); }
    if(!campaign) { return res.send(404); }

    console.log('tracking click................................................................');
    
    if (!campaign.offers || campaign.offers.length == 0) { return res.send(400); }

    return res.redirect(campaign.offers[0].url);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}