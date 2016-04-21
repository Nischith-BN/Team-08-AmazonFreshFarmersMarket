var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path');

var mongoSessionConnectURL = "mongodb://localhost:27017/login";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSession);
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
app.get('/', routes.index);//done
app.get('/login', routes.index);//done
app.post('/afterLogin', login.afterLogin);//done
app.post('/afterAdminLogin', login.afterAdminLogin);
app.post('/logout', login.logout);//done
app.post('/createAccount',login.createAccount);//done
app.post('/saveAddress',login.saveAddress);//done
app.post('/saveCardDetails',login.saveCardDetails);//done
app.post('/deleteAccount',login.deleteAccount);

//admin
app.get('/listFarmerRequests',admin.listFarmerRequests);
app.get('/listProductRequests',admin.listProductRequests);
app.get('/listCustomerRequests',admin.listCustomerRequests);
app.get('/approveFarmer',admin.approveFarmer);
app.get('/approveProduct',admin.approveProduct);
app.get('/approveCustomer',admin.approveCustomer);
app.get('/viewProduct',admin.viewProduct);
app.get('/viewCustomerAccount',admin.viewCustomerAccount);
app.get('/fetchStatisticsData',admin.fetchStatisticsData);
app.get('/fetchDeliveryDetails',admin.fetchDeliveryDetails);
app.get('/fetchRidesDetails',admin.fetchRidesDetails);
app.get('/searchBillDetails',admin.searchBillDetails);
app.get('/fetchBillDetails',admin.fetchBillDetails);

//customer
app.post('/listCustomers',customer.listCustomers);
app.post('/postReview',customer.postReview);

//farmers
app.post('/listFarmers',farmer.listFarmers);
app.post('/amendFarmerDetails',farmer.amendFarmerDetails);
app.post('/searchFarmer',farmer.searchFarmer);
app.post('/fetchFarmerDetails',farmer.fetchFarmerDetails);

//product
app.post('/createProduct',product.createProduct);
app.post('/deleteProduct',product.deleteProduct);
app.post('/listProducts',product.listProducts);
app.post('/listAllProducts',product.listAllProducts);
app.post('/amendProductDetails',product.amendProductDetails);
app.post('/searchProduct',product.searchProduct);
app.post('/fetchProductDetails',product.fetchProductDetails);
 
//billing
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