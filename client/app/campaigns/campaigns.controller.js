'use strict';

angular.module('onlineMarketerApp')
  .controller('CampaignsCtrl', function ($scope, $http, Auth, Campaign) {

    // Use the User $resource to fetch all users
    $scope.users = Campaign.query();
    $scope.campaignStatuses = [{name: "All Campaigns", value:1}, {name: "Active", value:2}, {name: "Inactive", value:3}]
    $scope.selectedCampaignStatus = 1;

    $scope.select2Options = {
        initSelection: angular.noop,
        minimumResultsForSearch: -1
		//tags: ['aaa'],
		//data: { text: "name" }
    };


    $scope.delete = function(campaign) {
      campaign.$remove();
    };
  });
