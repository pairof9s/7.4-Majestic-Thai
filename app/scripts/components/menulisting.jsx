var React = require('react');
var _ = require('underscore');

var TagTabs = React.createClass({
  render: function(){
    var uniqueTab = _.uniq(this.props.collection.pluck('tag'));
    var tabs = uniqueTab.map(function(tag, index){
      var active = index == 0 ? "active": "";
      return (
        <li role="presentation" className={active} key={tag + 'tab'}>
          <a href={"#"+tag} role="tab" data-toggle="tab">{tag}</a>
        </li>
      );
    });

    return (
      <ul className="nav nav-tabs" role="tablist">
        {tabs}
      </ul>
    )
  }
})

var FoodList = React.createClass({
  componentDidMount: function(){
    this.props.collection.on('update', this.forceUpdate);
  },
  render: function(){
    var self = this;
    var lastTag = '';

    var uniqueTab = _.uniq(this.props.collection.pluck('tag'));
    var tabContents = uniqueTab.map(function(tag, index){
      var active = index == 0 ? "active": "";

      var foodList = self.props.collection.where({'tag': tag}).map(function(food){
        return <FoodItem foodModel={food} key={food.cid}/>
      });

      return (
        <div key={tag + 'content'} role="tabpanel" className={"tab-pane " + active} id={tag}>
          {foodList}
        </div>
      )
    });

    return (
      <div className="menu-box col-md-9">
        <h3>Menu</h3>
        <TagTabs collection={this.props.collection}/>
        <div className="tab-content">
          {tabContents}
        </div>
      </div>
    )
  },
});

var FoodItem = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.foodModel.get('name') + ' — '}
        {this.props.foodModel.get('description') + ' ...... '} 
        {this.props.foodModel.get('price')}
      </div>
    )
  },
});

module.exports = {
  'TagTabs': TagTabs,
  'FoodList': FoodList,
  'FoodItem': FoodItem
};
