'use strict';

var pg = require('pg');
var config = require('../config/environment');

var updatesStatusDal = (function() {

	var cache = {};

	return {
		update: function(updateDate, entityType, done) {
			pg.connect(config.postreg.connectionString, function(err, client) {
			    if(err) {
			      client.end();
			      return console.error('error fetching client from pool', err);
			    }
			    client.query('UPDATE "updatesStatus" SET "updateDate" = $1 WHERE "entityType" = $2',
			    [updateDate, entityType], function(err1, result1) {
			     	if(err1) {
			        	client.end();
			        	return console.error('error running query', err1);
			      	}

			      	done();

              		client.end();
			  	});
			});
		},
		getLastUpdate : function(entityType, done) {
			pg.connect(config.postreg.connectionString, function(err, client) {
			    if(err) {
			      client.end();
			      return console.error('error fetching client from pool', err);
			    }
			    client.query('SELECT * FROM "updatesStatus" WHERE "entityType" = $1',
			    [entityType], function(err1, result) {
			     	if(err1) {
			        	client.end();
			        	return console.error('error running query', err1);
			      	}

			      	done(result.rows[0]);

              		client.end();
			  	});
			});
		}
	}	
}());

exports.updatesStatusDal = updatesStatusDal;