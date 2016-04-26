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
	console.log("Retrieved parameter farmerId:");
	var productName =req.param("productName");
	var farmerId = req.param("farmerId");
	var productPrice = req.param("productPrice");
	var productDescription = req.param("productDescription");
	var productQuantity =req.param("productQuantity");
	var image = req.param("image");
	console.log("Retrieved parameter farmerId:"+farmerId);
	var msg_payload = { 
			"productName" : productName,
			"farmerId" : farmerId,
			"productPrice" : productPrice,
			"productDescription" : productDescription,
			"productQuantity" : productQuantity,
			"image":image
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
	var productId = "100000000";//req.param("productId");

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
	var category = "admin";//req.param("category");
	var msg_payload = { 
			"farmerId" : farmerId,"category":category
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
	var productId ="100000000"; //req.param("productId");
	var productName ="Carrot2"; //req.param("productName");
	var productDescription ="changed Description1"; //req.param("productDescription");

	var msg_payload = { 
			"productId" : productId,
			"productName" : productName,
			"productDescription" : productDescription
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
	var searchString = "carrot";//req.param("searchString");

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


	
	

