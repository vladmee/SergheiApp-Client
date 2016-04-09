angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $scope.hasResults = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setResults = function(bool) {
        $scope.hasResults = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('SearchCtrl', function($log, $http, $scope, $timeout, $stateParams, ionicMaterialInk,$state, $ionicNavBarDelegate) {
  $scope.$parent.clearFabs();
  $timeout(function() {
      $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();

    $scope.searchCall = function(value) {
      $scope.$parent.setResults(true);
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

  // Set Header
      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.$parent.setHeaderFab('left');

      // Delay expansion
      $timeout(function() {
          $scope.isExpanded = true;
          $scope.$parent.setExpanded(true);
      }, 300);

      // Set Motion
      ionicMaterialMotion.fadeSlideInRight();

      // Set Ink
      ionicMaterialInk.displayEffect();
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
