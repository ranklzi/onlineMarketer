'use strict';

angular.module('onlineMarketerApp')
  .controller('CampaignCtrl', function ($scope, $http, Campaign, User, $location, $stateParams) {

    if ($stateParams.id != 'new') {
      $scope.campaignId = $stateParams.id;

      // Use the User $resource to fetch all users
      Campaign.get({id: $scope.campaignId}, function (campaign) {
        console.log(campaign);
         $scope.campaign = campaign;
      });
    }
    else {
      //new campaign
      var campaign = new Campaign({
        name : '',     comment : '',
        active : true,
        enableRotation: false,
        offers : [
        JSON.stringify({
             name: "Google Offer",
             url: "http://www.google.com"      
           })
        ]
      });

      $scope.campaign = campaign;

      //console.log($scope.campaign);
    }

    var calcWeightSum = function() {
      var weightSum = 0;

      if ($scope.campaign && $scope.campaign.offers && $scope.campaign.offers.length > 0) {
        for (var i = 0; i < $scope.campaign.offers.length; i++) { 
          if ($scope.campaign.offers[i].splitWeight) {
            weightSum = weightSum + $scope.campaign.offers[i].splitWeight;
          }
        }
      }

      return weightSum;
    }

    $scope.save = function() {

      $scope.campaign.weightSum = calcWeightSum();

      if (!$scope.campaign.id) {
        $scope.campaign.$save();
      }
      else {
        $scope.campaign.$update();
      }
    };

    $scope.addOffer = function() {
      $scope.campaign.offers.push({});
    };
    
  });
