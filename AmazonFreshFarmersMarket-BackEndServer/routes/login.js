var bcrypt = require('bcrypt-nodejs');
var mysqlModule = require('mysql');
var mongo = require("./mongo");
var mysql = require("./mysql");
var mongoURL = "mongodb://localhost:27017/amazonFreshFarmersMarket";

exports.handle_login_request = function(msg, callback){
	console.log("-----exports.handle_login_request-----");
	var json_response = {};
	var email = msg.email;
	var password = msg.password;
	console.log("email " + email +" password "+ password);

	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_credentials');
		console.log('email ' + email + ' password ' + password);
		coll.findOne({email: email}, function(err, results){
			console.log(results);
			if (err) 
			{
				json_response ={
						"statusCode" : 401,
						"statusMessage" : "Unexpected error occured"
				};
				callback(null, json_response);
			} else if(results) {
				if(results.approved == 0)
				{
					json_response ={
							"statusCode" : 403,
							"statusMessage" : "Approval pending",
							"results" : results
					};
					callback(null, json_response);
				} else if(results.approved == 2){
					json_response ={
							"statusCode" : 403,
							"statusMessage" : "Request rejected by administration",
							"results" : results
					};
					callback(null, json_response);
				} else if(results.approved == 3){
					json_response ={
							"statusCode" : 403,
							"statusMessage" : "Account deleted",
							"results" : results
					};
					callback(null, json_response);
				}			
				else {
					json_response ={
							"statusCode" : 200,
							"statusMessage" : "Login Successful",
							"results" : results
					};
					callback(null, json_response);
				}
			} else {
				json_response ={
						"statusCode" : 403,
						"statusMessage" : "Invalid login credentials",
						"results" : results
				};
				callback(null, json_response);
			}			
		});
	});	
};

exports.handle_adminLogin_request = function(msg, callback){
	console.log("-----exports.handle_adminLogin_request-----");
	var json_response = {};
	var email = msg.email;
	var password = msg.password;

	var query = "select * from amazonfresh.administrator where email='"+ email +"'";
	console.log(query);
	mysql.fetchData(function(error, results) {
		if(error)
		{
			console.log(error);
			json_response ={
					"statusCode" : 401,
					"results" : error.code
			};
			callback(null, json_response);
		}
		else
		{		
			console.log(results);
			if(results.length <= 0)
			{
				json_response ={
						"statusCode" : 403,
						"statusMessage" : "Invalid email id"
				};
				callback(null, json_response);
			}
			else
			{
				bcrypt.compare(password, results[0].password, function(err,correctPassword) {

					console.log ("//////////////// " + correctPassword);
					console.log ("password " + password);
					console.log ("password " + results[0].password);



					if(correctPassword){						
						json_response ={
								"statusCode" : 200,
								"results" : results
						};
						callback(null, json_response);
					}
					else{                      
						json_response ={
								"statusCode" : 403,
								"statusMessage" : "Invalid login credentials"
						};
						callback(null, json_response);                     
					}
				});	
			}			
		}		
	}, query);
};

exports.handle_createAccount_request = function(msg, callback){
	console.log("-----exports.handle_createAccount_request-----");
	var json_response = {};
	var email = msg.email;

	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_credentials');

		coll.findOne({ email: email }, function(err, results){
			console.log("----------------------------");
			console.log(results);
			if(err){
				console.log("errorrrrrrrrrrrrrrr");
				json_response ={
						"statusCode" : 401,
						"statusMessage" : "Unexpected error occured"
				};
				callback(null, json_response);
			}
			else if (results) {	
				console.log("successsssssssssssssssss");
				json_response ={
						"statusCode" : 403,
						"statusMessage" : "Email Already Exists",
						"results" : results
				};	
				callback(null, json_response);
			} else {
				json_response ={
						"statusCode" : 200,
						"statusMessage" : "Doesnot Exist",
						"results" : results
				};
				callback(null, json_response);
			}
		});
	});	
};

exports.handle_saveCardDetails_request = function(msg, callback){
	console.log("-----exports.handle_saveCardDetails_request-----");
	var json_response = {};

	var email= msg.email;
	var firstName = msg.firstName;
	var lastName= msg.lastName;
	var password= msg.password;
	var category= msg.category;

	var streetAddress= msg.streetAddress;
	var city= msg.city;
	var state= msg.state;
	var zipCode= msg.zipCode;
	var phoneNumber= msg.phoneNumber;

	var cardNumber = msg.cardNumber;
	var cardHolderName = msg.cardHolderName;
	var cardExpirationMonth = msg.cardExpirationMonth;
	var cardExpirationYear = msg.cardExpirationYear;	
	var approved = 0;

	var id = '100000000';

	var query = "select max(customer_id) as max_id from amazonfresh.customer";

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

			var insertQuery = "insert into amazonfresh.customer (customer_id, firstname, lastname, address, city, " +
			"state, zip_code, phone_number, email, password,credit_card_no, card_holder_name, expiration_month, expiration_year, approved) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

			var inputParams = [id,firstName,lastName,streetAddress,city,state,zipCode,phoneNumber,email,password,cardNumber,cardHolderName,cardExpirationMonth,cardExpirationYear, approved];
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
					json_response ={
							"statusCode" : 200,
							"statusMessage" : "Signup Successful"
					};
					callback(null, json_response);
				}  
			},insertQuery);
		}
	}, query);
};

exports.handle_saveFarmerDetails_request = function(msg, callback){
	var json_response = {};

	var email= msg.email;
	var firstName = msg.firstName;
	var lastName= msg.lastName;
	var password= msg.password;
	var category= msg.category;

	var streetAddress= msg.streetAddress;
	var city= msg.city;
	var state= msg.state;
	var zipCode= msg.zipCode;
	var phoneNumber= msg.phoneNumber;

	var image = msg.image;
	var video = msg.video;
	var description = msg.description;	
	var approved = 0;

	var id = '100000000';

	var query = "select max(farmer_id) as max_id from amazonfresh.farmer";

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

			var insertQuery = "insert into amazonfresh.farmer (farmer_id, firstname, lastname, address, city, " +
			"state, zip_code, phone_number, email, password, approved) values(?,?,?,?,?,?,?,?,?,?)";

			console.log(query);
			var inputParams = [id,firstName,lastName,streetAddress,city,state,zipCode,phoneNumber,email,password, approved];
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
						var coll = mongo.collection('farmer_details');
						coll.insertOne({farmer_id: id,image:image,video:video,description:description}, function(err, results){

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
										"statusMessage" : "Signup Successful"
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

exports.handle_deleteAccount_request = function(msg, callback){
	var json_response = {};
	var id = msg.id;
	var category = msg.category;
	var approved = 3;

	var query = "";

	if(category == "farmer")
	{
		query = "update amazonfresh.farmer set approved='"+ approved +"' where farmer_id ='"+ id +"'";
	}
	else 
	{
		query = "update amazonfresh.customer set approved='"+ approved +"' where customer_id ='"+ id +"'";
	}

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
			json_response ={
					"statusCode" : 403,
					"statusMessage" : "No pending requests"
			};
			callback(null, json_response);			
		}		
	}, query);
};
