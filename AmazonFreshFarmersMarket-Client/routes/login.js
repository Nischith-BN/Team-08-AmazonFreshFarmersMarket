var bcrypt = require('bcrypt-nodejs');
var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.createAccount = function(req,res)
{
	var firstName = req.param("firstName");
	var lastName = req.param("lastName");
	var email = req.param("email");
	var password = req.param("password");
	var hashedPassword = bcrypt.hashSync(password);
	var category = req.param("category");

	var msg_payload = { 
			"email" : email
	};

	console.log("exports.createAccount");
	mq_client.make_request('createAccount_queue',msg_payload, function(err,results){
		console.log("exports.createAccount " + results);
		if(err){
			throw err;
		}
		else 
		{
			
			if(results.statusCode == 200){
				req.session.email = email;
				req.session.firstName = firstName;
				req.session.lastName = lastName;
				req.session.password = hashedPassword;
				req.session.category = category;
			}
			res.send(results);						
		}  
	});
};

exports.saveAddress = function(req,res)
{
	console.log("exports.saveAddress ");
	var results = {};
	var streetAddress = req.param("streetAddress");
	var city = req.param("city");
	var state = req.param("state");
	var zipCode = req.param("zipCode");
	var phoneNumber = req.param("phoneNumber");

	req.session.streetAddress = streetAddress;
	req.session.city = city;
	req.session.state = state;
	req.session.zipCode = zipCode;
	req.session.phoneNumber = phoneNumber;

	results = {
			"statusCode" : 200
	};
	res.send(results);
};

exports.saveCardDetails = function(req,res)
{
	console.log("???????????????????????exports.saveCardDetails ");
	var cardNumber = req.param("cardNumber");
	var cardHolderName = req.param("cardHolderName");
	var cardExpirationMonth = req.param("cardExpirationMonth");
	var cardExpirationYear = req.param("cardExpirationYear");

	var msg_payload = { 
			"email" : req.session.email,
			"firstName" : req.session.firstName,
			"lastName" : req.session.lastName,
			"password" : req.session.password,
			"category" : req.session.category,

			"streetAddress" : req.session.streetAddress,
			"city" : req.session.city,
			"state" : req.session.state,
			"zipCode" : req.session.zipCode,
			"phoneNumber" : req.session.phoneNumber,

			"cardNumber" : cardNumber,
			"cardHolderName" : cardHolderName,
			"cardExpirationMonth" : cardExpirationMonth,
			"cardExpirationYear" : cardExpirationYear,			
	};

	mq_client.make_request('saveCardDetails_queue',msg_payload, function(err,results){
		console.log("exports.saveCardDetails " + results);
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});	
};

exports.saveFarmerDetails = function(req,res)
{
	console.log("exports.saveFarmerDetails ");
	var video = req.param("video");
	var image = req.param("image");
	var description = req.param("description");

	var msg_payload = { 
			"email" : req.session.email,
			"firstName" : req.session.firstName,
			"lastName" : req.session.lastName,
			"password" : req.session.password,
			"category" : req.session.category,

			"streetAddress" : req.session.streetAddress,
			"city" : req.session.city,
			"state" : req.session.state,
			"zipCode" : req.session.zipCode,
			"phoneNumber" : req.session.phoneNumber,

			"video" : video,
			"image" : image,
			"description" : description			
	};
	mq_client.make_request('saveFarmerDetails_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log("######################################## Success Middleware");
			console.log(results);
			res.send(results);						
		}  
	});	
};

exports.afterLogin = function(req,res)
{
	var email = req.param("email");
	var password = req.param("password");

	var msg_payload = { 
			"email" : email,
			"password" : password
	};

	mq_client.make_request('login_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
}

exports.afterAdminLogin = function(req,res)
{
	var email = req.param("email");
	var password = req.param("password");

	var msg_payload = { 
			"email" : email,
			"password" : password
	};

	mq_client.make_request('adminLogin_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.deleteAccount = function(req,res)
{
	var id = req.param("id");
	var category = req.param("category");

	var msg_payload = { 
			"id" : id,
			"category" : category
	};

	mq_client.make_request('deleteAccount_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			res.send(results);						
		}  
	});
};

exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};





