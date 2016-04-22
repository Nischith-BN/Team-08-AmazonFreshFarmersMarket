var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.listFarmerRequests = function(req,res){

	var msg_payload = { };

	mq_client.make_request('listFarmerRequests_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.listProductRequests = function(req,res){

	var msg_payload = { };

	mq_client.make_request('listProductRequests_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.listCustomerRequests = function(req,res){

	var msg_payload = { };

	mq_client.make_request('listCustomerRequests_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.approveFarmer = function(req,res){
	var farmerId = req.param("farmerId");

	var msg_payload = { 
			"farmerId" : farmerId
	};

	mq_client.make_request('approveFarmer_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.approveProduct = function(req,res){
	var productId = req.param("productId");

	console.log("..................................");
	console.log("productId"+productId);
	var msg_payload = { 
			"productId" : productId
	};

	mq_client.make_request('approveProduct_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.approveCustomer = function(req,res){
	var customerId = req.param("customerId");

	var msg_payload = { 
			"customerId" : customerId
	};

	mq_client.make_request('approveCustomer_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.rejectFarmer = function(req,res){
	var farmerId = req.param("farmerId");

	console.log("'''''''''''''''''''''''''''''''''''''''''''''");
	console.log("farmerId " + farmerId);
	var msg_payload = { 
			"farmerId" : farmerId
	};

	mq_client.make_request('rejectFarmer_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.rejectProduct = function(req,res){
	var productId = req.param("productId");

	var msg_payload = { 
			"productId" : productId
	};

	mq_client.make_request('rejectProduct_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.rejectCustomer = function(req,res){
	var customerId = req.param("customerId");

	var msg_payload = { 
			"customerId" : customerId
	};

	mq_client.make_request('rejectCustomer_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.viewCustomerAccount = function(req,res){
	var customerId = req.param("customerId");

	var msg_payload = { 
			"customerId" : customerId
	};

	mq_client.make_request('viewCustomerAccount_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.fetchStatisticsData = function(req,res){
	var date = req.param("date");

	var msg_payload = { 
			"date" : date
	};

	mq_client.make_request('fetchStatisticsData_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.fetchDeliveryDetails = function(req,res){
	var area = req.param("area");

	var msg_payload = { 
			"area" : area
	};

	mq_client.make_request('fetchDeliveryDetails_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.fetchRidesDetails = function(req,res){
	var category = req.param("category");
	var searchString = req.param("searchString");
	
	var msg_payload = { 
			"category" : category,
			"searchString" : searchString
	};

	mq_client.make_request('fetchRidesDetails_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.searchBillDetails = function(req,res){
	var searchString = req.param("searchString");
	
	var msg_payload = { 
			"searchString" : searchString
	};

	mq_client.make_request('searchBillDetails_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.fetchBillDetails = function(req,res){
	var searchString = req.param("searchString");
	
	var msg_payload = { 
			"billingId" : billingId
	};

	mq_client.make_request('fetchBillDetails_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};