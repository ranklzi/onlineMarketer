'use strict';

angular.module('onlineMarketerApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    //todo - remove this auto login
    Auth.login({
          email: 'rankizi@gmail.com',
          password: 'kizikizi'
        }).then( function() {
          // Logged in, redirect to home
          console.log('login success');
          $location.path('/');
        });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
