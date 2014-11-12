var Sequelize = require('sequelize');
var config = require('../config/environment');

console.log(config.postgres + "#$%#%#$%#$%#$^$^$%$^");
// initialize database connection
var sequelize = new Sequelize(
  config.sequelize.dbname,
  config.sequelize.username,
  config.sequelize.password,
  config.sequelize.options
);

// load models
var models = [
  'campaign'
];
models.forEach(function(model) {
  console.log(__dirname + '/' + model);
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
// (function(m) {
//   m.PhoneNumber.belongsTo(m.User);
//   m.Task.belongsTo(m.User);
//   m.User.hasMany(m.Task);
//   m.User.hasMany(m.PhoneNumber);
// })(module.exports);

// export connection
module.exports.sequelize = sequelize;