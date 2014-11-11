"use strict";

module.exports = function(sequelize, DataTypes) {
  var campaign = sequelize.define("campaign", {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
  	comment: DataTypes.STRING,
  	active: DataTypes.BOOLEAN,
	defaultCpc: DataTypes.FLOAT,
	url: DataTypes.STRING,
	enableRotation: DataTypes.BOOLEAN,
	offers: DataTypes.STRING
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