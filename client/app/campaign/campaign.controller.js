'use strict';

angular.module('onlineMarketerApp')
  .controller('CampaignCtrl', function ($scope, $http, Campaign, User, $location) {
    $scope.campaignId = $location.search().id;
    
    // Use the User $resource to fetch all users
    $scope.users = Campaign.query();

    $scope.delete = function(user) {
      Campaign.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
