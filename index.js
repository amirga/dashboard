var Hapi = require('hapi');
var routes = require('./routes');
var server = new Hapi.Server('localhost', 5000, {
    views: {
        engines: {
            html: 'ejs'
        },
        path: __dirname + '/templates'
    }
});


server.route(
    [{
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
        handler: routes.Site.home
    },{
      method: 'POST',
      path: '/contact/us',
      handler: routes.Site.contact
    }]
);

server.start(function() {
    console.log('Server started at: ' + server.info.uri);
});
