var mongo = require("./mongo");
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
			console.log("//////////////////////////////////");
			console.log(results);
			if (err) 
			{
				json_response ={
						"statusCode" : 401,
						"statusMessage" : "Unexpected error occured"
				};
			} else if(results) {
				if(results.adminApproved == 0)
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
				console.log("failureeeeeeeeeeeeeeeeeeeeeeee");
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

exports.handle_signup_request = function(msg, callback){
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
