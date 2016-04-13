

function afterLogin(req, res){
	var json_response;
	json_response={
			"statusCode":200
	}
	res.send(json_response)
};

exports.afterLogin = afterLogin;