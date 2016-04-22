amazonfresh.controller('signup', function($scope, $http,$rootScope,$state) {
	$scope.next = function() {

		if ($scope.email != $scope.verifyemail) {
			$scope.IsMatchEmail=true;
			return false;
		}
		$scope.IsMatchEmail=false;
		if ($scope.password != $scope.verifypassword) 
		{
			$scope.IsMatchPassword=true;
			return false;
		}
		$scope.IsMatchPassword=false;
	
		$http({
			method : "POST",
			url : '/createAccount',
			data : {
				"firstName" : $scope.firstName,
				"lastName" : $scope.lastName,
				"email" : $scope.email,
				"password" : $scope.password,
				"category" : $rootScope.category
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				$scope.statusMessage = data.statusMessage;
				
			}
			else if(data.statusCode==403){
				$scope.statusMessage = data.statusMessage;
			}
			else
				$state.transitionTo("addressDetails"); 
		}).error(function(error) {
			$scope.statusMessage = data.statusMessage;
		});
	};

	$scope.nextsplashdelivery = function() {
		$http({
			method : "POST",
			url : '/saveAddress',
			data : {
				"streetAddress" : $scope.streetaddress,
				"city" : $scope.city,
				"state" : $scope.state,
				"zipCode" : $scope.zipcode,
				"phoneNumber" : $scope.phone
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else
			{
				if($rootScope.category=='farmer')
				{
					$state.transitionTo('login');
				}
				else if($rootScope.category=='customer')
					$state.transitionTo("cardDetails");
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};

	$scope.finalsignup = function() {
		$http({
			method : "POST",
			url : '/saveCardDetails',
			data : {
				"cardNumber" : $scope.cardno,
				"cardHolderName" : $scope.cardholdername,
				"cardExpirationMonth" : $scope.expirationmonth,
				"cardExpirationYear" : $scope.expirationyear
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else
			{
				$state.transitionTo('login');
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
})
