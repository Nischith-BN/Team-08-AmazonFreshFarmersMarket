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
	var farmerId = req.param("farmerId");

	var msg_payload = { 
			"searchString" : searchString
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
	var farmerId = req.param("farmerId");

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
