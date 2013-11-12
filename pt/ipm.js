var s_id = 0;				// ID of the following suggestion
var menu_list_on = "none";	// None menu list is currently shown

var suggestions = 0;		// Counter of the suggestions made by the user, decremented every 30 seconds
var wait = false;			// If user has made 10 suggestions in a row, we must protect the other tables from the awful SPAM

var helpIsVisible = false;	// If help is visible

var names = ["VODKA", "TOSTA MISTA", "CAPPUCCINO", "IMPERIAL"];		// Random names of consumables
var prices = ["4,50", "2,80", "1,50", "0,50"];						// And the correspondent prices

/*
 * ignore (String)
 *
 * Receives an identifier of the suggestion and
 * removes it from the feed
 *
 */

function ignore( identifier ){
	$('#' + identifier).fadeOut(300);
};

function ignoreAll(){
	for(var i = 0; i <= s_id; i++){
		ignore(i);
	} 
};

function suggest( name, price ) {
	
	if(wait == true) return;
	
	suggestions++;
	
	s_id++;
	
	var text = '<div class="item" id="' + s_id +'"><p>' + name + '</p><p>' + price + '€</p>';
	
	var buttonIgnore = "<button onClick ='ignore(" + s_id + ")'>";
	buttonIgnore += "Ignorar</button>";
	
	var buttonRequest = '<button class="request">Pedir</button>'
	
	text += buttonRequest;
	text += buttonIgnore;
	text += '</div>';
	
	$(text).prependTo('#feed');
	$('#' + s_id).fadeIn(300);
	
};


function replaceIcon( name , state ){

    var id = 'nav-' + name;
	var replace = '<div id=\"' + id + '\" class="nav-item">';
    
    replace += '<img ';
    
    if( state == "declick" ){
        
        replace += 'onClick="clicked(\'' + name + '\')"';
        replace += 'src="../images/' + name + '.png" />';
        
    } else {
        
        replace +='onClick="deClicked(\'' + name + '\')"';
        replace += 'src="../images/' + name + '-pressed.png" />';
    
    }
    
	replace += '</div>';
		
	$('#' + id).replaceWith( replace );

};

function replaceIconOnClick( name ) {

    replaceIcon(name, "click");

};

function replaceIconOnDeClick( name ){

    replaceIcon(name , "declick");

};

function deClicked( name ) {
	
	if(name == "paint" || name == "snooker"){
	
		$('#' + name).fadeOut(100, function(){
            
			$('#globalfeed').fadeIn(100);
            $('#globalfeed').css(
				"margin-left", "332px"
			);
            
		});
		
	} else {
	
		$('#' + name).fadeOut(100, function(){
			$('#globalfeed').css(
				"margin-left", "332px"
			);
		});
    		
	}
    
    replaceIconOnDeClick( name );
    
    nemu_list_on = "none";

};

function clicked( name ) {
	    
	if(menu_list_on == "none"){
	
		menu_list_on = name;
	
		$('#' + name).fadeIn(10);
        
		$('#globalfeed').css(
			"margin-left", "10px"
		)
        
        if( name == "paint" || name == "snooker" ) {
            $('#globalfeed').fadeOut(100);
        }
		
		replaceIconOnClick( name );
	
	} else {
	
        
		$('#' + menu_list_on).fadeOut(100, function(){
			$('#' + name).fadeIn(100);		
		});
        
        replaceIconOnDeClick( menu_list_on );
		
		if(( menu_list_on == "paint" && name == "snooker" ) || ( menu_list_on == "snooker" && name == "paint" )){
          // DO NOTHING  
		} else {
            $('#globalfeed').fadeIn(100);
        }
					
		$('#globalfeed').css(
			"margin-left", "10px"
		)
        
        if( name == "paint" || name == "snooker" ) {
            if(( menu_list_on == "paint" && name == "snooker" ) || ( menu_list_on == "snooker" && name == "paint" ));
            else $('#globalfeed').fadeOut(100);
        }

        menu_list_on = name;
		
        replaceIconOnClick( name );	
	
	}
	
};

function other_tables_suggestions() {

	var yes_or_no = Math.random();
	
	if(yes_or_no >= 0.5){
		var name = Math.floor((Math.random()*3));
		suggest(names[name], prices[name]);
	}

	t = setTimeout(function(){other_tables_suggestions()}, 20000);
}

function decrementSuggestions(){
	
	if(suggestions > 0)
		suggestions--;
		
	y = setTimeout(function() {decrementSuggestions() }, 30000);

}

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
			$('.suggest').prop('disabled', true);
			var minutos = Math.floor((suggestions * 30 ) / 60);
			alert("Ultrapassou o limite de sugestões, pode voltar a sugerir produtos dentro de aproximadamente " + (minutos + 1) + " minutos.\n\nObrigado pela compreensão");
		}
	}
	
	x = setTimeout(function() {suggestionsNotAllowed()}, 1000);
	
	return false;
	
}

function showHelp() {
	
	if(helpIsVisible){
	
		$('#help-text').css(
			"display", "none"
		)
		
		helpIsVisible = false;
		
		var newtext = '<div class="help" id="help-button" onClick="showHelp()"><img src="../images/help-button.png" /></div>'
	
		$('#help-button').replaceWith(newtext);
		
	} else {
	
		$('#help-text').css(
			"display", "block"
		)
		helpIsVisible = true;
		
		var newtext = '<div class="help" id="help-button" onClick="showHelp()"><img src="../images/help-pressed.png" /></div>'
	
		$('#help-button').replaceWith(newtext);
		
	}
	
	
	
};

function start(){
	other_tables_suggestions();	//Simulating other tables suggestions
	decrementSuggestions();		//Decrements suggestions every 30 secs
	suggestionsNotAllowed();	//Determins if the user can make suggestions or not
}



function canvascolor() {
        var canvas = $("#myCanvas");
        
        var ctx = canvas.getContext("2d");
        // define a custom fillCircle method
        ctx.fillCircle = function(x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function(fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ddd");

        // bind mouse events
        canvas.node.onmousemove = function(e) {
            if (!canvas.isDrawing) {
               return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 10; // or whatever
            var fillColor = '#000FFF';
            ctx.fillCircle(x, y, radius, fillColor);
        };
        canvas.node.onmousedown = function(e) {
            canvas.isDrawing = true;
        };
        canvas.node.onmouseup = function(e) {
            canvas.isDrawing = false;
        };
        
        
};


$(document).ready(
	function(){
	canvascolor();	
	});
