var Users = {};

Users.getAllUsers = function(request, reply) {
	
};

Users.add = function(request, reply) {
	var data = null;
	console.log(request);
	if (!app.lodash.isEmpty(request.payload)){
		data = request.payload;
	}else if (!app.lodash.isEmpty(request.query)){
		data = request.query;
	} else {
		data = request.params;
	}
 	var obj_response = {
        Error: null,
        code: 'OK',
        data: data
    };
    reply(obj_response).type('application/json').header('X-Custom', 'some-value');
};

Users.update = function(request, reply) {
	reply({code: 'ok', data: 'update successfully!'}).type('application/json');
};

module.exports = Users;