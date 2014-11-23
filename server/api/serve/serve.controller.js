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
var clicksDal = require('../../dal/clicksDal');
var cookie = require('cookie');



//track campaign click
exports.track = function(req, res) {
  campaignsDal.getCampaign(req.params.id, function (campaign) {
    //if (err) { return handleError(res, err); }
    if(!campaign) { return res.send(404); }

    if (!campaign.offers || campaign.offers.length == 0) { return res.send(400); }

    var chosenOffer = chooseOffer(campaign.weightSum, campaign.offers);

    var click = {};
    click.cookieId = services.guidGenerator.generateGuid();    
    click.ip = 
      req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      (req.connection.socket && req.connection.socket.remoteAddress);
    click.offerId = chosenOffer.id;
    click.cpcRate = campaign.defaultCpc;

    res.cookie('cookieId', click.cookieId, { maxAge: 900000, httpOnly: true });

    clicksDal.createClick(click);
    
    return res.redirect(chosenOffer.url);
  });
};

var chooseOffer = function(totalWeight, offers) {
  var marker = Math.floor(Math.random() * totalWeight);

  var counter = 0;

  for (var i = 0; i < offers.length; i++) { 
    counter = counter + offers[i].splitWeight;

    if (counter > marker) {
      return offers[i];
    }
  }

  console.log('errorrrrr randommmmmmmmmmmmmmmmmmmmmmmm');
};


function handleError(res, err) {
  return res.send(500, err);
}