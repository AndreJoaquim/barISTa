var s_id = 0;
var menu_list_on = "none";

var helpIsVisible = false;	// If help is visible

function ignore( identifier ){
	$('#' + identifier).fadeOut(300);
	//$('#' + identifier).remove();
};

function ignoreAll(){
	for(var i = 0; i <= s_id; i++){
		ignore(i);
	} 
};

function suggest( name, price ) {
	
	s_id++;
	
	var text = '<div class="item" id="' + s_id +'"><p>' + name + '</p><p>' + price + '€</p>';
	
	var buttonIgnore = "<button onClick ='ignore(" + s_id + ")'>";
	buttonIgnore += "Ignore</button>";
	
	var buttonRequest = '<button class="request">Order</button>'
	
	text += buttonRequest;
	text += buttonIgnore;
	text += '</div>';
	
	$(text).prependTo('#feed');
	$('#' + s_id).fadeIn(300);
	
};

function deClicked( name ) {
	
	$('#' + name).fadeOut(100, function(){
		$('#globalfeed').css(
			"margin-left", "332px"
		)
	});
	
	console.log(name);
	var id = 'nav-' + name;
	var replace = '<div id=\"' + id + '\" class="nav-item">';
	
	console.log(id);

	replace += '<img ';
	replace += 'onClick="clicked(\'' + name + '\')"';
	replace += 'src="images/' + name + '.png" />';
	replace += '</div>';
	
	var id = 'nav-' + name;
	
	$('#' + id).replaceWith( replace );
	
	menu_list_on = "none";
	

};


function clicked( name ) {
	
	if(menu_list_on == "none"){
	
		menu_list_on = name;
	
		$('#' + name).fadeIn(100);
		
		$('#globalfeed').css(
			"margin-left", "10px"
		)
		
		console.log("NAME: " + name);
		var id = "nav-" + name;
		console.log("ID: " + id);
		
		var replace = '<div id=\"' + id + '\" class="nav-item">';

		replace += '<img ';
		replace += 'onClick="deClicked(\'' + name + '\')"';
		replace += 'src="images/' + name + '-pressed.png" />';
		replace += '</div>';

		$('#' + id).replaceWith( replace );
	
	} else {
	
		
		$('#' + menu_list_on).fadeOut(100, function(){
			$('#' + name).fadeIn(100);		
		});
		
		
		var id_menu = 'nav-' + menu_list_on;
		var replace = '<div id=\"' + id_menu + '\" class="nav-item">';

		replace += '<img ';
		replace += 'onClick="clicked(\'' + menu_list_on + '\')"';
		replace += 'src="images/' + menu_list_on + '.png" />';
		replace += '</div>';
		
		var id_menu = 'nav-' + menu_list_on;
		
		$('#' + id_menu).replaceWith( replace );
		
		menu_list_on = name;
		
		$('#globalfeed').css(
			"margin-left", "10px"
		)
		
		var id = "nav-" + name;
		
		var replace = '<div id=\"' + id + '\" class="nav-item">';

		replace += '<img ';
		replace += 'onClick="deClicked(\'' + name + '\')"';
		replace += 'src="images/' + name + '-pressed.png" />';
		replace += '</div>';

		$('#' + id).replaceWith( replace );
		
	
	}
  
};

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