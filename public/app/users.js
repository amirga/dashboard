//User Model
var User = Backbone.Model.extend({
  default: {
    username: 'test',
    email: 'test@test.com',
    phone: '9876543210'
  }
});

//Users Collection
var Users = Backbone.Collection.extend({
model: User,
});

//User View
var UserView = Backbone.View.extend({
  render: function() {
    console.log('render single user view');
    var source = $('#UserTemplate').html()
    var template = Handlebars.compile(source);
    var html = template(this.model.toJSON());
    $('#user-render').html(html);
  }
});
// Users View
var UsersView = Backbone.View.extend({
  render: function() {
    console.log('redner users view...');
    var source = $('#UsersTemplate').html();
    var template = Handlebars.compile(source);
    var html = template(this.collection.toJSON());
    $('#user-render').html(html);
  },
  initialize: function(){
    this.collection.on('add', this.render, this)
  }
});