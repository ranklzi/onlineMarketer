// load services
var services = [
  'guidGenerator'
];
services.forEach(function(service) {
	//todo - make generic
	module.exports[service] = require('./guidGenerator');
});