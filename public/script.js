app = {};
app.setActiveMenu = function(args) {
  $('ul.navbar-nav > li').each(function(key,val){
   $(val).removeClass('active');
  });
  $(args).addClass('active');
  //Call View
  app.callSpecificView(args);
};
app.clearAllTemplate = function() {
  //clear catrgory
  $('#category-test').html('');
  $('#test-cont').html('');
  $('#select-category').html('');
  $('#user-render').html('');
  $('#single-view-template').html('');
};

app.callSpecificView = function(args) {
  var View = $(args).children().text().toLowerCase();
  app.clearAllTemplate();
  switch (View) {
    case 'critertion':
      app.initCategory();
      break;
    case 'user': 
      app.initUser();
      break;
    case 'users':
      app.initUsers();
      break;
    case 'routes':
      app.initRoutes();
      break;
  }
};

app.initRoutes = function(){
  console.log('init routes');
  console.log(app);
  var car_route = new app.CarRoutes({id:1});
  var car_routes_view = new app.CarRouteView({
    model: car_route
  });
  car_routes_view.render();
};

app.initUsers = function() {
  console.log('initUsers');
  var users = new Users();
  var user2 = new User({name: "Jill", age: 15, email: 'jill@test.com', username: 'jillo'});
  var user1 = new User({name: "Tim", age: 5, email: 'tim@test.com', username: 'timtim' });
  
  users.add(user1);
  users.add(user2);
  var usersView = new UsersView({
    collection: users
  });
  usersView.render();
};

app.initUser = function() {
  var user1 = new User({name: "Tim", age: 5, email: 'tim@test.com', username: 'timtim' });
  var userView = new UserView({
    model: user1
  });
  userView.el = $('#UserTemplate');
  userView.render();
};

app.initCategory = function(){
  var categoryModel = new app.Category({
    id : 1234,
    name : "some category name"
  });
  
  var queryCriterion = new app.QueryCriterion({
    id : 123,
    name : "critertion name",
    categories : [
      { id : 1, name : "category 1"},
      { id : 2, name : "category 2"},
      { id : 3, name : "category 3", selected : true},
      { id : 4, name : "category 4"},
      { id : 5, name : "category 5"}
    ]
  });

  var queryCriterionView = new app.QueryCriterionView({ model : queryCriterion });
  var selectCriteria = new app.CategorySelectView({ model : queryCriterion , el : $('#select-category')});
  
  selectCriteria.render();

  var elem = $('#category-test');
  
  elem.html(queryCriterionView.render().$el);  
  queryCriterion.categories.models[0].set('selected', true);
};
$(function( ){
  //Set Listener for Nav bar
  $('ul.navbar-nav > li').click(function(e){
    e.preventDefault();
    console.log(e);
    console.log(this);
    app.setActiveMenu(this);
  });
  
});