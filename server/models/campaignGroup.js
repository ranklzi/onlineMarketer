"use strict";

module.exports = function(sequelize, DataTypes) {
  var campaignGroup = sequelize.define("campaignGroup", {
    name: DataTypes.STRING,
  	comment: DataTypes.TEXT,
  	active: DataTypes.BOOLEAN,
  	type: DataTypes.INTEGER
  }//, {
  //   classMethods: {
  //     associate: function(models) {
  //       campaign.hasMany(models.Task)
  //     }
  //  }
  //}
  );

  return campaignGroup;
};