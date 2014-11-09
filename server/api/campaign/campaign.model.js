'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSchema = new Schema({
  name: String,
  comment: String,
  active: Boolean,
  defaultCpc: Number,
  url: String,
  enableRotation: Boolean,
  offers: Array
});

module.exports = mongoose.model('Campaign', CampaignSchema);