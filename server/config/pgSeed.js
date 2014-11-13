
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var models = require('../models');
var Campaign = models.campaign;

//delete all campaigns
Campaign.findAll().then(function(campaigns) {
	campaigns.forEach(function(campaign) {
		campaign.destroy().then(function() {
			
		})
	})
}).then(function () {
		Campaign.bulkCreate([
			{
				name : 'UFX UK',     comment : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
				key : '9eb3d85fb594',
			   	active : true,
			   	enableRotation: false,
			   	offers : [
			    JSON.stringify({
			         name: "Google Offer",
			         url: "http://www.google.com"       })
			    ]
			},
			{
				name : 'Ubinary UK',     comment : 'not to go beyond 15 per day',
			   	active : true,
			   	key : '1cc9d85fb27a',
			   	enableRotation: false,
			   	offers : [
			    JSON.stringify({
			         name: "Google Offer",
			         url: "http://www.google.com"       })
			    ]
			}]);
	});




