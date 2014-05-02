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
      config: {
        handler: routes.Site.contact,
        validate: {
            payload: {
                name: Joi.string().required(),
                phone: Joi.string().min(9).max(12).regex(/[0-9]/).required(),
                email: Joi.string().email().required()
            }
        }  
      }
      
    },{
        method: 'POST',
        path: '/user/add',
        config: {
            handler: routes.Users.add,
            validate: {
                payload: {
                    username: Joi.string().required()
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
                    username: Joi.string().required()
                }
            }    
        }
        
    }]
);

server.start(function() {
    console.log('Server started at: ' + server.info.uri);
});
