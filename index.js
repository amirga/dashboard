global.app = {};
app.settings = require('./config');
app.lodash = require('lodash');
app.Hapi = require('hapi');
app.Joi = require('joi');

var routes = require('./routes');
var server = new app.Hapi.Server('localhost', 5000, {
    views: {
        engines: {
            html: 'ejs'
        },
        path: __dirname + '/templates'
    }
});

server.route(
    [
    routes.Site.public,
    routes.Site.home,
    routes.Site.contact,
    routes.Users.add,
    routes.Users.update,
    routes.Users.delete,
    routes.Users.get,
    routes.Users.get_by_username,
    routes.Cars.get_location,
    routes.Cars.post_location,
    routes.Cars.get_all_routes,//Get all route by sepcific car
    routes.Cars.get_single_route,//Get specific route by car
    routes.Cars.get_car
    ]
);

server.start(function() {
    console.log('Server started at: ' + server.info.uri);
});
