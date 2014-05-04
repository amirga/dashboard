var Users = {};

Users.getAllUsers = function(request, reply) {

};
Users.add = {
    method: 'POST',
    path: '/users/add',
    config: {
        handler: function(request, reply) {
            var data = null;
            console.log(request);
            if (!app.lodash.isEmpty(request.payload)) {
                data = request.payload;
            } else if (!app.lodash.isEmpty(request.query)) {
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
        },
        validate: {
            payload: {
                username: app.Joi.string().required()
            }
        }
    }
};

Users.update = {
    method: 'PUT',
    path: '/users/update',
    config: {
        handler: function(request, reply) {
            reply({
                code: 'ok',
                data: 'update successfully!'
            }).type('application/json');
        },
        validate: {
            payload: {
                username: app.Joi.string().required()
            }
        }
    }
};

Users.delete = {
	method: 'DELETE',
	path: '/users/delete',
	config: {
		handler: function(request, reply) {
			reply({
                code: 'ok',
                data: 'Delete successfully!' + request.payload.username
            }).type('application/json');
		},
		validate: {
			payload: {
				username: app.Joi.string().required()
			}
		}
	}
};

Users.get = {
	method: 'GET',
	path: '/users/{id}',
	config: {
		handler: function(request, reply) {
			console.log('user id: ',request.params);
			reply({
                code: 'ok',
                data: 'User successfully!' + request.params.id
            }).type('application/json');
		},
		validate: {
			query: { 
				params: {
					id: app.Joi.string().required()	
				}
			}
		}
	}
};

Users.get_by_username = {
	method: 'GET',
	path: '/users/get/{user}',
	config: {
		handler: function(request, reply) {
			console.log('user param: ', request.params);
			reply({
                code: 'ok',
                data: 'User successfully!' + request.params.user
            }).type('application/json');
		},
		validate: {
			query: { 
				params: {
					user: app.Joi.string().required()	
				}
			}
		}
	}
};
module.exports = Users;
