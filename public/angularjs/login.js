var amazonfresh = angular.module('amazonfresh', [ 'ui.router' ]).config(
		function($stateProvider, $urlRouterProvider, $locationProvider) {
			$locationProvider.html5Mode(true);
			$stateProvider.state('login', {
				url : '/',
				templateUrl : 'templates/login.html'
				
			})
			.state('successful',{
				template: '<h1>Successfullogin</h1>'
			})
			$urlRouterProvider.otherwise('/');
		});

amazonfresh.controller('login', function($scope, $http,$state) {
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.login = function() {
		$http({
			method : "POST",
			url : '/afterLogin',
			data : {
				"email" : $scope.email,
				"password" : $scope.password
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else if (data.statusCode == 401) {
				$scope.invalid_login = true;
				$scope.unexpected_error = false;
			}
			else
				{
				 $state.transitionTo('successful');
				}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
});
