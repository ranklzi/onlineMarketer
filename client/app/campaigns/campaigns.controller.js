
angular.module('onlineMarketerApp')
  .controller('CampaignsCtrl', function ($scope, $http, $modal, Auth, Campaign, Timezones, Timeframes, EnumsService, ResolutionTypesService, CommonCookiesService) {
  	
	$scope.campaignStatuses = [{name: "All Campaigns", value:1}, {name: "Active", value:2}, {name: "Inactive", value:3}];
	$scope.timezones = Timezones;
	$scope.timeframes = Timeframes;
	$scope.resolutionType = ResolutionTypesService.getCurrentResolutionType();
	$scope.modalInstance = {};

	CommonCookiesService.getCommonCookiesToScope($scope);

	var fetchData = function() {
    	var dateRange = $scope.calculateDateRange($scope);

    	//http://localhost:9000/api/campaigns?from=2014-12-06T06:19:06.355Z&to=2014-12-07T06:19:06.355Z
    	$scope.campaigns = Campaign.query(dateRange);

    };
    
    $scope.simpleSelectOptions = {
        initSelection: angular.noop,
        minimumResultsForSearch: -1
    };

    $scope.refresh = function() {

    	fetchData();

      	CommonCookiesService.setCommonCookies($scope);
    };

    $scope.calculateDateRange = function(scope) {

    	var dateRange = {};
    	var from = new Date();
    	var to = new Date();
    	
    	if ($scope.selectedTimeFrame == 0) {
    		//all time
    		from.setDate(from.getDate()-1000);
    	}
    	else if ($scope.selectedTimeFrame == 1) {
    		//today
    		from.setDate(from.getDate()-1);
    	}
    	else if ($scope.selectedTimeFrame == 2) {
    		//yesterday
    		from.setDate(from.getDate()-1);
    		from.setHour(0, 0, 0);
    		to.setDate(from.getDate()-1);
    		to.setHour(23, 59, 59);
    	}
    	else if ($scope.selectedTimeFrame == 3) {
    		//last 7 days
    		from.setDate(from.getDate()-7);
    		from.setHour(0, 0, 0);
    	}
    	else if ($scope.selectedTimeFrame == 4) {
    		//this week
    		from.setDate(from.getDate()-from.getDay());
    		from.setHour(0, 0, 0);
    	}
    	else if ($scope.selectedTimeFrame == 5) {
    		//last 14 Days
    		from.setDate(from.getDate()-14);
    		from.setHour(0, 0, 0);
    	}
    	else if ($scope.selectedTimeFrame == 6) {
    		//this Month
    		from.setDate(0);
    		from.setHour(0, 0, 0);
    	}
    	else if ($scope.selectedTimeFrame == 7) {
    		//last Month
    		if (from.getMonth() == 0) {
    			from.setYear(from.getYear()-1);
    			from.setMonth(11);
    		}
    		else {
    			from.setMonth(from.getMonth()-1);
    		}
    		from.setDate(1);
    		from.setHour(0, 0, 0);

    		to = from;
    		to.addMonth(1);
    	}
    	else if ($scope.selectedTimeFrame == 8) {
    		//this year
    		from.setDate(1);
    		from.setMonth(0);
    	}
    	else if ($scope.selectedTimeFrame == 9) {
    		//last year
    		from.setDate(1);
    		from.setMonth(0);
    		from.setYear(from.getYear()-1);
    		to.setDate(1);
    		to.setMonth(0);
    	}
    	else if ($scope.selectedTimeFrame == 10) {
    		//custom - read from controls
    		from.setDate(from.getDate()-14);
    		from.setHour(0, 0, 0);
    	}

    	dateRange.from = from;
    	dateRange.to = to;

    	return dateRange;

    };
    
    $scope.delete = function(campaign) {
      campaign.$remove();
    };

    $scope.clickCampaignRow = function (campaign) {
  		if (ResolutionTypesService.getCurrentResolutionType() == EnumsService.resolutionTypes.MobileNarrow ||
  			ResolutionTypesService.getCurrentResolutionType() == EnumsService.resolutionTypes.MobileWide) {

	    	$scope.modalInstance = $modal.open({
	    		templateUrl: 'app/generalViews/contextMenuCampaigns.html',
	      		controller: 'ContextMenuCampaignsCtrl',
	      		//size: size,
	      		resolve: {
	        		campaign: function () {
	          			return campaign;
	        		}
	      		}
	    	});

	    	$scope.modalInstance.result.then(function (selectedItem) {
	      			$scope.selected = selectedItem;
	    		}, function () {
	      		console.log('Modal dismissed at: ' + new Date());
	    	});
	    }
  	};

  	//fetching campaigns data from server
  	fetchData();


  	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
  		if ($scope.modalInstance) {
  			$scope.modalInstance.close(); 
  		}
  	});
});
