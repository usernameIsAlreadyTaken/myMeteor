
var Products = new Meteor.Collection("Products");

if (Meteor.isClient) {

  Template.Products.ProductArr = function(){
    return Products.find({}, {sort: {Name: 1}});
  };

  Template.Products.events = {
    "click .Product" : function(){
      if(this.InStock){
        confirm("Would you like to buy a " + this.Name + " for " + this.Price + "$ ?");
      }else{
        alert("That item is not in stock");
      }
    }
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Products.remove({});
    Products.insert({Name : "Hammer", Price : 4.50, InStock : true});
    Products.insert({Name : "Wrench", Price : 2.70, InStock : true});
    Products.insert({Name : "Screw Driver", Price : 3.00, InStock : false});
    Products.insert({Name : "Drill", Price : 5.25, InStock : true});
  });
}
