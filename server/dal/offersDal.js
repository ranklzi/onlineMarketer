'use strict';

var pg = require('pg');
var config = require('../config/environment');

var dal = {};

exports.createOffer = function (offer, done) {
  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }

      client.query(
        'INSERT INTO offers("campaignId", name, active, url, payout, "splitWeight", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
            [offer.campaignId, offer.name, offer.active, offer.url, offer.url, offer.payout, offer.splitWeight, new Date(), new Date()], 
        function(err, result) {
            if (err) {
                console.log(err);
              }
            // } else {
            //     console.log('row inserted with data: ' + JSON.stringify(result));
            // }

            client.end();
        });  
    });      
}

exports.upateCampaignOffers = function (campaignId, offers, done) {
  console.log('upateCampaignOfferssssssssssssssssssssssssssssssss');
  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        client.end();
        return console.error('error fetching client from pool', err);
      }

      client.query('SELECT * FROM offers WHERE "campaignId" = ' + campaignId, function(err1, resultOffers) {
        var offersOld = resultOffers.rows;

        for (var offer in offers) {
          var offerOld = offersOld.findByJson({ id : offer.id});

          if (!offerOld) {
            //not found - create todo
            console.log('offer creatingggggggggggggggggg');
            createOffer(offer);
          } else {
            console.log('foundddddddddddddddddddddd');
            //found - update db and delete from offersOld.

            client.query(
              'UPDATE offers SET name = $2, active = $3, url = $4, payout = $5, "splitWeight" = $6, "campaignId" = $7, "updatedAt" = $8 WHERE id = $1', 
              [offer.id, offer.name, offer.active, offer.url, offer.payout, offer.splitWeight, offer.campaignId, new Date()], 
              function(err, result) {
                  if (err) {
                      console.log(err);
                  } else {
                      console.log('row updated with data: ' + JSON.stringify(result));
                  }

                  client.end();
            });
          }
        }
        
        

          //todo - if 
          
          //iterate remains of offersOld and delete in db.
        
      });      
  });
}

Array.prototype.findByJson = function(obj) {
    return this.filter(function(item) {
        for (var prop in obj)
            if (!(prop in item) || obj[prop] !== item[prop])
                 return false;
        return true;
    });
};



