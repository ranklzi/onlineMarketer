"use strict";

module.exports = function(sequelize, DataTypes) {
  var campaign = sequelize.define("campaign", {
    name: DataTypes.STRING,
  	comment: DataTypes.TEXT,
  	active: DataTypes.BOOLEAN,
  	defaultCpc: DataTypes.FLOAT,
  	url: DataTypes.STRING,
  	enableRotation: DataTypes.BOOLEAN,
  	offers: DataTypes.ARRAY(DataTypes.TEXT),
    useTokens: DataTypes.BOOLEAN,
    key: DataTypes.STRING
  }//, {
  //   classMethods: {
  //     associate: function(models) {
  //       campaign.hasMany(models.Task)
  //     }
  //  }
  //}
  );

  return campaign;
};