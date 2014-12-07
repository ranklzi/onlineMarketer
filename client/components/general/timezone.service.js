'use strict';

angular.module('onlineMarketerApp')
  .factory('Timezones', function() {
    var timezones =
    [{
      timezoneId: 1,
      gmt: 0,
      name: "UTC (Default)"
    },
    {
      timezoneId: 2,
      gmt: -11,
      name: "Pacific/Samoa"
    },
    {
      timezoneId: 3,
      gmt: -10,
      name: "Pacific/Honolulu"
    },
    {
      timezoneId: 4,
      gmt: -9,
      name: "America/Anchorage"
    }];

    return timezones;
    
  });
