angular.module('starter.controllers', [])

.controller('SearchCtrl', function($log, $http, $scope, $timeout, $stateParams, ionicMaterialInk, SearchSrv,$state) {
    ionicMaterialInk.displayEffect();

    $scope.searchCall = function(value) {
      SearchSrv.set(value);
      $state.go('tab.results');
    };

})

.controller('SearchResultsCtrl', function($log, $http,$scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, SearchSrv) {

  $http({
    'mehod': 'GET',
    'url': 'https://sergheiapp-sharebaan.c9users.io/da',
    'headers': {
            'Content-Type': 'application/json'
    },
    'params': {
      'search': SearchSrv.get()
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
