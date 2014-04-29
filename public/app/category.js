$(function( ){
app.Category = Backbone.Model.extend({
    defaults : {
      name : "unknown category",
      id : "no id for category",
      selected : false
    },    
    toggleSelect : function()
    {
      this.set({
        selected : !this.get('selected')
      });
    }
});
    
app.Categories = Backbone.Collection.extend({
    model : app.Category,
    deselectAll : function() {
      this.each(function(category){
        category.set({selected : false});
      });
    }
});
    
  app.QueryCriterion = Backbone.Model.extend({
      defaults : {
        name : "unknown",
        id : "no id" 
      },     
      initialize : function(){
        this.categories = new app.Categories(this.attributes.categories);
      },
      deselectAll : function() {
        this.categories.deselectAll();
      }
  });
  
  app.QueryCriterionView = Backbone.View.extend({
    template : function(){
      var source = $('#query-criterion-template').html();
      return Handlebars.compile(source);
    }(),
    render : function()
    {
      var $html = $(this.template(this.model.attributes));
      this.$el.html($html.html());
      
      var categoryList = new app.CategoriesListView({ 
        collection : this.model.categories, 
        el : this.$el.find('.categories-container')
      });
      categoryList.render();      
      return this;
    },
    events : {
      'click .clear-criteria-on-click' : "deselectAll"
    },
    deselectAll : function(evt) {
      this.model.deselectAll();
    }
  });  
  
  app.CategoriesListView = Backbone.View.extend({
    render : function()
    {
      this.collection.each(this.renderCategory, this);
    },
    renderCategory : function(category)
    {
      var categoryView = new app.CategoryView({ model : category });
      this.$el.append(categoryView.render().el);
    }
  });

  app.CategoryView = Backbone.View.extend({
    template : function(){
      var source = $('#category-template').html();
      return Handlebars.compile(source);
    }(),
    render : function()
    {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    initialize : function(){
      this.model.on('change:selected', this.render, this);
    },
    events : {
      'click input[type="checkbox"]' : "toggleSelection"
    },
    toggleSelection : function(evt)
    {
      this.model.toggleSelect();
    }
  });
 
 
 app.CategorySelectView = Backbone.View.extend({
  template : function(){
    var source = $('#search-criteria-template').html();
    return Handlebars.compile(source);
  }(),
  initialize : function(){
    this.model.categories.bind("change:selected", this.categoryChanged, this);
  },
  categoryChanged : function(evt) {
    var currentData = this.$select.select2("data");
    if(evt.attributes.selected)
    {
      var toAdd = {id : evt.id, text : evt.attributes.name};
      currentData.push(toAdd);
      this.$select.select2("data", currentData);
    }
    else {
      var strId = evt.id +'';
      var remainings = _.filter(currentData, function(category){
        return category.id !== strId && category.id !== evt.id;
      });
      this.$select.select2("data", remainings);
    }
  },
  render : function() {
    var readyTemplate = this.template(this.model.attributes);
    this.$el.append(readyTemplate);
    
    var selectId = '#search-criteria-' + this.model.attributes.id;
    var $select = $(selectId).select2({
      containerCssClass : "patch-select-container"
    });
    var currentlySelected = this.model.categories.where({selected : true});
    var options = _.map(currentlySelected, function(category){
      return {
        id : category.attributes.id,
        text : category.attributes.name
      };
    });
    $select.select2('data', options);
    var selectWithEvents = _.extend({}, Backbone.Events);
    $select.on('change', function(evt){
      selectWithEvents.trigger('change', evt);
    });
    this.$select = $select;
    selectWithEvents.on('change', this.selectChanged, this);
  },
  selectChanged : function(evt)
  {
    var id, value;
    if(evt.added)
    {
      id = evt.added.id;
      value = true;
    }
    else 
    {
      id = evt.removed.id;
      value = false;
    }
    this.model.categories.get(id).set({ selected : value});
  }
 });
});