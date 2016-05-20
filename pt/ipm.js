var s_id = 0;				// ID of the following suggestion
var menu_list_on = "none";	// None menu list is currently shown

var suggestions = 0;		// Counter of the suggestions made by the user, decremented every 30 seconds
var wait = false;			// If user has made 10 suggestions in a row, we must protect the other tables from the awful SPAM

var game = {};              // Object with some game variables
var playing = false;        // If the user is playing the game
var game_on = false;        // If the game is shown

// Random names of consumables
var names = ["Vodka", "Vodka RedBull", "Tosta Mista", "Cappuccino", "Imperial", "Caipirinha", "Cerveja à Arco"];
// And the correspondent prices
var prices = ["4.00", "5.50", "2.00", "1.20", "0.80", "3.50", "0.50"];

var drinks = [];                // Array that keeps the ids and the drinks name associated

var checkout = {};              // Items in the checkout cart
var checkoutIsVisible = false;  // If the checkout cart is visible

var order_open = false;             // If the order sidebar is open
var confirmation_div_open = false;  // If the confirmation menu is open
var order_menu_name = "none";       // Name of the Menu open to order something

var helpOn = false;         // If help content is shown or hidden

var clicks = 0;

/*
 * initCheckout ( )
 *
 * Initializes the checkout of the
 * current customer
 *
 */

function initCheckout() {

    checkout.total = 0;
    checkout.total_to_pay = 0;
    checkout.items = [];
    checkout.nextID = 1;
}

/*
 * Suggestion ( id, name, display )
 *
 * Constructor for a suggestion object
 *
 */

function Suggestion(id, name, display) {

    this.s_id = id;
    this.name = name;
    this.display = display;
}

/*
 * Order ( id, name, payed, quantity )
 *
 * Constructor for a order item object
 *
 */

function checkoutItem(name, price, quantity) {
    
    this.name = name;
    this.price = price;
    this.payed = false;
    this.quantity = quantity;
    this.totalPrice = price * quantity;
    
}

/*
 * compareSuggestions ( s_a , s_b )
 *
 * Receives two suggestions and checks if the number of suggestions
 * of the first is greater, equal, or lower than the second one
 *
 */

function compareSuggestions(s_a, s_b) {
  
    if (s_a.counter < s_b.counter) return 1;
    else if (s_a.counter > s_b.counter) return -1;     
    else return 0;
}

/*
 * sortSuggestions ( )
 *
 * Sorts the array of suggestions
 *
 */

function sortSuggestions() {

    drinks.sort(compareSuggestions);

}

/*
 * ignore (String)
 *
 * Receives an identifier of the suggestion and
 * removes it from the feed
 *
 */

function ignore(identifier) {
    
    drinks[identifier - 1].display = false;
	$('#' + identifier).fadeOut(300);
}

/*
 * ignoreAll ( )
 *
 * Removes all the suggestions from the feed
 *
 */

function ignoreAll(){
    
    var i = 1;
    
	for(i = 1; i <= s_id; i++){
		ignore(i);
	} 
}

/*
 * suggest (String, String)
 *
 * Receives an identifier and the price of a suggestion and
 * inserts it from the feed
 *
 */

function suggest(name, price) {
	
	if(wait == true) return;
    
    suggestions++;
    
    var i = 0;
    var hasDrink = false;
    var temp_drink;
    
    for( i = 0; i < drinks.length ; i ++) {
        
        if (drinks[i].name == name) {
            hasDrink = true;
            temp_drink = drinks[i];
            break;
        }
        
    }
    
    if(hasDrink && temp_drink.display) {
                
        var actual_html = '<div class=\"item\" id=\"' + temp_drink.s_id + '\">';
        actual_html += document.getElementById(temp_drink.s_id).innerHTML;
        actual_html += "</div>";
        
        $('#' + temp_drink.s_id).fadeOut(300, function() {
            
            $('#' + temp_drink.s_id).remove();
            $(actual_html).prependTo('#feed');
            document.getElementById("suggestion-number-" + temp_drink.s_id).innerHTML++;
            $('#' + temp_drink.s_id).fadeIn(500);
            
        });

       
    }

    else if (hasDrink && !(temp_drink.display)) {
        
        var actual = document.getElementById("suggestion-number-" + temp_drink.s_id).innerHTML++;
        drinks[i].display = true;
        $('#' + drinks[i].s_id).fadeIn(300);
    
    } else { 
    
        s_id++;
        
        var suggestion = new Suggestion( s_id, name, true);
        drinks.push(suggestion);
        
        var suggestion_html = suggestionHTMLGenerator( name, price, s_id );       
        
        $(suggestion_html).prependTo('#feed');
        $('#' + s_id).fadeIn(300);
            
    }
		
}

/*
 * replaceIcon (String, String)
 *
 * Receives an identifier of the icon and
 * action performed by it (click or declick)
 * and replaces the image of the icon
 *
 */

function replaceIcon(name , state){

    var id = 'nav-' + name;
	var replace = '<div id=\"' + id + '\" class="nav-item">';
    
    replace += '<img ';
    
    if( state == "declick" ){
        
        replace += 'onClick="incrClicks(); clicked(\'' + name + '\')"';
        replace += 'src="../images/' + name + '.png" />';
        
    } else {
        
        replace +='onClick="incrClicks(); deClicked(\'' + name + '\')"';
        replace += 'src="../images/' + name + '-pressed.png" />';
    
    }
    
	replace += '</div>';
		
	$('#' + id).replaceWith( replace );

}

/*
 * replaceIconOnClick (String)
 *
 * Receives an identifier of the icon clicked and
 * replaces its icon
 *
 */

function replaceIconOnClick( name ) {

    replaceIcon(name, "click");

}

/*
 * replaceIconOnDeClick (String)
 *
 * Receives an identifier of the icon declicked and
 * replaces its icon
 *
 */

function replaceIconOnDeClick( name ){

    replaceIcon(name , "declick");

}

/*
 * deClicked (String)
 *
 * Receives an identifier of the icon declicked and
 * performs the action associated with that icon
 *
 */

function deClicked( name ) {

	if(order_open){
        
		$('#order').fadeOut(10);
		$(".o_item").eq(0).remove();
		open_order = false;
		order_menu_name = "none";
        
	} else if (confirmation_div_open) {
        
        $('#confirm-order-container').fadeOut(10, function ( ) {
            confirmation_div_open = false;
            order_menu_name = "none";
        });
    
    }
    
    if (name == "help"){
    
        hideHelp( );
    
    } else if(name == "cart") {
        
        hideCart();
        
    } else if(name == "paint" || name == "snooker"){
	
        if( name == "snooker" && playing) {
            
            $('#snooker-game').fadeOut(10, function () {
                $('#globalfeed').css(
                    "margin-left", "500px"
                );
                $('#globalfeed').fadeIn(10);
            });
            
            game_on = false;
            
        } else {
            
            $('#' + name).fadeOut(10, function(){
                
                $('#globalfeed').fadeIn(10);
                
                $('#globalfeed').css(
                    "margin-left", "500px"
                );
                
            });
        
        }
        
        menu_list_on = "none";
		
	} else {
	
        $('#' + name).fadeOut(10, function(){
            $('#globalfeed').css(
                "margin-left", "500px"
            );
        });
        
        
        menu_list_on = "none";
    		
	}
    
    replaceIconOnDeClick( name );
    
    if(helpOn) {
        showHelp("none");
    }
    
}

/*
 * clicked (String)
 *
 * Receives an identifier of the icon clicked and
 * performs the action associated with that icon
 *
 */

function clicked( name ) { 
    
    if(name == 'exit') {
        
        exitApplication( );
        
    }
    
    else if (name == 'cart') {
        
        if(menu_list_on == "snooker" || menu_list_on == "paint") {
        
            alert("Por favor, saia do menu actual para visualizar a sua conta.\nObrigado pela compreensão.");
            return;

        }
        
        showCart( 10 );
    
    }
    
    else if(name == 'help'){
    
        showHelp(menu_list_on);
    
    }
    
    else if(menu_list_on == "none"){
	
		menu_list_on = name;
        
        if(order_open){
            
			$('#order').fadeOut(10, function(){
				$('#' + name).fadeIn(10);
			});
			
			replaceIconOnDeClick( order_menu_name );
			$(".o_item").eq(0).remove()
			open_order = false;
			order_menu_name = "none";
			
			
		} else {
            
            if( (name == "snooker") && playing && (game_on == false) ) {
                
                $('#snooker-game').fadeIn(10);
                game_on = true;
                  
            } else {
            
                $('#' + name).fadeIn(10);
                
            }
			
			if(helpOn) {
			    showHelp(name);
			}
		}
        
        
        if( name == "paint" || name == "snooker" ) {
            
            $('#globalfeed').fadeOut(10);
            
            if(checkoutIsVisible){
                hideCart( );
            }
            
            if(helpOn) {
                showHelp(name);
            }
            
        } else {
            
            $('#globalfeed').css(
                "margin-left", "0px"
             );
            
        }
        
        replaceIconOnClick( name );
        
    }
    
    else {
        
        if ( name == "snooker" && playing ) {

            $('#snooker-game').fadeIn(10);
            game_on = true;
            
            $('#' + menu_list_on).fadeOut(10);
            
            if(helpOn) {
                showHelp(name);
            }
            
        } else if ( playing && game_on ) {
        
            $('#snooker-game').fadeOut(10, function(){
                $('#' + name).fadeIn(10);
            });
            
            alert("Alerta: O jogo vai ser posto em modo Pausa.");
            pauseGame();
            
            if(helpOn) {
                showHelp(name);
            }
            
        } else {
            
            $('#' + menu_list_on).fadeOut(10, function(){
                $('#' + name).fadeIn(10);
            });
            
            if(helpOn) {
                showHelp(name);
            }
        }
        
        replaceIconOnDeClick( menu_list_on );
		
		if(! (( menu_list_on == "paint" && name == "snooker" ) || ( menu_list_on == "snooker" && name == "paint" ))){
            $('#globalfeed').fadeIn(10);
        }
					
		$('#globalfeed').css(
			"margin-left", "0px"
		);
        
        if( name == "paint" || name == "snooker" ) {
            if(checkoutIsVisible){
                hideCart( );
            }
            if(( menu_list_on == "paint" && name == "snooker" ) || ( menu_list_on == "snooker" && name == "paint" ));
            else $('#globalfeed').fadeOut(10);
        }
        
        if( menu_list_on == "snooker" && playing ) { game_on = false; }
        
        menu_list_on = name;
		
        replaceIconOnClick( name );

    }
    
}

/*
 * other_tables_suggestions ( )
 *
 * Generates suggestions from other tables
 * of the bar
 *
 */

function other_tables_suggestions() {

	var yes_or_no = Math.random();
	
	if(yes_or_no >= 0.5){
		var name = Math.floor((Math.random() * names.length));
		suggest(names[name], prices[name]);
	}

	t = setTimeout(function(){other_tables_suggestions()}, 20000);
}

/*
 * decrementSuggestions ( )
 *
 * Decrements the number of suggestions made, every
 * 30 seconds
 *
 */

function decrementSuggestions(){
	
	if(suggestions > 0)
		suggestions--;
		
	y = setTimeout(function() {decrementSuggestions() }, 30000);

}

/*
 * suggestionsNotAllowed ( )
 *
 * Checks if the user can make
 * suggestions or has already reached the limit
 *
 */

function suggestionsNotAllowed(){
    
	if(wait){
	
		if(suggestions == 0) {
			wait = false;
			alert("Pode voltar a sugerir produtos.\n\nObrigado pela compreensão");
			$('.suggest').prop('disabled', false);
		}
		
	} else {
				
		if(suggestions >= 10){
			wait = true;
			var minutos = Math.floor((suggestions * 30 ) / 60);
			alert("Ultrapassou o limite de sugestões, pode voltar a sugerir produtos dentro de aproximadamente " + (minutos + 1) + " minutos.\n\nObrigado pela compreensão");
		}
	}
	
	x = setTimeout(function() {suggestionsNotAllowed()}, 1000);
	
	return false;
	
}

/*
 * showHelp ( )
 *
 * Receives an identifier of the icon declicked and
 * performs the action associated with that icon
 *
 */

function showHelp(menu) {
    
    $('#help-content').css(
		"display", "block"
	);
	
	var newButtonAspect = '<div class="help" id="help-button" onClick="deClicked(\'help\')"><img src="../images/help-pressed.png" /></div>';
	
    $('#help-button').replaceWith(newButtonAspect);
    
    var content = helpTextHTMLGenerator(menu);
    $('#help-content').html(content);
        
    helpOn = true;
	
}

/*
 * hideHelp ( )
 *
 * Hides the help
 *
 */

function hideHelp() {
    
    $('#help-content').fadeOut(10);
	
	var newtext = '<div class="help" id="help-button" onClick="clicked(\'help\')"><img src="../images/help-button.png" /></div>';
	
    $('#help-button').replaceWith(newtext);
    
    helpOn = false;

}

/*
 * order ( name, price )
 *
 * Receives a consumable's name and price and generates
 * the HTML for that and adds it to the page
 *
 */

function order( name, price ) {
	
        var order_html = orderHTMLGenerator( name, price );       
        
        document.getElementById('order').innerHTML = order_html;
		
        if( menu_list_on != "none" ) {
            
            $('#' + menu_list_on).fadeOut(10, function(){
                $('#order').fadeIn(10);		
            });
            
            order_menu_name = menu_list_on;
            menu_list_on = "none";
            
        } else {
        
            $('#order').fadeIn(10);
            
            $('#globalfeed').css(
                "margin-left", "7px"
		    );
            
            order_menu_name = "none";
        
        }
    
		order_open = true;
			
}

/*
 * cancelOrder ( )
 *
 * Cancels the current order being made
 *
 */

function cancelOrder ( ) {
		
	order_open = false;
    
	if(order_menu_name == "none") {
        
         $('#order').fadeOut(20, function(){
                
                $('#globalfeed').css(
                   "margin-left", "500px"
                );
                
            });
    
    } else {
    
        menu_list_on = order_menu_name;
        order_menu_name = "none";
                
        $('#order').fadeOut(20, function(){
           $('#' + menu_list_on).fadeIn(20);	
        });
        
    }
                
    $(".o_item").eq(0).remove();

}

/*
 * confirmFinalOrder ( )
 *
 * Confirms the order que user is making
 *
 */

function confirmFinalOrder ( ) {

    var name = document.getElementById("order-name").innerHTML;
    var price = document.getElementById("order-literal-price").innerHTML; 
    var quantity = document.getElementById("order-quantity").innerHTML;   
        
    $('#confirm-order-container').fadeOut(10, function ( ) {
        
        if(order_menu_name != "none") {
        
            $('#' + order_menu_name).fadeIn(10);
            menu_list_on = order_menu_name;
            order_menu_name = "none";
        
        } else {
            
            $('#globalfeed').css(
                "margin-left", "500px"
            );
        }
        
        addToCart( name, price, quantity );
        showCart( 1000 );
        
    });
     
    $(".o_item").eq(0).remove();
    
}

/*
 * cancelFinalOrder ( )
 *
 * Confirms the order que user is making
 *
 */

function cancelFinalOrder ( ) {
    
    order_open = true;
    
    $('#order').fadeIn(10, function ( ) {
        $('#confirm-order-container').fadeOut(10);
    });
                       
    confirmation_div_open = false;
                       
}

/*
 * confirmOrder ( )
 *
 * The user sets the quantity of the drink to be ordered
 * and is redirectioned to the confirmation windows
 *
 */

function confirmOrder ( ) {

    order_open = false;
    
    if(menu_list_on != "none") {

        menu_list_on = order_menu_name;
        order_menu_name = "none";
    }
 
    document.getElementById('confirm-order-quantity').innerHTML = document.getElementById("order-quantity").innerHTML;
    document.getElementById('confirm-order-name').innerHTML = document.getElementById("order-name").innerHTML;
    document.getElementById('confirm-order-price').innerHTML = (document.getElementById("order-literal-price").innerHTML * document.getElementById("order-quantity").innerHTML).toFixed(2);
    
    $('#order').fadeOut(10, function(){
        $('#confirm-order-container').fadeIn(10);
    });
    
    confirmation_div_open = true;
    
}

/*
 * addToCart ( name, price, quantity )
 *
 * Adds the current consumable ordered to
 * the checkout cart
 *
 */

function addToCart ( name, price, quantity ) {

    var text = checkoutItemHTMLGenerator ( name, price, quantity, checkout.nextID++);
    
    $(text).appendTo("#checkout-list");
    
    checkout.items[checkout.items.length] = checkoutItem( name, price, quantity );
    
    updateCheckoutTotal( price, quantity );
    

}

/* 
 * updateCHeckoutTotal ( price, quantity )
 *
 * Updates the checkout totals with the given
 * price and quantity
 *
 */

function updateCheckoutTotal ( price, quantity ) {

    checkout.total += price * quantity;
    checkout.total_to_pay += price * quantity;
    
    document.getElementById('checkout-total').innerHTML = checkout.total.toFixed(2);
    document.getElementById('checkout-total-to-pay').innerHTML = checkout.total_to_pay.toFixed(2);

}

/*
 * incOrder ( )
 *
 * Increments the quantity of the current item
 * being ordered
 *
 */

function incOrder (){
    
    document.getElementById("order-quantity").innerHTML++;
    
}

/*
 * decOrder ( )
 *
 * Decrements the quantity of the current item
 * being ordered
 *
 */

function decOrder (){
    
    if( document.getElementById("order-quantity").innerHTML > 1){
		document.getElementById("order-quantity").innerHTML--;
	}
}

/*
 * showCart ( )
 *
 * Makes the current cart visible fading in
 * with the argument time
 *
 */

function showCart( time ) {
    
    checkoutIsVisible = true;
		
    $('#checkout-container').fadeIn(time);        
		
	var newtext = '<div id="cart-button" onClick="deClicked(\'cart\')"><img src="../images/cart-pressed.png" width="128px" height="128px" /></div>';
	
	$('#cart-button').replaceWith(newtext);
    
}

/*
 * hideCart ( )
 *
 * Makes the current cart not-visible
 *
 */

function hideCart() {
    
    checkoutIsVisible = false;
    
    $('#checkout-container').fadeOut(10);
		
	var newtext = '<div id="cart-button" onClick="clicked(\'cart\')"><img src="../images/cart.png" width="128px" height="128px" /></div>';
	
	$('#cart-button').replaceWith(newtext);

}

/*
 * payment ()
 *
 * Gives the user the payment possibilities
 *
 */

function payment() {

    if(checkout.total_to_pay == 0) {
    
        var text = "<p class=\"total0\">Neste momento não tem nada a pagar.</p>"
        
        t = setTimeout(function(){
        
            var initial = '<img src="../images/pagamento.png" onClick="payment()" width="256" height="128" />';
            document.getElementById('payment-container').innerHTML = initial;
            
        }, 5000);
    
    } else {
    
        var text = '<img style="margin-left: -10px;" src="../images/mb.png" onClick="paymentMethod(\'mb\')" />';
        text += '<img style="margin-left: 20px;" src="../images/dinheiro.png" onClick="paymentMethod(\'cash\')" />';
    }
    
    document.getElementById('payment-container').innerHTML = text;

}

/*
 * paymentAccepted ( method )
 *
 * Receives the current payment method
 * and changes the HTML when the payment
 * is concluded
 *
 */

function paymentAccepted (method) {

    var i = 0;
    
    var text = '<table>';
    text += '<tr>';
    text += '<th><img style="cursor: default" src="../images/check.png" /></th>';
    
    if(method == "mb") {
        
        text += '<th>A transacção foi concluída com sucesso. Obrigado.</th>';        
        
    } else {
        
        text += '<th>Recolha o seu troco e recibo. Obrigado.</th>';
        
    }
    
    text += '</tr>';
    text += '</table>';
    
    document.getElementById('payment-container').innerHTML = text;
    
    for (i = 1; i < checkout.nextID; i++) {
    
        $('#checkout-item-container-' + i).addClass('payed');
    
    }
    
    document.getElementById('checkout-total-to-pay').innerHTML = (0).toFixed(2);
    checkout.total_to_pay = 0;
    
    t = setTimeout(function(){
        
        var initial = '<img src="../images/pagamento.png" onClick="payment()" />';
        document.getElementById('payment-container').innerHTML = initial;
        
    }, 5000);
    
}

/*
 * payment ( paymentMethod )
 *
 * Gives the user the instructions to pay
 * given the payment method chosen
 *
 */

function paymentMethod(paymentMethod) {

    var text = '<table>';        
    text += '<tr>';
    text += '<th><img style="cursor: default" src="../images/loading.gif" /></th>';
    
    if(paymentMethod == "mb") {
        
        text += '<th>Siga as instruções no terminal</th>';  // We chose this way to interact with MB because it is the most usual nowdays as
                                                            // it is somewhat difficult to replicate the behaviour of those machines on a PC
                                                            // with all the security they guarantee.
        text += '</tr>';
        text += '</table>';
        
        t = setTimeout(function(){ paymentAccepted ("mb") }, 2000);
            
    } else { // payment-method = "cash"

        text += '<th>Insira as notas e as<br/>moedas nas ranhuras</th>';
        text += '</tr>';  
        text += '</table>';
        
        t = setTimeout(function(){ paymentAccepted ("cash") }, 2000);
     
    }
    
    document.getElementById('payment-container').innerHTML = text;

}

/* 
 * exitApplication ( )
 *
 * Processes the exit of the application
 *
 */

function exitApplication ( ) {

    if(checkout.total_to_pay == 0) window.location = "../thanks.html";
    else alert("Por favor, efectue o pagamento antes de sair.\nObrigado");
    
}

/* 
 * incrClicks ( )
 *
 * Increments the number of clicks
 *
 */

function incrClicks(){

    clicks++;

}

/*
 * startGame ( )
 *
 * Fades in the snooker game and
 * tells JS the user is playing the game
 *
 */

function startGame() {
    
    if(!game.players_selected && !game.layout_selected) {
    
        alert("Por favor escolha o número de jogadores e apresentação antes de iniciar o jogo.\nObrigado.");
        return;
    
    } else if (!game.players_selected) {
        
        alert("Por favor escolha o número de jogadores antes de iniciar o jogo.\nObrigado.");
        return;
        
    } else if (!game.layout_selected) {
        
        alert("Por favor escolha a apresentação antes de iniciar o jogo.\nObrigado.");
        return;
        
    }

    $('#snooker').fadeOut(100, function () {
        $('#snooker-game').fadeIn(10);
        playing = true;
        game_on = true;
    });

}
/* 
 * resumeGame ( )
 *
 * Resumes the game in execution
 *
 */

function resumeGame() {
        
    var buttons = "<img style=\"margin-right: 10px;\" src=\"../images/pause.png\" onClick=\"pauseGame();\" />";
    buttons += "<img src=\"../images/sair-jogo.png\" onClick=\"exitGame();\" />";
    
    var newtable = "<img class=\"table\" src=\"../images/snooker-game.png\" />";
    
    document.getElementById('snooker-table').innerHTML = newtable;
    document.getElementById('snooker-table-buttons').innerHTML = buttons;
    
}

/* 
 * pauseGame ( )
 *
 * Pauses the game in execution
 *
 */

function pauseGame() {
        
    var buttons = "<img style=\"margin-right: 10px;\" src=\"../images/retomar-jogo.png\" onClick=\"resumeGame();\" />";
    buttons += "<img src=\"../images/sair-jogo.png\" onClick=\"exitGame();\" />";
    
    var newtable = "<img class=\"table\" src=\"../images/snooker-game-paused.png\" />";
    
    document.getElementById('snooker-table').innerHTML = newtable;
    document.getElementById('snooker-table-buttons').innerHTML = buttons;
    
}

/* 
 * exitGame ( )
 *
 * Exits the game in execution
 *
 */

function exitGame() {
    
    deClicked('snooker');
    
    game_on = false;
    playing = false;
    
    resumeGame(); /* This function call is the same as "reseting" the table */
    
}

/* 
 * radioPressed ( name )
 *
 * Function called when a snooker radio
 * button is selected
 *
 */

function radioPressed (name) {
    
    document.getElementById(name).innerHTML = '<img src="../images/radio-x.png" onClick="radioUnpressed(\'' + name + '\')" /></th>';
    
    if(name == "um-jogador") {
        game.players_selected = true;
        document.getElementById('dois-jogadores').innerHTML = '<img src="../images/radio.png" onClick="radioPressed(\'dois-jogadores\')" /></th>';
    } else if(name == "dois-jogadores") {
        game.players_selected = true;
        document.getElementById("um-jogador").innerHTML = '<img src="../images/radio.png" onClick="radioPressed(\'um-jogador\')" /></th>';
    } else {
        game.layout_selected = true;
    }
    
}

/* 
 * radioUnpressed ( name )
 *
 * Function called when a snooker radio
 * button is unselected
 *
 */

function radioUnpressed (name) {
    
    document.getElementById(name).innerHTML = '<img src="../images/radio.png" onClick="radioPressed(\'' + name + '\')" /></th>';
    
    if(name == "um-jogador" || name == "dois-jogadores") {
        game.players_selected = false;
    } else {
        game.layout_selected = false;
    }
    
}

/* 
 * initGame ( )
 *
 * Function to init the game object
 *
 */

function initGame ( ) {

    game.layout_selected = false;
    game.players_selected = false;

}

/* 
 * $(document.ready( )
 *
 * Function that is executed when the
 * document is ready
 *
 * Note: Includes a function that counts the
 * number of touches on the screen since the
 * beginning of the app
 *
 */

$(document).ready(function () {
    
    startClock();               // Starts the clock
    other_tables_suggestions();	// Simulating other tables suggestions
	decrementSuggestions();		// Decrements suggestions every 30 secs
	suggestionsNotAllowed();	// Determins if the user can make suggestions or not
    initCheckout();
    initGame();
    
    
    $('body').on('keydown', function(e){
      if(e.which == 82 /*R*/){
          alert("Numero de toques: " + clicks);
      }
    });


});