'use strict';

var pg = require('pg');
var config = require('../config/environment');
var offersDal = require('./offersDal');

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
};

exports.getCampaignByKey = function (key, done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM campaigns WHERE key = $1', [key], function(err1, result1) {
      if(err1) {
        client.end();
        return console.error('error running query', err1);
      }

      if (!result1 || result1.rows.length < 1) {
        client.end();
        done();
        return console.error('no results from campaign query', err1);
      }

      client.query('SELECT * FROM offers WHERE "campaignId" = ' + result1.rows[0].id, function(err2, result2) {
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

exports.getCampaignsStats = function (from, to, done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }

    var query = 'SELECT campaigns.id, campaigns.name, campaigns."defaultCpc", ' + 
      'COUNT(clicks.id) as clicks, SUM(CASE WHEN clicks.conversion = TRUE THEN 1 ELSE 0 END) as conversions, ' + 
      'SUM(clicks."cpcRate") as spent ' + //, SUM(offers."payOut") as revenue ' + 
      'FROM clicks INNER JOIN offers ON clicks."offerId" = offers.id ' +
      'INNER JOIN campaigns ON offers."campaignId" = campaigns.id ' +
      'WHERE clicks."clickDateTime" BETWEEN $1 AND $2 ' +
      'GROUP BY campaigns.id;';
      
    

    client.query(query,
      [from, to],
      //['2007-02-02 08:08:08', '2014-12-12 08:08:08'],
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

exports.getOffersWithCampaignsData = function (done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {      
      return console.error('error fetching client from pool', err);
    }

    var query = 'SELECT campaigns.id AS "campaignId", campaigns.name AS "campaignName", campaigns.active AS "campaignActive", campaigns."defaultCpc", campaigns."enableRotation", ' + 
       'campaigns."useTokens", "concatenateClickId", campaigns.key AS "campaignKey", campaigns."weightSum", offers.id AS "offerId", offers.name AS "offerName", ' +
       ' offers.active AS "offerAcitve", offers.url AS "offerUrl", offers.payout, offers."splitWeight"' +
  'FROM campaigns LEFT OUTER JOIN offers ON campaigns.id = offers."campaignId";';

    client.query(query, 
      function(err, result) {

      if(err) {
        client.end();
        return console.error('error running query', err);
      }
      
      done(result.rows);
      client.end();

      
    });
  });
};

exports.createCampaign = function (campaign, done) {
  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        client.end();
        return console.error('error fetching client from pool', err);
      }

      client.query(
        'INSERT INTO campaigns (name, comment, active, "defaultCpc", url, "enableRotation", "useTokens", key, "concatenateClickId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', 
        [campaign.name, campaign.comment, campaign.active, campaign.defaultCpc, campaign.url, campaign.enableRotation, campaign.useTokens, campaign.key, campaign.concatenateClickId, new Date(), new Date()], 
        function(err, result) {
            if (err) {
                console.log(err);
            } 
            // else {
            //     console.log('row inserted with data: ' + JSON.stringify(result));
            // }
            done();

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
        'UPDATE campaigns SET name = $2, comment = $3, active = $4, "defaultCpc" = $5, url = $6, "enableRotation" = $7, "useTokens" = $8, key = $9, "weightSum" = $10, "concatenateClickId" = $11, "updatedAt" = $12 WHERE id = $1', 
        [campaignId, campaign.name, campaign.comment, campaign.active, campaign.defaultCpc, campaign.url, campaign.enableRotation, campaign.useTokens, campaign.key, campaign.weightSum, campaign.concatenateClickId, new Date()], 
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
      //todo - delete all clicks
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
                done();
                client.end();
              });
        });  
    });      
}

