var Site = {};
Site.home = function(request, reply) {

    var context = {
        title: 'Doron',
        message: 'Hello, World'
    };

    return reply.view('index', context);
};

exports.Site = Site;