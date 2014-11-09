'use strict';

angular.module('onlineMarketerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('campaign', {
        url: '/campaign/:id',
        templateUrl: 'app/campaign/campaign.html',
        controller: 'CampaignCtrl'
      });
  });