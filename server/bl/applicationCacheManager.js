'use strict';

var applicationCacheManager = (function() {

	var cacheManager = require('../services/cacheManager').cacheManager;
	var campaignsDal = require('../dal/campaignsDal');
	var updatesStatusDal = require('../dal/updatesStatusDal').updatesStatusDal;

	var lastUpdated;

	var setCampaignsToCache = function(done) {				
			console.log('setCampaignsToCache called');		
			campaignsDal.getOffersWithCampaignsData(function (offersExtended) {
				cacheManager.clear();

				for (var i = 0;i< offersExtended.length;i++) {

					var offerRow = offersExtended[i];

					if (!cacheManager.containsKey(offerRow.campaignKey)) {
						//add campaign
						var newCampaign = {
							id: offerRow.campaignId,
							name: offerRow.campaignName,
							active: offerRow.campaignActive,
							defaultCpc: offerRow.defaultCpc,
							enableRotation: offerRow.enableRotation,
							useTokens: offerRow.useTokens,
							concatenateClickId: offerRow.concatenateClickId,
							weightSum: offerRow.weightSum,
							offers : []
						};

						cacheManager.setValue(offerRow.campaignKey, newCampaign);
					}

					var campaign = cacheManager.getValue(offerRow.campaignKey);

					var offer = {
						id: offerRow.offerId,
						name: offerRow.offerName,
						active: offerRow.offerAcitve,
						url: offerRow.offerUrl,
						payout: offerRow.payout,
						splitWeight: offerRow.splitWeight
					};

					campaign.offers.push(offer);

					cacheManager.setValue(offerRow.campaignKey, campaign);
				}
				console.log('setCampaignsToCache completed');

				done();

				lastUpdated = new Date();

			});
		};

	var updateCacheIfNeeded = function() {
		updatesStatusDal.getLastUpdate(1, function(lastUpdate) {

			if (!lastUpdated || lastUpdated < new Date(lastUpdate.updateDate)) {
				setCampaignsToCache(function() {
					console.log('campaignsUpdatedToCached..............');
					lastUpdated = new Date(lastUpdate.updateDate);
				});
			}
		});
	};

	return {

		setCampaignsToCache: setCampaignsToCache,
		updateCacheIfNeeded: updateCacheIfNeeded,
		getCampaign: function(key) {
			return cacheManager.getValue(key);
		}
	}
}());

exports.applicationCacheManager = applicationCacheManager;