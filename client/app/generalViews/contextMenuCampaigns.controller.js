'use strict';

angular.module('onlineMarketerApp')
  .controller('ContextMenuCampaignsCtrl', function ($scope, $location, campaign) {
    $scope.campaign = campaign;

    $scope.editClick = function() {
      $location.path("/campaign/" + campaign.id);
    };

});
