var Users = {};

Users.getAllUsers = function(request, reply) {

};
Users.add = {
    method: 'POST',
    path: '/user/add',
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
    path: '/user/update',
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


module.exports = Users;
