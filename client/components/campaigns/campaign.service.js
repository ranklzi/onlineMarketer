'use strict';

angular.module('onlineMarketerApp')
  .factory('Campaign', function ($resource) {
    return $resource('/api/campaigns/manage/:id/:controller', { id: '@_id' },
    	{ update : { method: 'PUT' } });
  });
