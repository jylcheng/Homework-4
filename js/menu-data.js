/* Takes information from the menu.js database and renders
through the information so it could get posted onto
the menu.html. to create a menu that can be changed
via the menu.js. */

$(function() {
    //on ready function
    var pizzas = com.dawgpizza.menu.pizzas;
    var drinks = com.dawgpizza.menu.drinks;
    var desserts = com.dawgpizza.menu.desserts;

    pizzaRender(pizzas);
    drinkRender(drinks);
    dessertRender(desserts);
}); 

function pizzaRender(pizzas){
    for (var i = 0; i < pizzas.length; i++) {
        var pizza = pizzas[i];

        var dltag = $("<dl></dl>");
        var name = $("<dt></dt>");
        var desc = $("<dd></dd>");
        var price =$("<dd></dd>");

        $(desc).html(pizza.description);
        $(price).html("S: $" + pizza.prices[0] + "/ M: $" + pizza.prices[1] + "/ L: $" + pizza.prices[2]);
        $(name).html(pizza.name);
        $(price).addClass("price");
        $(dltag).html($(name)[0].outerHTML + $(desc)[0].outerHTML + $(price)[0].outerHTML);

        //template is only used to figure out structure
        //of menu, gets removed.
        $('.template').remove();

        //checks whether or not it's vegetarian
        if (pizza.vegetarian) {
            $(dltag).appendTo(".veg");
        } else {
            $(dltag).appendTo(".meat");
        }
    }
} //Finds the name, description and price of pizza

function drinkRender(drinks){
    for (var i = 0; i < drinks.length; i++) {
        var drink = drinks[i];
        var type = $("<div>");
        var pricing = $("<span>");

        //labels the price to be stylized later
        $(pricing).html( " ($" + drink.price + ")");
        pricing.addClass("money");
    
        $(type).html(drink.name + $(pricing)[0].outerHTML);
        $(type).appendTo(".drinking");
    
    }
}   //Finds the name, description and price of drink


function dessertRender(desserts){
    for (var i = 0; i < desserts.length; i++) {
        var dessert = desserts[i];
        var type = $("<div>");
        var pricing = $("<span>");

        //labels the price to be stylized later
        $(pricing).html( " ($" + dessert.price + ")");
        pricing.addClass("money");
    
        $(type).html(dessert.name + $(pricing)[0].outerHTML);
        $(type).appendTo(".desserting");
    }
}   //Finds the name, description and price of dessert
