"use strict";

var models = require ('../models');

module.exports = function(sequelize, DataTypes) {

  var offer = sequelize.define("offer", {
    id: {
      //primaryKey: true,
      type: DataTypes.INTEGER
    },
    campaignId: 
    {
      type: DataTypes.INTEGER,
      references: 'campaign',
      referencesKey: 'id',
      allowNull: false
    },
    name: DataTypes.STRING,
    inActive: DataTypes.BOOLEAN,
    url: DataTypes.STRING,
    payout: DataTypes.FLOAT,
    splitWeight: DataTypes.INTEGER
  }
  //, {
  //   classMethods: {
  //     associate: function(models) {
  //       offer.hasMany(models.Task)
  //     }
  //  }
  //}
  );

  var campaign = sequelize.define("campaign", {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  	comment: DataTypes.TEXT,
  	active: DataTypes.BOOLEAN,
  	defaultCpc: DataTypes.FLOAT,
  	url: DataTypes.STRING,
  	enableRotation: DataTypes.BOOLEAN,
  	useTokens: DataTypes.BOOLEAN,
    key: DataTypes.STRING
  }
  //, {
  //   classMethods: {
  //     associate: function(models) {
  //       campaign.hasMany(models.Task)
  //     }
  //  }
  //}
  );

  campaign.hasMany(offer, { as: 'offers', foreignKey: 'campaignId'})

  return campaign;
};