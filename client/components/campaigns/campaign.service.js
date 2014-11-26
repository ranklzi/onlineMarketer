'use strict';

angular.module('onlineMarketerApp')
  .factory('Campaign', function ($resource) {
    return $resource('/api/campaigns/:id/', { id: '@id' },
    	{ update : { method: 'PUT' }, remove : { method: 'DELETE' }, save : { method: 'POST' }
    	
    });
  });
