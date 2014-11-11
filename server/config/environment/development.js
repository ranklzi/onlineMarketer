'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/onlinemarketer-dev'
  },

  sequelize: {
  	dbname: "onlineMarketer",
  	username: "postgres",
  	password: "",
  	options: {
      dialect: "postgres",
      port:    5432,
    }
  },

  seedDB: true
};
