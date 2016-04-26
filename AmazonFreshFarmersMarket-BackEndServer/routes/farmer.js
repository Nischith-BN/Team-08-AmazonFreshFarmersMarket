var mysqlModule = require('mysql');
var mongo = require("./mongo");
var mysql = require("./mysql");
var mongoURL = "mongodb://localhost:27017/amazonFreshFarmersMarket";

exports.handle_listFarmers_request = function(msg, callback){

};

exports.handle_amendFarmerDetails_request = function(msg, callback){
	var farmerId =msg.farmerId;
	var firstName =msg.firstName;
	var lastName =msg.lastName;
	var address =msg.address;
	var city =msg.city;
	var state =msg.state;
	var zipCode =msg.zipCode;
	var phoneNumber =msg.phoneNumber;
	var password =msg.password;
	//req.param("productDescription");

	var sqlResult = null;
	console.log("exports.handle_amendFarmerDetails_request ~~~~~~~~~~~");
	var json_response = {};
	
	var query = "Update amazonfresh.farmer set firstname ='"+firstName+"',lastname = '"+lastName+"',address = '"+address+"',city = '"+city+"',state = '"+state+"',zip_code = '"+zipCode+"',city = '"+city+"' where farmer_id ='" + farmerId +"'";
	
console.log("Sql Query:"+query);
	
	mysql.fetchData(function(error, results) {
		console.log(results);
		if(error)
		{
			json_response ={
					"statusCode" : 401,
					"statusMessage" : "Error occured while updating the product details"
			};
		}
		else
		{	
			
			json_response ={
					"statusCode" : 200,
					"results" : results
			};
		}
		callback(null, json_response);
	}, query);
	
};

exports.handle_searchFarmer_request = function(msg, callback){

};

exports.handle_fetchFarmerDetails_request = function(msg, callback){

	
	var farmerId = msg.farmerId;
	
	var sqlResult = null;
	console.log("exports.handle_viewProduct_request ~~~~~~~~~~~");
	var json_response = {};

	var query = "select * from amazonfresh.farmer where farmer_id ='" + farmerId +"'"; 
	
	console.log("Sql Query:"+query);

	mysql.fetchData(function(error, results) {
		if(error)
		{
			console.log("In error part");
			console.log("In error part"+error);
			json_response ={
					"statusCode" : 401,
					"statusMessage" :  "Unexpected error occured"
			};
		}
		else
		{	
			console.log("Before mongo query");
			sqlResult = results;
			
			mongo.connect(mongoURL, function(){
				var coll = mongo.collection('farmer_details');
				console.log("firing mongo query for farmer" + farmerId);
				coll.findOne({farmer_id: farmerId}, function(err, results){
					
					if (err) 
					{
						json_response ={
								"statusCode" : 401,
								"statusMessage" : "Unexpected error occured"
						};
					} else if(results) {
						console.log(results);
						
							json_response ={
									"statusCode" : 200,
									"statusMessage" : "Fetched result successfully",
									"mongoResult" : results,
									"sqlResult" : sqlResult
							};
							callback(null, json_response);
						}
					 else {
						json_response ={
								"statusCode" : 403,
								"statusMessage" : "Invalid farmer",
								"results" : results
						};
						callback(null, json_response);
					}
					
				});
			});	
			
			
		}
	
	}, query);

};
