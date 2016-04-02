angular.module('starter.controllers', [])

.controller('SearchCtrl', function($log, $http, $scope, $timeout, $stateParams, ionicMaterialInk) {
    ionicMaterialInk.displayEffect();

    $scope.searchCall = function(value) {
      $http({
        'mehod': 'GET',
        'url': 'https://sergheiapp-sharebaan.c9users.io/da',
        'headers': {
                'Content-Type': 'application/json'
        },
        'params': {
          'search': value
        }
      }).then(function(res) {
          $log.info(res);
      });
    };

});
