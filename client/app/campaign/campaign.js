'use strict';

angular.module('onlineMarketerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaign', {
        url: '/campaign',
        templateUrl: 'app/campaigns/campaign.html',
        controller: 'CampaignCtrl'
      });
  });