$(function( ){
  //Route Model
  app.CarRoute = Backbone.Model.extend({
    urlRoot: '/cars/routes/'
  });

  //Routes Collection
  app.CarRoutes = Backbone.Collection.extend({
    model: app.CarRoute,
    url: '/cars/routes/'
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
      console.log('redner routes view...');
      var source = $('#RoutesTemplate').html();
      var template = Handlebars.compile(source);
      var html = template(this.collection.toJSON());
      $('#single-view-template').html(html);
    }
  });
});