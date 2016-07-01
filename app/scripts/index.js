var $ = window.jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

require('bootstrap-sass');

var models = require('./models/food.js');
var FoodCollection = require('./models/food.js').FoodCollection;
var FoodList = require('./components/menulisting.jsx').FoodList;

var foodMenu = new models.FoodCollection();
foodMenu.add([
  // Appetizers //
  {'tag': 'appetizer', 'name': 'Egg Roll', 'description': 'tasty greens, fried egg, and spices wrapped in fried fila', 'price': '$1.45'},
  {'tag': 'appetizer', 'name': 'Spring Roll', 'description': 'fresh greens with light seasoning wrapped in fried fila', 'price': '$1.25'},
  {'tag': 'appetizer', 'name': 'Wonton Soup', 'description': 'hot soup with fried wonton in chicken broth flavor', 'price': '$2.95'},
  {'tag': 'appetizer', 'name': 'Egg Drop Soup', 'description': 'hot soup of egg flavoring in heavy broth', 'price': '$2.95'},
  // Salads //
  {'tag': 'salad', 'name': 'Shrimp Salad', 'description': 'spring greens, carrots, radish, tomatoes & tasty fresh shrimp with choice of dressing', 'price': '$8.50'},
  {'tag': 'salad', 'name': 'Caesar Salad', 'description': 'classic Caesar salad with shredded mozarrella cheese and croutons with tangy dressing', 'price': '$7.25'},
  {'tag': 'salad', 'name': 'House Salad', 'description': 'variety of greens, carrots, radish, tomatoes, and croutons with choice of dressing', 'price': '$6.95'},
  //Entrees //
  {'tag': 'entree', 'name': 'Pad Thai', 'description': 'yummy yummy yummy for your tummy tummy tummy', 'price': '$8.20'},
  {'tag': 'entree', 'name': 'Pineapple Fried Rice', 'description': 'sure it’ fattening but it tastes sooooo good!', 'price': '$9.25'},
  {'tag': 'entree', 'name': 'Thai Nee Dish', 'description': 'not much for you to eat but it is spicy to keep remembering long time', 'price': '$7.95'},
  //Desserts //
  {'tag': 'dessert', 'name': 'Thai Pie', 'description': 'A sweet rhyme for your mouth to taste', 'price': '$3.50'},
  {'tag': 'dessert', 'name': 'Apple Pie', 'description': 'What? everybody loves apple pie including us', 'price': '$3.50'},
  {'tag': 'dessert', 'name': 'Khao Nieow Ma Muang', 'description': 'rice with mango may not sound good, but it sure tastes good', 'price': '$3.50'},
  {'tag': 'dessert', 'name': 'Kanom Pia', 'description': 'Mmmmmm....crunchy coconut balls! Do I need to say more?!', 'price': '$2.95'},
  //Drinks //
  {'tag': 'drink', 'name': 'Soda', 'description': 'Coke, Diet Coke, Sprite, Dr. Pepper', 'price': '$1.95'},
  {'tag': 'drink', 'name': 'Iced Tea', 'description': 'sweet, half & half, or unsweetened', 'price': '$1.50'},
  {'tag': 'drink', 'name': 'Thai Beer', 'description': 'get tipsy...why not?', 'price': '$2.95'},
]);

ReactDOM.render(
  React.createElement(FoodList, {collection: foodMenu}),
  document.getElementById('container')
);
