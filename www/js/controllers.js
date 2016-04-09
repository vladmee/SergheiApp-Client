angular.module('starter.controllers', [])

.controller('SearchCtrl', function($log, $http, $scope, $timeout, $stateParams, ionicMaterialInk,$state, $ionicNavBarDelegate) {
    ionicMaterialInk.displayEffect();
    $scope.find = "Slimy";

    $scope.searchCall = function(value) {
      $state.go('tab.results', {'search': value});
    };

})

.controller('SearchResultsCtrl', function($log, $http,$scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

  $scope.find = $stateParams.search;

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

})

.directive('searchBar', [function () {
	return {
		scope: {
			ngModel: '='
		},
		require: ['^ionNavBar', '?ngModel'],
		restrict: 'E',
		replace: true,
		template: '<ion-nav-buttons side="right">'+
						'<div class="searchBar">'+
							'<div class="searchTxt" ng-show="ngModel.show">'+
						  		'<div class="bgdiv"></div>'+
						  		'<div class="bgtxt">'+
						  			'<input type="text" placeholder="Search" ng-model="ngModel.txt">'+
						  		'</div>'+
					  		'</div>'+
						  	'<i class="icon placeholder-icon" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show"></i>'+
						'</div>'+
					'</ion-nav-buttons>',

		compile: function (element, attrs) {
			var icon=attrs.icon
					|| (ionic.Platform.isAndroid() && 'ion-android-search')
					|| (ionic.Platform.isIOS()     && 'ion-ios-search')
					|| 'ion-ios-search';
			angular.element(element[0].querySelector('.icon')).addClass(icon);

			return function($scope, $element, $attrs, ctrls) {
				var navBarCtrl = ctrls[0];
				$scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;

			};
		},
		controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
			var title, definedClass;
			$scope.$watch('ngModel.show', function(showing, oldVal, scope) {
				if(showing!==oldVal) {
					if(showing) {
						if(!definedClass) {
							var numicons=$scope.navElement.children().length;
							angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
						}

						title = $ionicNavBarDelegate.title();
						$ionicNavBarDelegate.title('');
					} else {
						$ionicNavBarDelegate.title(title);
					}
				} else if (!title) {
					title = $ionicNavBarDelegate.title();
				}
			});
		}]
	};
}]);
