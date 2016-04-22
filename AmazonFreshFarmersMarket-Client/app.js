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
app.post('/afterLogin', login.afterLogin);//Pending - Mongo update,bcrypt
app.post('/afterAdminLogin', login.afterAdminLogin);//Pending - Mongo update,bcrypt
app.post('/logout', login.logout);//Pending - Testing,back navigation
app.post('/createAccount',login.createAccount);//Done - Tested
app.post('/saveAddress',login.saveAddress);//Done - Tested
app.get('/saveCardDetails',login.saveCardDetails);//Pending - Mongo insert
app.post('/saveFarmerDetails',login.saveFarmerDetails);//Pending - Mongo insert
app.post('/deleteAccount',login.deleteAccount);

//admin
app.get('/listFarmerRequests',admin.listFarmerRequests);//Done - Tested
app.get('/listProductRequests',admin.listProductRequests);//Done - Tested
app.get('/listCustomerRequests',admin.listCustomerRequests);//Done - Tested
app.post('/approveFarmer',admin.approveFarmer);//Pending - Mongo update
app.post('/approveProduct',admin.approveProduct);//Done - Tested
app.post('/approveCustomer',admin.approveCustomer);//Pending - Mongo update
app.post('/rejectFarmer',admin.rejectFarmer);//Done - Tested
app.post('/rejectProduct',admin.rejectProduct);//Done - Tested
app.post('/rejectCustomer',admin.rejectCustomer);//Done - Tested

app.get('/viewCustomerAccount',admin.viewCustomerAccount);//To check what is it
app.get('/fetchStatisticsData',admin.fetchStatisticsData);
app.get('/fetchDeliveryDetails',admin.fetchDeliveryDetails);
app.get('/fetchRidesDetails',admin.fetchRidesDetails);
app.get('/searchBillDetails',admin.searchBillDetails);
app.get('/fetchBillDetails',admin.fetchBillDetails);

//customer
//app.post('/listCustomers',customer.listCustomers);
app.post('/postReview',customer.postReview);//Bhargav

//farmers
//app.post('/listFarmers',farmer.listFarmers);
app.post('/amendFarmerDetails',farmer.amendFarmerDetails);
//app.post('/searchFarmer',farmer.searchFarmer);
app.post('/fetchFarmerDetails',farmer.fetchFarmerDetails);

//product
app.post('/createProduct',product.createProduct);
app.post('/deleteProduct',product.deleteProduct);
app.get('/listProducts',product.listProducts);//integration pending
app.get('/listAllProducts',product.listAllProducts);//integration pending
app.get('/viewProduct',product.viewProduct);
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