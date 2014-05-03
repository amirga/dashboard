var Site = {};

Site.home = {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {

        var context = {
            title: 'Doron',
            message: 'Hello, World'
        };

        return reply.view('index', context);
    }
};

Site.public = {

    method: 'GET',
    path: '/public/{path*}',
    handler: {
        directory: {
            path: './public',
            listing: false,
            index: true
        }
    }
};

Site.contact = {
    method: 'POST',
    path: '/contact/us',
    config: {
        handler: Site.contact = function(request, reply) {
            var obj_response = {
                Error: null,
                code: 'OK',
                payload: request.payload ? request.payload : {},
                params: request.params ? request.params : {},
                query: request.query ? request.query : {},
            };
            reply(obj_response).type('application/json').header('X-Custom', 'some-value');
        },
        validate: {
            payload: {
                name: app.Joi.string().required(),
                phone: app.Joi.string().min(9).max(12).regex(/[0-9]/).required(),
                email: app.Joi.string().email().required()
            }
        }
    }
};

module.exports = Site;
