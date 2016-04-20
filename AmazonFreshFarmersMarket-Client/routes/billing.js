var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.createBill = function(req,res){

};

exports.deleteBill = function(req,res){
	var billingId = req.param("billingId");

	var msg_payload = { 
			"billingId" : billingId
	};

	mq_client.make_request('deleteBill_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.searchBill = function(req,res){
	var billingId = req.param("billingId");

	var msg_payload = { 
			"billingId" : billingId
	};

	mq_client.make_request('searchBill_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.placeOrder = function(req,res){

};
