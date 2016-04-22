var mysqlModule = require('mysql');
var mongo = require("./mongo");
var mysql = require("./mysql");
var mongoURL = "mongodb://localhost:27017/amazonFreshFarmersMarket";

exports.handle_listFarmerRequests_request = function(msg, callback){

	console.log("exports.handle_listFarmerRequests_request ~~~~~~~~~~~");
	var json_response = {};
	var approved = 0;

	var query = "select * from amazonfresh.farmer where approved='"+ approved +"'";

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
			if(results.length <= 0)
			{
				json_response ={
						"statusCode" : 403,
						"statusMessage" : "No pending requests"
				};
			}
			else
			{
				json_response ={
						"statusCode" : 200,
						"results" : results
				};
			}			
		}
		callback(null, json_response);
	}, query);
};

exports.handle_listProductRequests_request = function(msg, callback){
	console.log("exports.handle_listFarmerRequests_request ~~~~~~~~~~~");
	var json_response = {};
	var approved = 0;

	var query = "select * from amazonfresh.products where approved='"+ approved +"'";

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

exports.handle_listCustomerRequests_request = function(msg, callback){
	console.log("exports.handle_listCustomerRequests_request ~~~~~~~~~~~");
	var json_response = {};
	var approved = 0;

	var query = "select * from amazonfresh.customer where approved='"+ approved +"'";

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

exports.handle_approveFarmer_request = function(msg, callback){
	console.log("exports.handle_approveFarmer_request ~~~~~~~~~~~");
	var json_response = {};
	var farmerId = msg.farmerId;
	var approved = 1;

	var query = "update amazonfresh.farmer set approved='"+ approved +"' where farmer_id ='"+ farmerId +"'";

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
					"statusCode" : 200
			};
		}
		callback(null, json_response);
	}, query);
};

exports.handle_approveProduct_request = function(msg, callback){
	console.log("exports.handle_approveProduct_request ~~~~~~~~~~~");

	var json_response = {};
	var productId = msg.productId;
	var approved = 1;

	var query = "update amazonfresh.product set approved='"+ approved +"' where product_id ='"+ productId +"'";

	mysql.fetchData(function(error, results) {
		console.log("result");
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

exports.handle_approveCustomer_request = function(msg, callback){
	console.log("exports.handle_approveCustomer_request ~~~~~~~~~~~");

	var json_response = {};
	var customerId = msg.customerId;
	var approved = 1;

	var query = "update amazonfresh.customer set approved='"+ approved +"' where customer_id ='"+ customerId +"'";

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

exports.handle_rejectFarmer_request = function(msg, callback){
	console.log("exports.handle_rejectFarmer_request ~~~~~~~~~~~");
	var json_response = {};
	var farmerId = msg.farmerId;
	var approved = 2;

	var query = "update amazonfresh.farmer set approved='"+ approved +"' where farmer_id ='"+ farmerId +"'";

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
					"statusCode" : 200
			};
		}
		callback(null, json_response);
	}, query);
};

exports.handle_rejectProduct_request = function(msg, callback){
	console.log("exports.handle_rejectProduct_request ~~~~~~~~~~~");

	var json_response = {};
	var productId = msg.productId;
	var approved = 2;

	var query = "update amazonfresh.product set approved='"+ approved +"' where product_id ='"+ productId +"'";

	mysql.fetchData(function(error, results) {
		console.log("result");
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

exports.handle_rejectCustomer_request = function(msg, callback){
	console.log("exports.handle_rejectCustomer_request ~~~~~~~~~~~");

	var json_response = {};
	var customerId = msg.customerId;
	var approved = 2;

	var query = "update amazonfresh.customer set approved='"+ approved +"' where customer_id ='"+ customerId +"'";

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

exports.handle_viewCustomerAccount_request = function(msg, callback){
	console.log("exports.handle_viewCustomerAccount_request ~~~~~~~~~~~");
	var json_response = {};

	var query = "select * from amazonfresh.customer ";

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

exports.handle_fetchStatisticsData_request = function(msg, callback){

};

exports.handle_fetchDeliveryDetails_request = function(msg, callback){

};

exports.handle_fetchRidesDetails_request = function(msg, callback){
	console.log("exports.handle_fetchRidesDetails_request ~~~~~~~~~~~");
	var json_response = {};

	var query = "select * from amazonfresh.trips";

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

exports.handle_searchBillDetails_request = function(msg, callback){
	console.log("exports.handle_searchBillDetails_request ~~~~~~~~~~~");
	var json_response = {};

	var query = "select * from amazonfresh.billing";

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

exports.handle_fetchBillDetails_request = function(msg, callback){
	console.log("exports.handle_searchBillDetails_request ~~~~~~~~~~~");
	var json_response = {};

	var query = "select * from amazonfresh.billing";

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