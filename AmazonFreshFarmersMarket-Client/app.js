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
var signup = require("./routes/signup");

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



app.get('/', routes.index);
app.get('/login', routes.index);
app.get('/adminLogin', login.adminLogin);

app.post('/createAccount',login.createAccount);
app.post('/saveAddress',login.saveAddress);
app.post('/saveCardDetails',login.saveCardDetails);

app.post('/afterLogin', login.afterLogin);
app.post('/afterAdminLogin', login.afterAdminLogin);
app.post('/logout', login.logout); 

mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});