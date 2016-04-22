var mysqlModule = require('mysql');
var mongo = require("./mongo");
var mysql = require("./mysql");
var mongoURL = "mongodb://localhost:27017/amazonFreshFarmersMarket";

exports.handle_createProduct_request = function(msg, callback){

};

exports.handle_deleteProduct_request = function(msg, callback){

};

exports.handle_listProducts_request = function(msg, callback){
	console.log("exports.handle_viewProduct_request ~~~~~~~~~~~");
	var json_response = {};
	
	var farmerId = msg.farmerId;
	
	var query = "select * from amazonfresh.products products,amazonfresh.farmer farmer where products.farmer_id = farmer.farmer_id and products.farmer_id ='" + farmerId +"'";
	
	console.log(query);
	mysql.fetchData(function(error, results) {
		console.log(results);
		if(error)
		{
			json_response ={
					"statusCode" : 401,
					"results" : error.code
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

exports.handle_listAllProducts_request = function(msg, callback){
	console.log("exports.handle_listAllProducts_request ~~~~~~~~~~~");
	var json_response = {};
	
	var query = "select * from amazonfresh.products";
	
	console.log(query);
	mysql.fetchData(function(error, results) {
		console.log(results);
		if(error)
		{
			json_response ={
					"statusCode" : 401,
					"results" : error.code
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

exports.handle_viewProduct_request = function(msg, callback){
	console.log("exports.handle_viewProduct_request ~~~~~~~~~~~");
	var json_response = {};

	var query = "select * from amazonfresh.product ";

	mysql.fetchData(function(error, results) {
		if(error)
		{
			json_response ={
					"statusCode" : 401,
					"results" : error.code
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

exports.handle_amendProductDetails_request = function(msg, callback){

};

exports.handle_searchProduct_request = function(msg, callback){

};

exports.handle_fetchProductDetails_request = function(msg, callback){

};