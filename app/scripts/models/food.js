var Backbone = require('backbone');


var Food = Backbone.Model.extend({
  idAttributes: '_id',
  defaults: {
    'name': '',
    'description': '',
    'price': ''
  }
});

var FoodCollection = Backbone.Collection.extend({
  model: Food,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/D9food'
});

module.exports = {
  'Food': Food,
  'FoodCollection': FoodCollection
}
