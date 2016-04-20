amazonfresh.controller('login', function($scope, $http, $state,$rootScope) {
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$rootScope.category="";
	$scope.login = function() {
		alert("hoooo");
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
	$scope.signupCustomer = function() {
		$state.transitionTo('signup');
		$rootScope.category="customer";
	};
	$scope.signupFarmer = function() {
		$state.transitionTo('signup');
		$rootScope.category="farmer";
	};
});


