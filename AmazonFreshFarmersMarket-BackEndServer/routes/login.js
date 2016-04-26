var s = require('mysql');
var mongo = require("./mongo");
var mysql = require("./mysql");
var mongoURL = "mongodb://localhost:27017/amazonFreshFarmersMarket";

exports.handle_login_request = function(msg, callback){
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
			} else if(results) {
				if(results.approved == 0)
				{
					json_response ={
							"statusCode" : 403,
							"statusMessage" : "Approval pending",
							"results" : results
					};
				} else {
					json_response ={
							"statusCode" : 200,
							"statusMessage" : "Login Successful",
							"results" : results
					};
				}
			} else {
				json_response ={
						"statusCode" : 403,
						"statusMessage" : "Invalid login credentials",
						"results" : results
				};
			}
			callback(null, json_response);
		});
	});	
};

exports.handle_adminLogin_request = function(msg, callback){
	var json_response = {};
	var email = msg.email;
	var password = msg.password;

	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_credentials');
		coll.findOne({email: email}, function(err, results){
			if (err) 
			{
				json_response ={
						"statusCode" : 401,
						"statusMessage" : "Unexpected error occured"
				};
			} else if(results) {				
				json_response ={
						"statusCode" : 200,
						"statusMessage" : "Login Successful",
						"results" : results
				};				
			} else {
				json_response ={
						"statusCode" : 403,
						"statusMessage" : "Invalid login credentials",
						"results" : results
				};
			}
			callback(null, json_response);
		});
	});	
};

exports.handle_createAccount_request = function(msg, callback){
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
			}
			else if (results) {	
				console.log("successsssssssssssssssss");
				json_response ={
						"statusCode" : 403,
						"statusMessage" : "Email Already Exists",
						"results" : results
				};			
			} else {
				json_response ={
						"statusCode" : 200,
						"statusMessage" : "Doesnot Exist",
						"results" : results
				};
			}
			callback(null, json_response);
		});
	});	
};

exports.handle_saveCardDetails_request = function(msg, callback){
	var json_response = {};

	/*var email= msg.email;
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
	var cardExpirationYear = msg.cardExpirationYear;*/	

	var customerId = generateSSN(10000,999999999);

	var email= 'aaa@a';
	var firstName = "nichuuuuuuuuuuuu";
	var lastName= "n";
	var password= "12345";
	var category= "farmer";

	var streetAddress= "a";
	var city= "a";
	var state= "a";
	var zipCode= "12345";
	var phoneNumber= "1234567899";

	var cardNumber = "123";
	var cardHolderName = "as";
	var cardExpirationMonth = "01";
	var cardExpirationYear = "2016";
	var isApproved = "0";

	console.log("VVVVVVVVVVVVVVVVVVVVVV");
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_credentials');
		coll.insertOne({email: email,password:password,category:category,customerId:customerId,isApproved:isApproved}, function(err, results){
			console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX");
			console.log(results);
			if (err) 
			{
				json_response ={
						"statusCode" : 401,
						"statusMessage" : "Unexpected error occured"
				};
			} else if(results) {
				if(results.approved == 0)
				{
					json_response ={
							"statusCode" : 200,
							"statusMessage" : "Signup Successful",
							"results" : results
					};
				} 
			}
			callback(null, json_response);
		});
	});
	
	
	
	
	/*var query = "insert into amazonfresh.customer (customer_id, firstname, lastname, address, city, " +
	"state, zip_code, phone_number, email, credit_card_no, card_holder_name, expiration_month, expiration_year, isApproved) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

	console.log(query);
	var inputParams = [customerId,firstName,lastName,streetAddress,city,state,zipCode,phoneNumber,email,cardNumber,cardHolderName,cardExpirationMonth,cardExpirationYear,0];
	console.log(inputParams);

	var insertQuery = mysqlModule.format(query, inputParams);
	console.log(insertQuery);
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
		}
		else 
		{
			mongo.connect(mongoURL, function(){
				var coll = mongo.collection('login_credentials');
				coll.insertOne({email: email,password:password,category:category,customerId:customerId,isApproved:0}, function(err, results){
					console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX");
					console.log(results);
					if (err) 
					{
						json_response ={
								"statusCode" : 401,
								"statusMessage" : "Unexpected error occured"
						};
					} else if(results) {
						if(results.approved == 0)
						{
							json_response ={
									"statusCode" : 200,
									"statusMessage" : "Signup Successful",
									"results" : results
							};
						} 
					}
					callback(null, json_response);
				});
			});
		}  
	},insertQuery);*/
	callback(null, json_response);
};

exports.handle_saveFarmerDetails_request = function(msg, callback){
	var json_response = {};
	var email = msg.email;

	//generate ssn
	//check category
	//save data to sqldb - customer or farmer
	//save data to mongodb


	/*mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_credentials');


		coll.findOne({ email: email }, function(err, results){
			console.log("////////////////////////////////");
			console.log(results);
			if(err){
				console.log("failureeeeeeeeeeeeeeeeeeeeeeee");
				json_response ={
						"statusCode" : 401,
						"statusMessage" : "Unexpected error occured"
				};
			}
			else if (results) {	
				console.log("successsssssssssssssssss");
				json_response ={
						"statusCode" : 403,
						"statusMessage" : "Email Already Exists",
						"results" : results
				};			
			} else {
				console.log("failureeeeeeeeeeeeeeeeeeeeeeee");
				json_response ={
						"statusCode" : 200,
						"statusMessage" : "Doesnot Exist",
						"results" : results
				};
			}
			callback(null, json_response);
		});
	});	*/

	json_response ={
			"statusCode" : 200,
			"statusMessage" : "Signup successful"
	};
	callback(null, json_response);
};

exports.handle_deleteAccount_request = function(msg, callback){

};

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
};