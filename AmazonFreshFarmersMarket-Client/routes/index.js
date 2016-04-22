var ejs = require('ejs');

exports.index = function(req, res){
	ejs.renderFile('./views/index.html',function(err, result) {
		if (!err) 
		{
			res.end(result);
		}
		else {
			res.end('An error occurred');
		}
	});
};

exports.adminLogin = function(req, res){
	ejs.renderFile('./views/index.html',function(err, result) {
		if (!err) 
		{
			res.end(result);
		}
		else {
			res.end('An error occurred');
		}
	});
};