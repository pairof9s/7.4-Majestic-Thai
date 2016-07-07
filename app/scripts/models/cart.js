var Backbone = require('backbone');

var Food = require('./food').Food;

var CartItem = Food.extend();

var CartCollection = Backbone.Collection.extend({
  model: CartItem,
  getCartTotal: function(){
    var price = this.reduce(function(memo, model){
      return (memo + model.get('price') / 100);
    }, 0);
    return '$' + price.toFixed(2);
  }
});


module.exports = {
  'CartItem': CartItem,
  'CartCollection': CartCollection
}
