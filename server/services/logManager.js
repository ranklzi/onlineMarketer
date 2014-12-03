'use strict';

var winston = require('winston');

var logManager = (function() {

	winston.add(winston.transports.File, { 
		filename: 'log/server.log', 
		level: 'info'
		//maxsize: 1000,
		//maxFiles: 20
	});

	return {
		logger: function() {
			return winston;
		}
	}
}());

exports.logManager = logManager;