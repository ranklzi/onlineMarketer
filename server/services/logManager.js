'use strict';

var winston = require('winston');

var logManager = (function() {

	winston.add(winston.transports.File, { filename: 'log/server.log' });

	return {
		logger: function() {
			return winston;
		}
	}
}());

exports.logManager = logManager;