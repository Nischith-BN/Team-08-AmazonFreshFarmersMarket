var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path');

var mongoSessionConnectURL = "mongodb://localhost:27017/login";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var index = require("./routes/index");
var login = require("./routes/login");
var admin = require("./routes/admin");
var customer = require("./routes/customer");
var farmer = require("./routes/farmer");
var product = require("./routes/product");
var billing = require("./routes/billing");
var trip = require("./routes/trip");

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({
	secret: 'team8secretcode',
	resave: false, 
	saveUninitialized: false,
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}


//login
app.get('/', routes.index);//Done - Tested
app.get('/login', routes.index);//Done - Tested
app.post('/afterLogin', login.afterLogin);//integration pending
app.post('/afterAdminLogin', login.afterAdminLogin);//Done - Tested
app.post('/logout', login.logout);//Pending - Testing,back navigation
app.post('/createAccount',login.createAccount);//Done - Tested
app.post('/saveAddress',login.saveAddress);//Done - Tested
app.post('/saveCardDetails',login.saveCardDetails);//Done - Tested
app.post('/saveFarmerDetails',login.saveFarmerDetails);//Done - Tested
app.post('/deleteAccount',login.deleteAccount);//integration pending
//admin
app.get('/listFarmerRequests',admin.listFarmerRequests);//Done - Tested
app.get('/listProductRequests',admin.listProductRequests);//Done - Tested
app.get('/listCustomerRequests',admin.listCustomerRequests);//Done - Tested
app.post('/approveFarmer',admin.approveFarmer);//Done - Tested
app.post('/approveProduct',admin.approveProduct);//Done - Tested
app.post('/approveCustomer',admin.approveCustomer);//Done - Tested
app.post('/rejectFarmer',admin.rejectFarmer);//Done - Tested
app.post('/rejectProduct',admin.rejectProduct);//Done - Tested
app.post('/rejectCustomer',admin.rejectCustomer);//Done - Tested

app.get('/listAllCustomers',admin.listAllCustomers);//UI pending
app.get('/fetchCustomerDetails',admin.fetchCustomerDetails);//UI pending
app.get('/fetchReviewsByCustomer',admin.fetchReviewsByCustomer);//Pending

app.post('/fetchStatisticsData',admin.fetchStatisticsData);//UI pending
app.post('/fetchDeliveryDetails',admin.fetchDeliveryDetails);//UI pending
app.post('/fetchRidesDetails',admin.fetchRidesDetails);//Done - Tested
app.post('/searchBillDetails',admin.searchBillDetails);//Done - Tested

//customer
//app.post('/listCustomers',customer.listCustomers);
app.post('/postReview',customer.postReview);//Bhargav

//farmers
//app.post('/listFarmers',farmer.listFarmers);
app.post('/amendFarmerDetails',farmer.amendFarmerDetails);//
//app.post('/searchFarmer',farmer.searchFarmer);
app.post('/fetchFarmerDetails',farmer.fetchFarmerDetails);// input:farmerId whole objects of particular farmer(approved products)

//product
app.post('/createProduct',product.createProduct);
app.post('/deleteProduct',product.deleteProduct);
<<<<<<< Updated upstream
app.get('/listProducts',product.listProducts);//integration pending
app.get('/listAllProducts',product.listAllProducts);//integration pending
app.get('/viewProduct',product.viewProduct);//integration pending
=======
app.get('/listProducts',product.listProducts);//list products for particular farmers
app.get('/listAllProducts',product.listAllProducts);//list all products for customers
app.get('/viewProduct',product.viewProduct);
>>>>>>> Stashed changes
app.post('/amendProductDetails',product.amendProductDetails);
app.post('/searchProduct',product.searchProduct);
app.post('/fetchProductDetails',product.fetchProductDetails);
 
//billing
app.post('/saveCartDetails',billing.saveCartDetails);
app.post('/createBill',billing.createBill);
app.post('/deleteBill',billing.deleteBill);
app.post('/searchBill',billing.searchBill);
app.post('/placeOrder',billing.placeOrder);

//trip
app.post('/createTrip',trip.createTrip);
app.post('/listTripsOfTruck',trip.listTripsOfTruck);
app.post('/listTripsOfDriver',trip.listTripsOfDriver);

mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});