'use strict';

angular.module('onlineMarketerApp')
  .factory('CommonCookiesService', function CommonCookiesService($cookieStore) {

    var cookieStore = $cookieStore;

    var commonCookiesService = {};
    commonCookiesService.getCommonCookiesToScope = function(scopeToOperateOn) {
      
      if (cookieStore.get('selectedCampaignStatus')) {
        scopeToOperateOn.selectedCampaignStatus = cookieStore.get('selectedCampaignStatus');
      }
      else {
        scopeToOperateOn.selectedCampaignStatus = 1;
      }
      if (cookieStore.get('selectedTimeZone')) {
        scopeToOperateOn.selectedTimeZone = cookieStore.get('selectedTimeZone');
      }
      else {
        scopeToOperateOn.selectedTimeZone = 1; 
      }
      if (cookieStore.get('selectedTimeFrame')) {
        scopeToOperateOn.selectedTimeFrame = cookieStore.get('selectedTimeFrame');
      }
      else {
        scopeToOperateOn.selectedTimeFrame = 1; 
      }
      if (cookieStore.get('selectedFromDate')) {
        scopeToOperateOn.selectedFromDate = cookieStore.get('selectedFromDate');
      }
      else {
        scopeToOperateOn.selectedFromDate = {}; 
      }
      if (cookieStore.get('selectedToDate')) {
        scopeToOperateOn.selectedToDate = cookieStore.get('selectedToDate');
      }
      else {
        scopeToOperateOn.selectedToDate = {}; 
      }
    };

    commonCookiesService.setCommonCookies = function(scopeToReadFrom) {
      
      if (scopeToReadFrom.selectedCampaignStatus) {
        cookieStore.put('selectedCampaignStatus', scopeToReadFrom.selectedCampaignStatus);        
      }
      if (scopeToReadFrom.selectedTimeZone) {
        cookieStore.put('selectedTimeZone', scopeToReadFrom.selectedTimeZone);        
      }
      if (scopeToReadFrom.selectedTimeFrame) {
        cookieStore.put('selectedTimeFrame', scopeToReadFrom.selectedTimeFrame);        
      }
      if (scopeToReadFrom.selectedFromDate) {
        cookieStore.put('selectedFromDate', scopeToReadFrom.selectedFromDate);        
      }
      if (scopeToReadFrom.selectedToDate) {
        cookieStore.put('selectedToDate', scopeToReadFrom.selectedToDate);        
      }
    };

    return commonCookiesService;
  });
