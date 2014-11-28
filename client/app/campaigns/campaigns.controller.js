'use strict';

angular.module('onlineMarketerApp')
  .controller('CampaignsCtrl', function ($scope, $http, Auth, Campaign) {

    // Use the User $resource to fetch all users
    $scope.users = Campaign.query();

    $scope.delete = function(campaign) {
      campaign.$remove();
    };
  });
