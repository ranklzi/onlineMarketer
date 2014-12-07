'use strict';

angular.module('onlineMarketerApp')
  .factory('ResolutionTypesService', function ResolutionTypesService($window, EnumsService) {

    var lastSampledResolutionType;

    var resolutionTypesService = {};

    resolutionTypesService.getCurrentResolutionType = function() {
      if ($window.matchMedia("screen and (min-width : 1200px)").matches) {
        return EnumsService.resolutionTypes.Desktop;
      }
      else if ($window.matchMedia("screen and (min-width : 800px) and (max-width : 1200px)").matches) {
        return EnumsService.resolutionTypes.Tablet;
      }
      else if ($window.matchMedia("screen and (min-width : 500px) and (max-width : 800px)").matches) {
        return EnumsService.resolutionTypes.MobileWide;
      }
      else if ($window.matchMedia("screen and (min-width : 300px) and (max-width : 500px)").matches) {
        return EnumsService.resolutionTypes.MobileNarrow;
      }

      return EnumsService.resolutionTypes.Unsupported;
    };

    resolutionTypesService.notifyWhenResolutionTypeChanges = function(changeCallback) {
      lastSampledResolutionType = resolutionTypesService.getCurrentResolutionType();

      //todo - implement listening to width changes
    }

    return resolutionTypesService;
  });
