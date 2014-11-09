'use strict';

angular.module('onlineMarketerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaign', {
        url: '/campaign',
        templateUrl: 'app/campaign/campaign.html',
        controller: 'CampaignCtrl'
      });
  });