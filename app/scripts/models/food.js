var Backbone = require('backbone');


var Food = Backbone.Model.extend({
  // idAttributes: '_id',
  // defaults: {
  //   'name': '',
  //   'description': '',
  //   'price': ''
  // },
  displayPrice: function(){
    return '$' + (this.get('price') / 100).toFixed(2);
  }
});

var FoodCollection = Backbone.Collection.extend({
  model: Food,

});


module.exports = {
  'Food': Food,
  'FoodCollection': FoodCollection
}
