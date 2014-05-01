global.app = {};
app.lodash = require('lodash');
var Hapi = require('hapi');
var Joi = require('joi');
var routes = require('./routes');
var server = new Hapi.Server('localhost', 5000, {
    views: {
        engines: {
            html: 'ejs'
        },
        path: __dirname + '/templates'
    }
});

console.log(routes);
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
    },{
        method: 'POST',
        path: '/user/add',
        config: {
            handler: routes.Users.add,
            validate: {
                query: {
                    username: Joi.string()
                }
            }    
        }
        
    },{
        method: 'PUT',
        path: '/user/update',
        config: {
            handler: routes.Users.update,
            validate: {
                payload: {
                    username: Joi.string()
                }
            }    
        }
        
    }]
);

server.start(function() {
    console.log('Server started at: ' + server.info.uri);
});
