$(function( ){
  //Route Model
  app.CarRoute = Backbone.Model.extend({
    urlRoot: '/cars/routes/all',
    default: {
      route_id: 100,
      start: '200',
      end: '300'
    }
  });

  //Routes Collection
  app.CarRoutes = Backbone.Collection.extend({
    model: Route,
    url: '/cars/routes/all'
  });

  //Route View
  app.CarRouteView = Backbone.View.extend({
    render: function() {
      console.log('render single routes view');
      var source = $('#RoutesTemplate').html()
      var template = Handlebars.compile(source);
      var html = template(this.model.toJSON());
      $('#single-view-template').html(html);
    }
  });
  // Routes View
  app.CarRoutesView = Backbone.View.extend({
    render: function() {
      console.log('redner users view...');
      var source = $('#RoutesTemplate').html();
      var template = Handlebars.compile(source);
      var html = template(this.collection.toJSON());
      $('#single-view-template').html(html);
    },
    initialize: function(){
      this.collection.on('add', this.render, this)
    }
  });
});