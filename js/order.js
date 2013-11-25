
$(function(){
	var subTotal = 0;

	var pizzas = com.dawgpizza.menu.pizzas;
	var drinks = com.dawgpizza.menu.drinks;
    var desserts = com.dawgpizza.menu.desserts;

    pizzaRender(pizzas);
    drinkRender(drinks);
    dessertRender(desserts);

	var cart = {
	    name: null,
	    address1: null,
	    zip: null,
	    phone: null,
	    items: [] //empty array
	};

	//adds any items that the user wants in their carts (aka into the array)
	$('.add').click(function(){
		var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price'),

        };
	 cart.items.push(newCartItem); //add item to cart
     console.log("Good Job! You just added: " + newCartItem.name + " and its size is " + newCartItem.size + "(" + newCartItem.price + ")");

    renderCart(cart, $('.cart-container'));
	});

	//checks to see if the user is over $20 or at $20 before they can buy.
	$('.submit-cart').click(function(){
		if(subTotal >= 20){
			$(".minimum").hide();
			alert("Before you check out you need to tell us where you live!");
		
		} else{
			$(".minimum").show();
		}
	});

	//Clears the cart when the button is pressed.
	$(".clear-cart").click(function() {
        cart.items = [];
        renderCart(cart,  $('.cart-container'));
    });

	$(".submit-it").click(function(){
		var signupForm = $('.address-form'); //wrap raw DOM <form> into JQ object to use JQ methods on it
                
	    var current;
	    var value;

	    //makes sure the user inputted his/her name
	    current = signupForm.find('.form-name'); 
	    value = current.val(); 
	    if(value.length == 0) {
	            alert('Please enter a name.');
	            return false;
	    } else {
	            cart.name = value;
	    }

        var addr1Input = signupForm.find('.form-addr1');
        var addr1Value = addr1Input.val();

        //validates zipcode and address
        if (addr1Value.length > 0) {
            var zipInput = signupForm.find('input[name="zip"]');
            var zipValue = zipInput.val();
            if(zipValue.length == 0){
                alert('Please correctly add in zipcode');
                return false;
            }
            cart.address1 = addr1Value;
            cart.zip = zipValue;

        } else if(addr1Value.length == 0) {
            alert("Please enter your address");
            return false;
        }

 	 	 //Address line 2 is optional
        current = signupForm.find('.form-addr2'); 
        value =  current.val();
        if(0 < value.length) {
                cart.address2 = value;
        }

        //ensures you give a phone number
        current = signupForm.find('.form-phone');
        value = current.val();
        if(0 === value.length) {
                alert('Please give us your phone number.');
                return false;
        } else {
                cart.phone = value;
        }

        postCart(cart, $('.cart-submit'))
	});
	
	//submits form onto the given url for POST
	function postCart(cart, cartForm) {
	    $("#orders").val(JSON.stringify(cart));

	    //submit the form--this will navigate to an order confirmation page
	    $(".address-form").find('[type="submit"]').trigger("click");
	} //postCart()


	//items the user press on gets put into the cart.
	function renderCart(cart, container){
		var template = $('.stuff-template');
		var idx, item;
		var sum = 0;
		var total = 0;

		$(".cart").show();
		container.empty();

		for(idx = 0; idx < cart.items.length; ++idx){
			item = cart.items[idx];
			sum += parseInt(item.price);
			var but = $("<button></button>");

			if(item.type == "pizza"){
				but.html(item.name +  " " + item.size + " " + "$" + item.price);
				
			}else{
				but.html(item.name +  " " + "$" + item.price);
			}
	 
		    but.attr('data-name', item.name);
		    but.attr('data-type', item.type);

		    console.log(item.type);
		    but.attr('data-size', item.size);
		    but.attr('data-price', item.price);
		    but.attr('class', "btn remove");
		    but.attr('data-index', idx);

		    container.append(but);
		}

		//calculates the subtotal and total (with tax)
		subTotal = sum;
		console.log(sum);
		$(".subtotal").html("Subtotal: $" + sum);
		total = sum * 1.095;
		$(".dah-total").html("Total (includes 0.095% tax): $" + total.toFixed(2));

		//removes items that are unwanted
		$('.remove').click(function(){
			var idxToRemove = this.getAttribute('.data-index');
			cart.items.splice(idxToRemove, 1);

			renderCart(cart, $('.cart-container'));
		})
	}

}); 