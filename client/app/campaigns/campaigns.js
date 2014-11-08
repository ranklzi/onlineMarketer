'use strict';

angular.module('onlineMarketerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaigns', {
        url: '/campaigns',
        templateUrl: 'app/campaigns/campaigns.html',
        controller: 'CampaignsCtrl'
      });
  });