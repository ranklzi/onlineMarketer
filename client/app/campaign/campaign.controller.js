'use strict';

angular.module('onlineMarketerApp')
  .controller('CampaignCtrl', function ($scope, $http, Campaign, User, $location, $stateParams) {
    $scope.campaignId = $stateParams.id;

    // Use the User $resource to fetch all users
    $scope.users = Campaign.query();
    Campaign.get({id: $scope.campaignId}, function (campaign) {
      $scope.campaign = campaign;
    });

    $scope.save = function() {
      $scope.campaign.$update();
    };
  });
