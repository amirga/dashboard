var Site = {};
Site.home = function(request, reply) {

    var context = {
        title: 'Doron',
        message: 'Hello, World'
    };

    return reply.view('index', context);
};

Site.contact = function(request, reply) {
    var obj_response = {
        Error: null,
        code: 'OK',
        payload: request.payload ? request.payload : {},
        params: request.params ? request.params : {},
        query: request.query ? request.query : {},
    };
    reply(obj_response).type('application/json').header('X-Custom', 'some-value');
};

module.exports = Site;