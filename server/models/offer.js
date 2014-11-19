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

  //offer.hasOne(models.campaign, { foreignKey: 'id'});

  return offer;
};