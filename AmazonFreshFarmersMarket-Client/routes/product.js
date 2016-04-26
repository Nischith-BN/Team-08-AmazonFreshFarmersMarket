var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.viewProduct = function(req,res){
	var productId = req.param("productId");

	var msg_payload = { 
			"productId" : productId
	};

	mq_client.make_request('viewProduct_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.createProduct = function(req,res){
	var productName = req.param("productName");
	var farmerID = req.param("farmerID");
	var productPrice = req.param("productPrice");
	var productDescription = req.param("productDescription");
	var productQuantity = req.param("productQuantity");
	
	var msg_payload = { 
			"productName" : productName,
			"farmerID" : farmerID,
			"productPrice" : productPrice,
			"productDescription" : productDescription,
			"productQuantity" : productQuantity
	};

	mq_client.make_request('createProduct_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.deleteProduct = function(req,res){
	var productId = req.param("productId");

	var msg_payload = { 
			"productId" : productId
	};

	mq_client.make_request('deleteProduct_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.listProducts = function(req,res){
	console.log("*****************************************");
	console.log(req.param("farmerId"));
	
	//var farmerId = req.param("farmerId");
	var farmerId = "100000005" ;
	var msg_payload = { 
			"farmerId" : farmerId
	};

	mq_client.make_request('listProducts_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.listAllProducts = function(req,res){

	var msg_payload = { };

	mq_client.make_request('listAllProducts_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.amendProductDetails = function(req,res){
	var productId = req.param("productId");

	var msg_payload = { 
			"productId" : productId
	};

	mq_client.make_request('amendProductDetails_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.searchProduct = function(req,res){
	var searchString = req.param("searchString");

	var msg_payload = { 
			"searchString" : searchString
	};

	mq_client.make_request('searchProduct_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.fetchProductDetails = function(req,res){
	var productID = req.param("productID");

	var msg_payload = { 
			"productID" : productID
	};

	mq_client.make_request('fetchProductDetails_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};