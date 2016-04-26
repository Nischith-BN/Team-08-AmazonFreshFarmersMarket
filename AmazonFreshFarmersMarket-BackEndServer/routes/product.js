var mysqlModule = require('mysql');
var mongo = require("./mongo");
var mysql = require("./mysql");
var mongoURL = "mongodb://localhost:27017/amazonFreshFarmersMarket";

exports.handle_createProduct_request = function(msg, callback){
	console.log("exports.handle_createProduct_request ~~~~~~~~~~~");
	var json_response = {};
	

	var productName = msg.productName;
	var farmerId = msg.farmerId;
	var productPrice = msg.productPrice;
	var productDescription = msg.productDescription;
	var productQuantity =msg.productQuantity;
	var image = msg.image;
	var approved = 0;
	var id = '100000000';

	var query = "select max(product_id) as max_id from amazonfresh.products";

	mysql.fetchData(function(error, results) {
		if(error)
		{
			json_response ={
					"statusCode" : 401,
					"results" : error.code
			};
			callback(null, json_response);
		}
		else
		{		
			if(results.length > 0)
			{
				id = results[0].max_id + 1;
			}

			var insertQuery = "insert into amazonfresh.products (product_id,farmer_id, product_name, product_price, product_description, product_quantity, approved) values(?,?,?,?,?,?,?)";
			console.log(query);
			var inputParams = [id,farmerId,productName,productPrice,productDescription,productQuantity,approved];
			console.log(inputParams);
			var insertQuery = mysqlModule.format(insertQuery, inputParams);
			mysql.fetchData(function(err,results){
				console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				console.log(err);
				console.log(results);		

				if(err){
					console.log("//////////////////");
					console.log(err.code);
					json_response ={
							"statusCode" : 401,
							"statusMessage" : err.code
					};
					callback(null, json_response);
				}
				else 
					{
					
					mongo.connect(mongoURL, function(){
						var coll = mongo.collection('product_details');
						coll.insert({product_id: id,farmer_id:farmerId,image:image}, function(err, results){

							console.log(results);
							if (err) 
							{
								console.log("////////////////// mongo error");
								json_response ={
										"statusCode" : 401,
										"statusMessage" : "Unexpected error occured"
								};
								callback(null, json_response);
							} else {
								console.log("////////////////// mongo success");
								json_response ={
										"statusCode" : 200,
										"statusMessage" : "Insert Successful"
								};
								callback(null, json_response);
							}							
						});
					});
					
					}
			},insertQuery);
		}
	}, query);
					
	
};

exports.handle_deleteProduct_request = function(msg, callback){
	console.log("exports.handle_deleteProduct_request ~~~~~~~~~~~");
	var json_response = {};
	var productId = msg.productId;
	var approved = 3;
	var query = "update amazonfresh.products set approved =' " +approved+"' where products.product_id ='" + productId +"'";
	console.log(query);
	mysql.fetchData(function(error, results) {
		console.log(results);
		if(error)
		{
			json_response ={
					"statusCode" : 401,
					"statusMessage" : "Error occured while deleting product"
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


exports.handle_listProducts_request = function(msg, callback){
	console.log("exports.handle_viewProduct_request ~~~~~~~~~~~");
	var json_response = {};
	
	var farmerId = msg.farmerId;
	var category = msg.category;
	var approved = "1";
	var query = null;

		if (category == null || category == "undefined" || category == "farmer") {
		query = "select * from amazonfresh.products products,amazonfresh.farmer farmer where products.farmer_id = farmer.farmer_id and products.farmer_id ='"
				+ farmerId + "' and products.approved = '" + approved + "'";
	} else if (category == "admin") {
		query = "select * from amazonfresh.products products,amazonfresh.farmer farmer where products.farmer_id = farmer.farmer_id and products.farmer_id ='"
				+ farmerId + "'";
	} else {
		 query = "select * from amazonfresh.products products,amazonfresh.farmer farmer where products.farmer_id = farmer.farmer_id and products.farmer_id ='"
				+ farmerId + "' and products.approved = '" + approved + "'";
	}
	console.log(query);
	mysql.fetchData(function(error, results) {
		console.log(results);
		if(error)
		{
			json_response ={
					"statusCode" : 401,
					"statusMessage" : error.code
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
	var approved = 1;
	
	var query = "select * from amazonfresh.products where approved = '" + approved +"'";
	
	console.log(query);
	mysql.fetchData(function(error, results) {
		console.log(results);
		if(error)
		{
			json_response ={
					"statusCode" : 401,
					"statusMessage" : error.code
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
	
	var productId = msg.productId;
	var sqlResult = null;
	console.log("exports.handle_viewProduct_request ~~~~~~~~~~~");
	var json_response = {};

	var query = "select * from amazonfresh.products where product_id ='" + productId +"'"; 
	
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
				var coll = mongo.collection('product_details');
				//console.log('email ' + email + ' password ' + password);
				coll.findOne({product_Id: productId}, function(err, results){
					
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
									"statusMessage" : "Product inserted successfully",
									"mongoResult" : results,
									"sqlResult" : sqlResult
							};
							callback(null, json_response);
						}
					 else {
						json_response ={
								"statusCode" : 403,
								"statusMessage" : "Invalid Product",
								"results" : results
						};
						callback(null, json_response);
					}
					
				});
			});	
			
			
		}
	
	}, query);
};

exports.handle_amendProductDetails_request = function(msg, callback){
	var productId = msg.productId;
	var productName = msg.productName;
	var productDescription = msg.productDescription;
	
	console.log("exports.handle_amendProductDetails_request ~~~~~~~~~~~");
	var json_response = {};

	var query = "Update amazonfresh.products set product_name ='"+productName+"',product_description = '"+productDescription+"'  where product_id ='" + productId +"'"; 
	
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




exports.handle_searchProduct_request = function(msg, callback){
var searchString = msg.searchString;
	
	console.log("exports.handle_searchProduct_request ~~~~~~~~~~~");
	var json_response = {};

	var query = "SELECT * FROM amazonfresh.products where product_name like '%"+searchString+"%'";
	
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

exports.handle_fetchProductDetails_request = function(msg, callback){

};