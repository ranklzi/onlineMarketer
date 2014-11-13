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
var Campaign = models.campaign;//require('./campaign.model');

// Get list of things
exports.index = function(req, res) {
  Campaign.findAll().then(function (campaigns) {
    return res.json(200, campaigns);
  });
};

// Get a single campaign
exports.show = function(req, res) {
Campaign.find({ where: {id: req.params.id} }).success(function(campaign) {
    if(!campaign) { return res.send(404); }

    return res.json(campaign);
  });
};

// Creates a new campaign in the DB.
exports.create = function(req, res) {
  if(req.body.id) { delete req.body.id; }
  req.body.key = services.guidGenerator.generateGuid();
  Campaign.create(req.body, function(err, campaign) {
    if(err) { return handleError(res, err); }
    return res.json(201, campaign);
  });
};

// Updates an existing campaign in the DB.
exports.update = function(req, res) {
  if(req.body.id) { delete req.body.id; }

  Campaign.find({ where: {id: req.params.id} }).success(function(campaign) {
    if(!campaign) { return res.send(404); }
    var updated = _.merge(campaign, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a campaign from the DB.
exports.destroy = function(req, res) {
  Campaign.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
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