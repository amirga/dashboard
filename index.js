global.app = {};
app.settings = require('./config');
console.log(app.settings);
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
    routes.Users.update
    ]
);

server.start(function() {
    console.log('Server started at: ' + server.info.uri);
});
