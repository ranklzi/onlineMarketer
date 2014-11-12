// load services
var services = [
  'guidGenerator'
];
services.forEach(function(service) {
  console.log(__dirname + '/' + service);
  module.exports[service] = require('./guidGenerator');
});