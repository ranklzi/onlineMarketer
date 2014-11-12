'use strict';

angular.module('onlineMarketerApp')
  .controller('CampaignCtrl', function ($scope, $http, Campaign, User, $location, $stateParams) {
    $scope.campaignId = $stateParams.id;

    // Use the User $resource to fetch all users
    Campaign.get({id: $scope.campaignId}, function (campaign) {
       $scope.campaign = campaign;
    });

    $scope.update = function() {
      $scope.campaign.$update();
    };
    $scope.create = function() {
      $scope.campaign.$save();
    };
  });
