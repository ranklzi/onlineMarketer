'use strict';

angular.module('onlineMarketerApp')
  .factory('Timeframes', function() {
    var timeframes =
    [{
      timeframeId: 0,
      name: "All Time"
    },
    {
      timeframeId: 1,
      name: "Today"
    },
    {
      timeframeId: 2,
      name: "Yesterday"
    },
    {
      timeframeId: 3,
      name: "Last 7 Days"
    },
    {
      timeframeId: 4,
      name: "This Week"
    },
    {
      timeframeId: 5,
      name: "Last 14 Days"
    },
    {
      timeframeId: 6,
      name: "This Month"
    },
    {
      timeframeId: 7,
      name: "Last Month"
    },
    {
      timeframeId: 8,
      name: "This Year"
    },
    {
      timeframeId: 9,
      name: "Last Year"
    },
    {
      timeframeId: 10,
      name: "Custom"
    }];

    return timeframes;
    
  });
