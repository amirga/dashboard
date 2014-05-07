var Cars = {};

Cars.get_car = {
    method: 'GET',
    path: '/cars/{id}',
    config: {
        handler: function(request, reply) {
            reply({
                code: 'ok',
                data: {
                    carid: 123,
                    model: 'prius',
                    engine: 1200,
                    brand: 'toyota',
                    brand_id: 1,
                    model_sub: 'c'
                }
            }).type('application/json');
        },
        validate: {
            query: {
                params: {
                    id: app.Joi.number().required()
                }
            }
        }
    }
};

Cars.get_all_routes = {
    method: 'GET',
    path: '/cars/routes/all',
    config: {
        handler: function(request, reply) {
            reply({
                code: 'ok',
                data: [{route_id: 1, start: '1', end: '2'},{route_id: 2, start: '2', end: '3'},{route_id: 3, start: '3', end: '4'}]
            }).type('application/json');
        }
    }
};

Cars.get_single_route = {
    method: 'GET',
    path: '/cars/routes/{id}',
    config: {
        handler: function(request, reply) {
            reply({
                code: 'ok',
                data: {route_id: 1, start: '1', end: '2'}
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

Cars.get_location = {
    method: 'GET',
    path: '/cars/location/{value}',
    config: {
        handler: function(request, reply) {
            reply({
                code: 'ok',
                data: 'adsf'
            }).type('application/json');
        },
        validate: {
            query: {
            	params: {
            		value: app.Joi.string().required()
            	}
            }
        }
    }
};

Cars.post_location = {
    method: 'POST',
    path: '/cars/location',
    config: {
        handler: function(request, reply) {
            reply({
                code: 'ok',
                data: 'POST Location'
            }).type('application/json');
        },
        validate: {
            payload: {
                username: app.Joi.string().required(),
                device_id: app.Joi.string().alphanum().min(3).max(30).required(),
                lat: app.Joi.number().min(-50).max(50).required(),
                lang: app.Joi.number().min(-50).max(50).required()
            }
        }
    }
};



module.exports = Cars;