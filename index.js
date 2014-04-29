var Hapi = require('hapi');
var server = new Hapi.Server('localhost', 5000, {
    views: {
        engines: {
            html: 'ejs'
        },
        path: __dirname + '/templates'
    }
});

//Routes
var getAllUsers = function(request, reply) {

};

var getUser = function(request, reply) {

};

var handler = function(request, reply) {

    var context = {
        title: 'Doron',
        message: 'Hello, World'
    };

    return reply.view('index', context);
};

server.route([{
    method: 'GET',
    path: '/public/{path*}',
    handler: {
        directory: {
            path: './public',
            listing: false,
            index: true
        }
    }
}, {
    method: 'GET',
    path: '/',
    handler: handler
}]);

server.start(function() {
    console.log('Server started at: ' + server.info.uri);
});
