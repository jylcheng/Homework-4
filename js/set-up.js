//sets up pizza menu buttons
function pizzaRender(pizzas){
    for (var i = 0; i < pizzas.length; i++) {
        var pizza = pizzas[i];

        var dltag = $("<dl></dl>");
        var name = $("<dt></dt>");
        var desc = $("<dd></dd>");
        var price =$("<dd></dd>");

        //creates buttons that send in the size of pizza
        var small = $('<button type="button" class="add pizzas" data-type="pizza" data-name="' + pizza.name + '" data-size="S" data-price="' + pizza.prices[0] + '">Small $' + pizza.prices[0] + "</button>").addClass("order");
        var medium = $('<button type="button" class="add pizzas" data-type="pizza" data-name="' + pizza.name + '" data-size="M" data-price="' + pizza.prices[1] + '">Medium $' + pizza.prices[1] + "</button>").addClass("order");
        var large = $('<button type="button" class="add pizzas" data-type="pizza" data-name="' + pizza.name + '" data-size="L" data-price="' + pizza.prices[2] + '">Large $' + pizza.prices[2] + "</button>").addClass("order");
        var select = $("<ul></ul>").html(small[0].outerHTML + medium[0].outerHTML + large[0].outerHTML);

        $(desc).html(pizza.description + " " + select[0].outerHTML);
        $(name).html(pizza.name);

        $(dltag).html($(name)[0].outerHTML + $(price)[0].outerHTML + $(desc)[0].outerHTML);

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
} 

//sets up drink buttons
function drinkRender(drinks){
    for (var i = 0; i < drinks.length; i++) {
        var drink = drinks[i];
        var type = $("<ul><li></li></ul>");
        
        $(type).html('<button type="button" class="add misc" data-type="drink" data-name="' + drink.name + '"data-price="' + drink.price + '">' + drink.name + ' $' + drink.price + "</button>").find("button").addClass("order");
        $(type).appendTo(".drinking");
    }
}   

//sets up dessert buttons
function dessertRender(desserts){
    for (var i = 0; i < desserts.length; i++) {
        var dessert = desserts[i];
        var type = $("<ul><li></li></ul>");
        
        $(type).html('<button type="button" class="add misc" data-type="dessert" data-name="' + dessert.name + '"data-price="' + dessert.price + '">' + dessert.name + ' $' + dessert.price + "</button>").find("button").addClass("order");
        $(type).appendTo(".desserting");
    }
}   



