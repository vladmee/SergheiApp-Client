angular.module('starter.controllers', [])

.controller('SearchCtrl', function($log, $http, $scope, $timeout, $stateParams, ionicMaterialInk,$state) {
    ionicMaterialInk.displayEffect();

    $scope.searchCall = function(value) {
      $state.go('tab.results', {'search': value});
    };

})

.controller('SearchResultsCtrl', function($log, $http,$scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

  $http({
    'mehod': 'GET',
    'url': 'https://sergheiapp-sharebaan.c9users.io/search',
    'headers': {
            'Content-Type': 'application/json'
    },
    'params': {
      'find': $stateParams.search
    }
  }).then(function(res) {
      $scope.results= res;
      $log.info($scope.results);
  });

    // ionicMaterialInk.displayEffect();
    //
    // ionicMaterialMotion.pushDown({
    //     selector: '.push-down'
    // });
    // ionicMaterialMotion.fadeSlideInRight({
    //     selector: '.animate-fade-slide-in .item'
    // });

});
