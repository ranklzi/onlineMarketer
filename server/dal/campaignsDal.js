'use strict';

var pg = require('pg');
var config = require('../config/environment');
var offersDal = require('./offersDal');

var dal = {};

exports.getCampaign = function (campaignId, done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM campaigns WHERE id = ' + campaignId, function(err1, result1) {
      if(err1) {
        client.end();
        return console.error('error running query', err1);
      }

      if (!result1 || result1.rows.length < 1) {
        client.end();
        done();
        return console.error('no results from campaign query', err1);
      }

      client.query('SELECT * FROM offers WHERE "campaignId" = ' + campaignId, function(err2, result2) {
        if(err2) {
          client.end();
          return console.error('error running query', err2);
        }

        result1.rows[0].offers = result2.rows;
        done(result1.rows[0]);
        client.end();        
      });
    });
  });
}

exports.getCampaigns = function (done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT campaigns.id, campaigns.name, COUNT(clicks.id) as clicks, SUM(CASE WHEN clicks.conversion = TRUE THEN 1 ELSE 0 END) as conversions, SUM(clicks."cpcRate") as spent FROM campaigns INNER JOIN offers ON campaigns.id = offers."campaignId" LEFT OUTER JOIN clicks ON offers.id = clicks."offerId" GROUP BY campaigns.id;', 
      function(err, result) {

      if(err) {
        client.end();
        return console.error('error running query', err);
      }
      
      done(result.rows);
      client.end();

      
    });
  });
}

exports.getCampaignsStats = function (done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM campaigns INNER JOIN ', function(err, result) {

      if(err) {
        client.end();
        return console.error('error running query', err);
      }
      
      done(result.rows);
      client.end();

      
    });
  });
}

exports.createCampaign = function (campaign, done) {
  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        client.end();
        return console.error('error fetching client from pool', err);
      }

      client.query(
        'INSERT INTO campaigns (name, comment, active, "defaultCpc", url, "enableRotation", "useTokens", key, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', 
        [campaign.name, campaign.comment, campaign.active, campaign.defaultCpc, campaign.url, campaign.enableRotation, campaign.useTokens, campaign.key, new Date(), new Date()], 
        function(err, result) {
            if (err) {
                console.log(err);
            } 
            // else {
            //     console.log('row inserted with data: ' + JSON.stringify(result));
            // }

            client.end();
        });  
    });      
}

exports.updateCampaign = function (campaignId, campaign, done) {
  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        client.end();
        return console.error('error fetching client from pool', err);
      }

      client.query(
        'UPDATE campaigns SET name = $2, comment = $3, active = $4, "defaultCpc" = $5, url = $6, "enableRotation" = $7, "useTokens" = $8, key = $9, "updatedAt" = $10 WHERE id = $1', 
        [campaignId, campaign.name, campaign.comment, campaign.active, campaign.defaultCpc, campaign.url, campaign.enableRotation, campaign.useTokens, campaign.key, new Date()], 
        function(err, result) {

            if (err) {
                console.log(err);
            } else {
                console.log('row inserted with data: ' + JSON.stringify(result));
            }
            client.end();

            offersDal.upateCampaignOffers(campaignId, campaign.offers, function(err, offers) {
              if(err) { 
                client.end();
                return console.log(err); 
              }
              campaign.offers = offers;

              done(campaign);

              client.end();
            });
        });  
    });      
}

exports.deleteCampaign = function (campaignId, done) {
  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }

      client.query(
        'DELETE FROM offers WHERE "campaignId" = ' + campaignId, 
        function(err, result) {
            if (err) {
                console.log(err);
                if (done) { done(err); }
                client.end();
                return;                
            }
            console.log('got here1111111111');

            client.query(
              'DELETE FROM campaigns WHERE id = ' + campaignId, 
              function(err, result) {
                if (err) {
                    console.log(err);
                    if (done) { done(err); }
                    return;                
                }
                 console.log('got here2222222');
                client.end();
              });
        });  
    });      
}

