'use strict';

angular.module('onlineMarketerApp')
  .factory('EnumsService', function () {
    var enumsService = {};

    enumsService.resolutionTypes = {
    	Unsupported: 0,
    	MobileNarrow: 1,
    	MobileWide: 2,
    	Tablet: 3,
    	Desktop: 4,
    };


    return enumsService;
  });
