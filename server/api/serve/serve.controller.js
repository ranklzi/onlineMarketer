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
var applicationCacheManager = require('../../bl/applicationCacheManager').applicationCacheManager;
var cookie = require('cookie');
var config = require('../../config/environment');
var logManager = require('../../services/logManager').logManager;

var getCampaign = function(key, done) {
  var campaign;
  if (config.useCampaignCache) {
    campaign = applicationCacheManager.getCampaign(key);
    if (campaign) {
      console.log('campaign found in cache.');
      done(campaign);
      return;  
    }
  }
  
  campaignsDal.getCampaignByKey(key, function (campaign) {
    console.log('loaded from db.');
    done(campaign);
  });
};

//track campaign click
exports.track = function(req, res) {

  logManager.logger().log('info', 'serve controllder called (server port - %d)', config.port);

  getCampaign(req.params.id, function (campaign) {
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
    click.clickDateTime = new Date();

    res.cookie('cookieId', click.cookieId, { maxAge: 900000, httpOnly: true });

    var redirectUrl = chosenOffer.url;
    console.log(click.cookieId);

    if (campaign.concatenateClickId) {
      redirectUrl += click.cookieId;
    }

    clicksDal.createClick(click);
    
    return res.redirect(redirectUrl);
  });
};

var chooseOffer = function(totalWeight, offers) {

  if (!totalWeight || totalWeight == 0) {
    if (!offers || offers.length == 0) {
      return;
    }
    else {
      return offers[0];
    }
  }

  var marker = Math.floor(Math.random() * totalWeight);

  var counter = 0;

  for (var i = 0; i < offers.length; i++) { 
    counter = counter + offers[i].splitWeight;

    if (counter > marker) {
      return offers[i];
    }
  }
};


function handleError(res, err) {
  return res.send(500, err);
}