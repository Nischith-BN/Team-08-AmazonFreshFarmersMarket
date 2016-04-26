amazonfresh.controller('admin', function($scope, $http, $state, $rootScope) {
	$scope.showMap= true;
	$scope.showBillModal = false;
	$scope.showRevenue= true;
	$scope.viewrequests = function() {
		$state.transitionTo("adminsuccessful");
	}
	
	$scope.searchbill = function() {
		$state.transitionTo("searchbill");
	}
	$scope.statisticsdata = function() {
		$state.transitionTo("deliverydetails");
	}
	
	$scope.viewcustomeraccounts = function() {
		$state.transitionTo("customerdetails");
	}
	$scope.initFarmerApprovals = function() {
		$scope.showFarmerModal = false;
		$scope.showCustomerModal = false;
		$scope.showProductModal = false;
		$scope.hideFarmer = false;
		$http({
			method : "GET",
			url : '/listFarmerRequests',
		}).success(function(data) {
			
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.hideFarmer = true;
				$scope.statusMessageFarmer = data.statusMessage;
				
			}
			else if (data.statusCode == 401) {
				
				$scope.statusMessageFarmer = data.statusMessage;
			}
			else
				{
			
				 $scope.listFarmerApprovals = data.results;

				}
		}).error(function(error) {
			$scope.statusMessageFarmer = data.statusMessage;
			
		});
	}

	$scope.initCustomerApprovals = function() {
		$scope.hideCustomer = false;
		$scope.norequests = true;
		$http({
			method : "GET",
			url : '/listCustomerRequests',
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.hideCustomer = true;
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
		$scope.hideProduct = false;
		$http({
			method : "GET",
			url : '/listProductRequests',
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.hideProduct = true;
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
		
		$http({
			method : "POST",
			url : '/approveFarmer',
			data : {
				"farmerId":farmer_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			
			if (data.statusCode == 403) {	
				$scope.initFarmerApprovals();
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
			method : "POST",
			url : '/approveCustomer',
			data : {
				"customerId":customer_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.initCustomerApprovals();
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
			method : "POST",
			url : '/approveProduct',
			data : {
				"productId":product_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.initProductApprovals();
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
			method : "POST",
			url : '/rejectFarmer',
			data : {
				"farmerId":farmer_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.initFarmerApprovals();
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
			method : "POST",
			url : '/rejectCustomer',
			data : {
				"customerId":customer_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.initCustomerApprovals();
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
			method : "POST",
			url : '/rejectProduct',
			data : {
				"productId":product_id
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.initProductApprovals();
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
	
	//Rides
	
	$scope.viewridedata = function() {
		$state.transitionTo("ridedetails");
	}
	$scope.searchride = function() {	
		 
			$http({
				method : "POST",
				url : '/fetchRidesDetails',
				data : {
					"category":document.getElementById("category").value,
					"searchString":document.getElementById("searchstring").value
				}
			}).success(function(data) {
				
				//checking the response data for statusCode
				if (data.statusCode == 403) {
					
					$scope.statusMessage= data.statusMessage;
					
				}
				else if (data.statusCode == 401) {
					
					$scope.statusMessage = data.statusMessage;
				}
				else
					{
					$scope.rides = data.results;
					var map = new google.maps.Map(document.getElementById('map'), {
					      zoom: 8,
					      center: new google.maps.LatLng(42.00, -88.00),
					      mapTypeId: google.maps.MapTypeId.TERRAIN
					    });

						
						var points = '{"points":'+JSON.stringify(data.results)+'}';
							var pointsObject = JSON.parse(points);
							
							for (var point in pointsObject.points)
							{
							 geocodeLine1(pointsObject.points[point].pickup_location_latitude, pointsObject.points[point].pickup_location_longitude,pointsObject.points[point].dropoff_location_latitude, pointsObject.points[point].dropoff_location_longitude);		
							}
							
					       
					    function geocodeLine1(pointLat1, pointLon1,pointLat2,pointLon2)
					    {
					        var gc = new google.maps.Geocoder();
							
							 
							 	  
								  var source = new google.maps.LatLng(pointLat1, pointLon1);

					  // Draw a circle around the radius
					  var circle = new google.maps.Circle({
					    center: source,
					    radius: 2000, //convert miles to meters
					    strokeColor: "#0000FF",
					    strokeOpacity: 0.4,
					    strokeWeight: 4,
					    fillColor: "#0000FF",
					    fillOpacity:0.4
					   });          
					   circle.setMap(map);  
					   
					   var destination = new google.maps.LatLng(pointLat2, pointLon2);

					  // Draw a circle around the radius
					  var circle = new google.maps.Circle({
					    center: destination,
					    radius: 1000, //convert miles to meters
					    strokeColor: "#0000FF",
					    strokeOpacity: 0.4,
					    strokeWeight: 4,
					    fillColor: "#0000FF",
					    fillOpacity: 0.4
					   });          
					   circle.setMap(map); 
									  
					              new google.maps.Polyline({
					                path: [
					                  new google.maps.LatLng(pointLat1, pointLon1), 
									  new google.maps.LatLng(pointLat2, pointLon2)
					                ],
					                strokeColor: '#FF0000',
									strokeWeight: 1,
					                geodesic: true,
					                map: map
					                });
					    }
					
					
					$scope.showMap = false;
					}
			}).error(function(error) {
				$scope.statusMessage = data.statusMessage;
				
			});
		}
	$scope.searchbillby = function() {
		var searchString = "";
		var category = document.getElementById("category").value;
		if(category == "date"){
			searchString = document.getElementById("inputdate").value;
		}
		else if(category == "customer"){
			searchString = document.getElementById("inputcustomername").value;
		}
		else{
			searchString = document.getElementById("inputbillingid").value;
		}
		
		$http({
			method : "POST",
			url : '/searchBillDetails',
			data : {
				"searchString":searchString,
				"category" : category
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.showMap= false;
				$scope.statusMessage = data.statusMessage;
			}
			else if (data.statusCode == 401) {
				$scope.showMap= false;
				$scope.statusMessage = data.statusMessage;
			}
			else
				{
				$scope.showMap= false;
				 $scope.bills = data.results;
				}
		}).error(function(error) {
			$scope.statusMessage = data.statusMessage;
			
		});
		
	}
	$scope.showBillDetail = function(value) {
		$scope.billvalues = value;
		$scope.showBillModal = !$scope.showBillModal;
	}
	
	$scope.deliverydetails = function() {
		var area =document.getElementById("inputarea").value;
			
		$http({
			method : "POST",
			url : '/fetchDeliveryDetails',
			data : {
				"area":area,
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.showMap= false;
				$scope.statusMessage = data.statusMessage;
			}
			else if (data.statusCode == 401) {
				$scope.showMap= false;
				$scope.statusMessage = data.statusMessage;
			}
			else
				{
				$scope.showMap= false;
				 $scope.bills = data.results;
				}
		}).error(function(error) {
			$scope.statusMessage = data.statusMessage;
			
		});
		
	}
	$scope.showDeliveryDetail = function(value) {
		$scope.billvalues = value;
		$scope.showDeliveryModal = !$scope.showDeliveryModal;
	}
	
	$scope.viewcustomernames = function() {
		//var area =document.getElementById("inputarea").value;
			
		$http({
			method : "GET",
			url : '/listAllCustomers',
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.statusMessage = data.statusMessage;
			}
			else if (data.statusCode == 401) {
				$scope.statusMessage = data.statusMessage;
			}
			else
				{
				 $scope.customers = data.results;
				}
		}).error(function(error) {
			$scope.statusMessage = data.statusMessage;
			
		});
		
	}
	$scope.showCustomerDetail = function(customer) {
		
			
		$http({
			method : "GET",
			url : '/fetchCustomerDetails',
			data : {
				"customerId":customer.customer_id,
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.showMap= false;
				$scope.statusMessage = data.statusMessage;
			}
			else if (data.statusCode == 401) {
				$scope.showMap= false;
				$scope.statusMessage = data.statusMessage;
			}
			else
				{
				$scope.showMap= false;
				 $scope.bills = data.results;
				}
		}).error(function(error) {
			$scope.statusMessage = data.statusMessage;
			
		});
		
	}
	$scope.showCustomerFullDetail = function(value) {
		$scope.billvalues = value;
		$scope.showCustomerModal = !$scope.showCustomerModal;
	}
	
	$scope.revenue = function() {
		var to =document.getElementById("inputtodate").value;
		var from =document.getElementById("inputfromdate").value;
		var d1 = new Date(to);
		var d2 = new Date(from);
		
		if(daydiff(d1, d2)!=7){
			$scope.showRevenue= false;
			$scope.statusMessage = "Please enter proper dates!"
			return;
		}
		$http({
			method : "POST",
			url : '/fetchStatisticsData',
			data : {
				"to":to,
				"from":from
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.showRevenue= false;
				$scope.statusMessage = data.statusMessage;
			}
			else if (data.statusCode == 401) {
				$scope.showRevenue= false;
				$scope.statusMessage = data.statusMessage;
			}
			else
				{
				 // Load the Visualization API and the corechart package.
			      google.charts.load('current', {'packages':['corechart']});

			      // Set a callback to run when the Google Visualization API is loaded.
			      google.charts.setOnLoadCallback(drawChart);

			      // Callback that creates and populates a data table,
			      // instantiates the pie chart, passes in the data and
			      // draws it.
			      function drawChart() {

			        // Create the data table.
			        var data1 = google.visualization.arrayToDataTable(data.results);

			        // Set chart options
			        var options = {
			        hAxis: {
			          title: 'Date',
			          minValue: 0
			        },
			        vAxis: {
			          title: 'Revenue'
			        }
			      };

			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
			        chart.draw(data1, options);
			      }
				 
				$scope.showRevenue= false;
				
				}
		}).error(function(error) {
			$scope.statusMessage = data.statusMessage;
			
		});
		
	}
	function daydiff(first, second) {
	    return Math.round((second.getTime() - first.getTime())/(1000*60*60*24));
	}
});