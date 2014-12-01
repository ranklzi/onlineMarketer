'use strict';

var pg = require('pg');
var config = require('../config/environment');
var async = require('async');

var dal = {};

exports.createClick = function (click) {
  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }

      client.query(
    'INSERT INTO clicks("ip", "cookieId", "offerId", "cpcRate", "clickDateTime") VALUES ($1, $2, $3, $4, $5)', 
        [click.ip, click.cookieId, click.offerId, click.cpcRate, click.clickDateTime], 
    function(err, result) {
        if (err) {
            client.end();
            return console.log(err);
          }
        // } else {
        //     console.log('row inserted with data: ' + JSON.stringify(result));
        // }
        //done(result);

        client.end();
    }); 
       
  });      
}

exports.getClickByCookieId = function (cookieId, done) {
  pg.connect(config.postreg.connectionString, function(err, client) {
    if(err) {
      client.end();
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM clicks WHERE "cookieId" = ' + "'" + cookieId + "'", function(err, result) {
      if(err) {
        client.end();
        return console.error('error running query', err);
      }

      if (!result || result.rows.length < 1) {
        client.end();
        done();
        return console.error('no results from campaign query', err);
      }

      done(result.rows[0]);
      client.end();
    });
  });
}

exports.updateClick = function (click, done) {
  pg.connect(config.postreg.connectionString, 
    function(err, client) {
      if(err) {
        client.end();
        return console.error('error fetching client from pool', err);
      }

      client.query(
        'UPDATE clicks SET conversion = $2, "conversionDateTime" = $3  WHERE id = $1', 
        [click.id, click.conversion, click.conversionDateTime], 
        function(err, result) {

            if (err) {
                console.log(err);
            } else {
                console.log('row inserted with data: ' + JSON.stringify(result));
            }
            client.end();
        });  
    });      
}