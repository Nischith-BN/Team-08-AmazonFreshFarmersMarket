amazonfresh.controller('admin', function($scope, $http, $state, $rootScope) {
	$scope.initFarmerApprovals = function() {
		$scope.showFarmerModal = false;
		$scope.showCustomerModal = false;
		$scope.showProductModal = false;
		
		$http({
			method : "GET",
			url : '/listFarmerRequests',
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				
				$scope.statusMessageFarmer = data.statusMessage;
			}
			else if (data.statusCode == 401) {
				
				$scope.statusMessageFarmer = data.statusMessage;
			}
			else
				{
				
				 $scope.listFarmerApprovals = data.results;
				 alert($scope.listFarmerApprovals)
				 

				}
		}).error(function(error) {
			$scope.statusMessageFarmer = data.statusMessage;
			
		});
	}

	$scope.initCustomerApprovals = function() {
		
		$scope.norequests = true;
		$http({
			method : "GET",
			url : '/listCustomerRequests',
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				
				$scope.statusMessageCustomer = data.statusMessage;
			}
			else if (data.statusCode == 401) {
				
				$scope.statusMessageCustomer = data.statusMessage;
			}
			else
				{
				 $scope.listCustomerApprovals = data.results;
				 
				}
			
		}).error(function(error) {
			
			$scope.statusMessageCustomer = data.statusMessage;
		});
	}
	$scope.initProductApprovals = function() {
		
		$http({
			method : "GET",
			url : '/listProductRequests',
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				
				$scope.statusMessageProduct = data.statusMessage;
			}
			else if (data.statusCode == 401) {
				
				$scope.statusMessageProduct = data.statusMessage;
			}
			else
				{
				 $scope.listProductApprovals = data.results;
				}
		}).error(function(error) {
			$scope.statusMessageProduct = data.statusMessage;
			
		});
	}
	
// Approval Acceptance Functions
	$scope.approveFarmer = function(farmer_id) {
		
		alert(farmer_id)
		$http({
			method : "POST",
			url : '/approveFarmer',
			data : {
				"farmerId":farmer_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				
			}
			else if (data.statusCode == 401) {
				$scope.unexpected_error = false;
			}
			else
				{
				 $scope.initFarmerApprovals();
				}
		}).error(function(error) {
			$scope.unexpected_error = false;
			
		});
	}
	$scope.approveCustomer = function(customer_id) {
		
		$scope.unexpected_error = true;
		$http({
			method : "GET",
			url : '/approveCustomer',
			data : {
				"customerId":customer_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
			
			}
			else if (data.statusCode == 401) {
				$scope.unexpected_error = false;
			}
			else
				{
				 $scope.initCustomerApprovals();
				}
		}).error(function(error) {
			$scope.unexpected_error = false;
			
		});
	}
	$scope.approveProduct = function(product_id) {
		
		$scope.unexpected_error = true;
		$http({
			method : "GET",
			url : '/approveProduct',
			data : {
				"productId":product_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
		
			}
			else if (data.statusCode == 401) {
				$scope.unexpected_error = false;
			}
			else
				{
				 $scope.initProductApprovals();
				}
		}).error(function(error) {
			$scope.unexpected_error = false;
			
		});
	}
// Approval Rejection Function
	$scope.rejectFarmer = function(farmer_id) {
		
		$scope.unexpected_error = true;
		$http({
			method : "GET",
			url : '/rejectFarmer',
			data : {
				"farmerId":farmer_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				
			}
			else if (data.statusCode == 401) {
				$scope.unexpected_error = false;
			}
			else
				{
				 $scope.initFarmerApprovals();
				}
		}).error(function(error) {
			$scope.unexpected_error = false;
			
		});
	}
	$scope.rejectCustomer = function(customer_id) {
		
		$scope.unexpected_error = true;
		$http({
			method : "GET",
			url : '/rejectCustomer',
			data : {
				"customerId":customer_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
			
			}
			else if (data.statusCode == 401) {
				$scope.unexpected_error = false;
			}
			else
				{
				 $scope.initCustomerApprovals();
				}
		}).error(function(error) {
			$scope.unexpected_error = false;
			
		});
	}
	$scope.rejectProduct = function(product_id) {
		
		$scope.unexpected_error = true;
		$http({
			method : "GET",
			url : '/rejectProduct',
			data : {
				"productId":product_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
		
			}
			else if (data.statusCode == 401) {
				$scope.unexpected_error = false;
			}
			else
				{
				 $scope.initProductApprovals();
				}
		}).error(function(error) {
			$scope.unexpected_error = false;
			
		});
	}
	
	//Showing Detail Function
	
	$scope.showFarmerDetail = function(index) {
		$scope.farmerfirstname = $scope.listFarmerApprovals[index].fistname;
		$scope.farmerlastname = $scope.listFarmerApprovals[index].lastname;
		$scope.farmeraddress = $scope.listFarmerApprovals[index].address;
		$scope.farmercity = $scope.listFarmerApprovals[index].city;
		$scope.farmerstate = $scope.listFarmerApprovals[index].state;
		$scope.farmerzipcode = $scope.listFarmerApprovals[index].zipcode;
		$scope.farmeremail = $scope.listFarmerApprovals[index].email;
	
		$scope.showFarmerModal = !$scope.showFarmerModal;
	}
	$scope.showCustomerDetail = function(index) {
		$scope.customerfirstname = $scope.listCustomerApprovals[index].fistname;
		$scope.customerlastname = $scope.listCustomerApprovals[index].lastname;
		$scope.customeraddress = $scope.listCustomerApprovals[index].address;
		$scope.customercity = $scope.listCustomerApprovals[index].city;
		$scope.customerstate = $scope.listCustomerApprovals[index].state;
		$scope.customerzipcode = $scope.listCustomerApprovals[index].zipcode;
		$scope.customeremail = $scope.listCustomerApprovals[index].email;
		
		$scope.showCustomerModal = !$scope.showCustomerModal;
	}
	$scope.showProductDetail = function(index) {
		$scope.productname = $scope.listProductApprovals[index].product_name;
		$scope.farmerfirstname = $scope.listProductApprovals[index].lastname;
		$scope.farmerlastname = $scope.listProductApprovals[index].address;
		$scope.productprice = $scope.listProductApprovals[index].product_price;
		$scope.productdescription = $scope.listProductApprovals[index].product_description;
		$scope.productquantity = $scope.listProductApprovals[index].product_quantity;
		
		
		$scope.showProductModal = !$scope.showProductModal;
	}
	
});