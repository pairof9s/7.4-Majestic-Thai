var React = require('react');
var _ = require('underscore');

var FoodCollection = require('../models/food').FoodCollection;
var CartCollection = require('../models/cart').CartCollection;
var CartItem = require('../models/cart').CartItem;



// Menu section
var TagTabs = React.createClass({
  render: function(){
    // Creating the horiz. tabs and the unique content within each tab
    var uniqueTab = _.uniq(this.props.collection.pluck('tag')); // pluck method is used via Underscore to pullout the unique property "tag" assigned to each item in collection array.
    var tabs = uniqueTab.map(function(tag, index){
      var active = index == 0 ? "active": ""; // "active" to designate the initial shown tab
      // Each tab listed as designated by the model property of "tag" using id "#". Each tab is selected thru a data-toggle when clicked upon to hide previous content and show new selected tab's content.
      return (
        <li role="presentation" className={active} key={tag + 'tab'}>
          <a href={"#"+tag} role="tab" data-toggle="tab">{tag}</a>
        </li>
      );
    });
    // The tab listing code. CSS removes bullets
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
    this.props.collection.on('update', this.forceUpdate); // Updates each new selection with the selected tab's unique properties via "tag" identifier.
    var cart = new CartCollection();
    this.setState({cartItems: cart});
  },
  handleAddToCart: function(model){
    // var cartItem = new CartItem();
    // cartItem.set('menu_id', model.get('_id'));
    // cartItem.set('title', model.get('title'));
    // cartItem.set('price', model.get('price'));
    // this.state.cartItems.add(cartItem);
    this.state.cartItems.add(model);
    this.forceUpdate();
  },
  handleRemoveFromCart: function(model){
  this.state.cartItems.remove(model);
  this.forceUpdate();
  },

  render: function(){
    var self = this; // Gives the collection properties to var "self" for later filtering.
    var lastTag = ''; // insures previous selected tags are void to prevent additional content being shown.

    var uniqueTab = _.uniq(this.props.collection.pluck('tag'));
    var tabContents = uniqueTab.map(function(tag, index){
      var active = index == 0 ? "active": "";
      // itemListing filters the collection properties to match the selected tab with its appropriate "tag" values only.
      var itemListing = self.props.collection.where({'tag': tag}).map(function(food){
        return <FoodItem handleAddToCart={self.handleAddToCart} foodModel={food} key={food.cid}/>
      });
      // Individual item's listing under their respective "tag" tab.
      return (
        <div key={tag + 'content'} role="tabpanel" className={"tab-pane " + active} id={tag}>
          {itemListing}
        </div>
      )
    });

// Menu and food types ("tag") section
    return (
      <div className="menu-box col-md-offset-2 col-md-8">
        <span><h3 className="menu-title">Menu</h3><h6 className="menu-title"> - Click on the respective price to order the selection.</h6></span>
        <TagTabs collection={this.props.collection}/>
        <div className="tab-content">
          {tabContents}
        </div>
        <div className="order-box">
        <Cart cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart}/>
        </div>
      </div>
    )
    // This Cart line of code above makes the call to create a Cart entry later below. As well, the removal method is substantiated with this call.
  },
});

// Menu individual item listing
var FoodItem = React.createClass({
  render: function(){
    var self = this;

    return (
      <div className="menu-item">
        {this.props.foodModel.get('name') + ' — '}
        {this.props.foodModel.get('description')}
        <button
          className="btn btn-warning btn-xs"
          onClick={function(){self.props.handleAddToCart(self.props.foodModel)}}>{this.props.foodModel.displayPrice()}</button>
      </div>
    )
  },
});

// Cart section
var Cart = React.createClass({

  render: function(){
    var self = this;
    var collection = this.props.cartItems;

    if(collection.length == 0){
      return <div />
    }
    // Cart entries - creates individual items added to cart as well as removal button.
    var cartItemList = collection.map(function(model){
      return (
        <li key={model.cid}>
          <span id="cart-item">{model.get('name') + ' — '} {model.displayPrice()}</span>
          <button className="btn btn-warning btn-xs" onClick={function(){
              console.log(self.props);
              self.props.handleRemoveFromCart(model)}}>
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        </li>
      )
    });
    // Cart area - designated area for the cart entries, cart title, cart total, and order button.
    return (
      <div className="well cart-box">
        <div className="glyphicon glyphicon-cutlery" id="cart-title"><h5>Your Order</h5></div>
        <ul>
          {cartItemList}
        </ul>
        <div className="cart-total">Cart Total: {collection.getCartTotal()}</div>
        <div className="order-button"><button className="btn btn-success btn-xs">Place Order</button></div>
      </div>
    );
  }
});



module.exports = {
  'TagTabs': TagTabs,
  'FoodList': FoodList,
  'FoodItem': FoodItem,
};
