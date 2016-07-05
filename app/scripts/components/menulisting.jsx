var React = require('react');
var _ = require('underscore');

var FoodCollection = require('../models/food').FoodCollection;
var CartCollection = require('../models/cart').CartCollection;
var CartItem = require('../models/cart').CartItem;


// Cart section //
var Cart = React.createClass({
  render: function(){
    var self = this;
    var collection = this.props.cartItems;

    if(collection.length == 0){
      return <div />
    }

    var cartItemList = collection.map(function(model){
      return (
        <li key={model.cid}>
          {model.get('title')} {model.displayPrice()}
          <button className="btn btn-warning btn-xs" onClick={function(){self.props.handleRemoveFromCart(model)}}><span className="glyphicon glyphicon-remove"></span> remove</button>
        </li>
      )
    });

    return (
      <div className="well cart-box">
        <ul>
          {cartItemList}
        </ul>
        <div className="cart-total">Cart Total: {collection.getCartTotal()}</div>
      </div>
    );
  }
});


// Menu section //
var TagTabs = React.createClass({
  render: function(){
    // Creating the horiz. tabs and the unique content within each tab //
    var uniqueTab = _.uniq(this.props.collection.pluck('tag')); // pluck method is used via Underscore to pullout the unique property "tag" assigned to each item in collection array. //
    var tabs = uniqueTab.map(function(tag, index){
      var active = index == 0 ? "active": ""; // "active" to designate the initial shown tab //
      // Each tab listed as designated by the model property of "tag" using id "#". Each tab is selected thru a data-toggle when clicked upon to hide previous content and show new selected tab's content. //
      return (
        <li role="presentation" className={active} key={tag + 'tab'}>
          <a href={"#"+tag} role="tab" data-toggle="tab">{tag}</a>
        </li>
      );
    });
    // The tab listing page code. CSS removes bullets //
    return (
      <ul className="nav nav-tabs" role="tablist">
        {tabs}
      </ul>
    )
  }
})

var FoodList = React.createClass({
  getInitialState: function(){
    return {cartItems: []};
  },
  componentWillMount: function(){
    this.props.collection.on('update', this.forceUpdate); // Updates each new selection with the selected tab's unique properties via "tag" identifier. //
    var cart = new CartCollection();
    this.setState({cartItems: cart});
  },
  handleAddToCart: function(model){
    var cartItem = new CartItem();
    cartItem.set('menu_id', model.get('_id'));
    cartItem.set('title', model.get('title'));
    cartItem.set('price', model.get('price'));
    this.state.cartItems.add(cartItem);
    this.forceUpdate();
  },
  handleRemoveFromCart: function(model){
  this.state.cartItems.remove(model);
  this.forceUpdate();
  },
  render: function(){
    var self = this; // Gives the collection properties to var "self" for later filtering. //
    var lastTag = ''; // insures previous selected tags are void to prevent additional content being shown. //

    var uniqueTab = _.uniq(this.props.collection.pluck('tag'));
    var tabContents = uniqueTab.map(function(tag, index){
      var active = index == 0 ? "active": "";
      // itemListing filters the collection properties to match the selected tab with its appropriate "tag" values only. //
      var itemListing = self.props.collection.where({'tag': tag}).map(function(food){
        return <FoodItem handleAddToCart={self.handleAddToCart} foodModel={food} key={food.cid}/>
      });
      // Individual item's listing under their respective "tag" tab. //
      return (
        <div key={tag + 'content'} role="tabpanel" className={"tab-pane " + active} id={tag}>
          {itemListing}
        </div>
      )
    });

// Menu and food types ("tag") section //
    return (
      <div className="menu-box col-md-8">
        <span><h3 className="menu-title">Menu</h3><h6 className="menu-title"> - Click on the respective price to order the selection.</h6></span>
        <TagTabs collection={this.props.collection}/>
        <div className="tab-content">
          {tabContents}
        </div>
        <div className="order-box">
        <Cart cartItems={this.state.cartItems}/>
        </div>
      </div>
    )
  },
});

// Menu individual item listing //
var FoodItem = React.createClass({
  render: function(){
    var self = this;

    return (
      <div className="menu-item">
        {this.props.foodModel.get('name') + ' — '}
        {this.props.foodModel.get('description')}
        <button
          className="btn btn-warning btn-xs"
          onClick={function(){self.props.handleAddToCart(self.props.foodModel)}}>{this.props.foodModel.get('price')}</button>
      </div>
    )
  },
});


// Main container for index file's javascript //
// var AppContainer = React.createClass({
//   getInitialState: function(){
//     return {
//       foodMenu: [],
//       cartItems: []
//     }
//   },
//
//   componentWillMount: function(){
//     var foodMenu = new FoodCollection();
//     var cartItems = new CartCollection();
//
// // Menu items' content //
//     foodMenu.add([
//       // Appetizers //
//       {'tag': 'appetizer', 'name': 'Egg Roll', 'description': 'tasty greens, fried egg, and spices wrapped in fried fila', 'price': '$1.45'},
//       {'tag': 'appetizer', 'name': 'Spring Roll', 'description': 'fresh greens with light seasoning wrapped in fried fila', 'price': '$1.25'},
//       {'tag': 'appetizer', 'name': 'Wonton Soup', 'description': 'hot soup with fried wonton in chicken broth flavor', 'price': '$2.95'},
//       {'tag': 'appetizer', 'name': 'Egg Drop Soup', 'description': 'hot soup of egg flavoring in heavy broth', 'price': '$2.95'},
//       // Salads //
//       {'tag': 'salad', 'name': 'Shrimp Salad', 'description': 'spring greens, carrots, radish, tomatoes & tasty fresh shrimp with choice of dressing', 'price': '$8.50'},
//       {'tag': 'salad', 'name': 'Caesar Salad', 'description': 'classic Caesar salad with shredded mozarrella cheese and croutons with tangy dressing', 'price': '$7.25'},
//       {'tag': 'salad', 'name': 'House Salad', 'description': 'variety of greens, carrots, radish, tomatoes, and croutons with choice of dressing', 'price': '$6.95'},
//       //Entrees //
//       {'tag': 'entree', 'name': 'Pad Thai', 'description': 'yummy yummy yummy for your tummy tummy tummy', 'price': '$8.20'},
//       {'tag': 'entree', 'name': 'Pineapple Fried Rice', 'description': 'sure it’ fattening but it tastes sooooo good!', 'price': '$9.25'},
//       {'tag': 'entree', 'name': 'Thai Nee Dish', 'description': 'not much for you to eat but it is spicy to keep remembering long time', 'price': '$7.95'},
//       //Desserts //
//       {'tag': 'dessert', 'name': 'Thai Pie', 'description': 'A sweet rhyme for your mouth to taste', 'price': '$3.50'},
//       {'tag': 'dessert', 'name': 'Apple Pie', 'description': 'What? everybody loves apple pie including us', 'price': '$3.50'},
//       {'tag': 'dessert', 'name': 'Khao Nieow Ma Muang', 'description': 'rice with mango may not sound good, but it sure tastes good', 'price': '$3.50'},
//       {'tag': 'dessert', 'name': 'Kanom Pia', 'description': 'Mmmmmm....crunchy coconut balls! Do I need to say more?!', 'price': '$2.95'},
//       //Drinks //
//       {'tag': 'drink', 'name': 'Soda', 'description': 'Coke, Diet Coke, Sprite, Dr. Pepper', 'price': '$1.95'},
//       {'tag': 'drink', 'name': 'Iced Tea', 'description': 'sweet, half & half, or unsweetened', 'price': '$1.50'},
//       {'tag': 'drink', 'name': 'Thai Beer', 'description': 'Thai one on...why not?', 'price': '$2.95'},
//     ]);
//
//     this.setState({
//       'foodMenu': foodMenu,
//       'cartItems': cartItems
//     });
//   },
//
//   handleAddToCart: function(model){
//     var cartItem = new CartItem();
//     cartItem.set('menu_id', model.get('_id'));
//     cartItem.set('title', model.get('title'));
//     cartItem.set('price', model.get('price'));
//     this.state.cartItems.add(cartItem);
//     this.forceUpdate();
//   },
//
//   handleRemoveFromCart: function(model){
//   this.state.cartItems.remove(model);
//   this.forceUpdate();
//   },
//
//   render: function(){
//     return (
//       <div>
//         <Food handleAddToCart={this.handleAddToCart} foodMenu={this.state.foodMenu}/>
//         <Cart handleRemoveFromCart={this.handleRemoveFromCart} cartItems={this.state.cartItems}/>
//       </div>
//     );
//   }
// });


module.exports = {
  // 'AppContainer': AppContainer,
  'TagTabs': TagTabs,
  'FoodList': FoodList,
  'FoodItem': FoodItem,
};
