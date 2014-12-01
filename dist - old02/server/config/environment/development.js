'use strict';

// Development specific configuration
// ==================================
module.exports = {
  postreg: {
    connectionString: 'postgres://postgres:Kizi1980!@localhost:5432/onlineMarketer'
  },

  sequelize: {
  	dbname: "onlineMarketer",
  	username: "postgres",
  	password: "Kizi1980!",
  	options: {
      dialect: "postgres",
      port:    5432,
    }
  },

  seedDB: true
};
