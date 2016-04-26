var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.listFarmers = function(req,res){

	var msg_payload = { };

	mq_client.make_request('listFarmers_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.amendFarmerDetails = function(req,res){
	var farmerId ="100000011"; //req.param("farmerId");
	var firstName ="Fname first"; //req.param("firstName");
	var lastName ="Lname last";//req.param("flastName");
	var address ="201 S street";//req.param("address");
	var city ="San Jose city";//req.param("city");
	var state ="CA state";//req.param("state");
	var zipCode ="95112";//req.param("zipCode");
	var phoneNumber ="40864633354";//req.param("phoneNumber");
	var password ="password";//req.param("password");
	//req.param("productDescription");

	var msg_payload = { 
			"farmerId" : farmerId,
			"firstName" : firstName,
			"lastName" : lastName,
			"address" : address,
			"city" : city,
			"state" : state,
			"zipCode" : zipCode,
			"phoneNumber" : phoneNumber,
			"password" : password
			
	};

	mq_client.make_request('amendFarmerDetails_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.searchFarmer = function(req,res){
	var searchString = req.param("searchString");

	var msg_payload = { 
			"searchString" : searchString
	};

	mq_client.make_request('searchFarmer_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.fetchFarmerDetails = function(req,res){
	var farmerId = "100000011";//req.param("farmerId");
	var msg_payload = { 
			"farmerId" : farmerId
	};
	mq_client.make_request('fetchFarmerDetails_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};
