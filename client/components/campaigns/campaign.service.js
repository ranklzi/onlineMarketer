'use strict';

angular.module('onlineMarketerApp')
  .factory('Campaign', function ($resource) {
    return $resource('/api/campaigns/:id/:controller', {
      id: '@_id'
    });
  });
