creditsGames = new Array();
creditsThemes = new Array();


/* ------
VARIABLES
------ */

// Containing Div ID
containingDiv = 'miniclip-game-embed';

// Minimum Credits Game iFrame Dimensions
creditsMinWidth = 750; // Width
creditsMinHeight = 500; // Height

// List of Credits Games (hyphenated-lowercase-like-this)
creditsGames[1] = '8-ball-multiplayer-pool';


/* -----------
WIDGET BUILDER
----------- */

function buildWidget(divId, gameName, widgetTheme, iframeWidth, iframeHeight, forceCredits) {
	
	// If this is a credits game, use dimensions above to ensure the iFrame is big enough for the topup window
	if (creditsGames.indexOf(gameName) != -1) {
		if (iframeWidth < creditsMinWidth) {
			iframeWidth = creditsMinWidth;
		}

		if (iframeHeight < creditsMinHeight) {
			iframeHeight = creditsMinHeight;
		}
	}
	
	// Check if the widget background uses a hex code, or a theme
	if (widgetTheme.indexOf('#') == -1) {

		// Match user theme with the creditsTheme array
		widgetTheme = widgetTheme;
	} else {

		// You can't use hashes in query strings, so lets replace it (the PHP will turn it back into a hash)
		widgetTheme = widgetTheme.replace('#', 'color/');
	}

	// Create the iFrame HTML
	var embedHtml  = '<iframe src="http://www.miniclip.com/games/' + gameName + '/en/webgame.php?bodybg=' + widgetTheme + '&width=' + iframeWidth + '&height=' + iframeHeight + '&forcecredits=' + forceCredits + '" width="' + iframeWidth + '" height="' + iframeHeight + '" frameborder="0" scrolling="no" style="border:none;"></iframe>';

	// Inject code into the Div
	document.getElementById(divId).innerHTML = embedHtml;
}


/* ------------
RUN THIS MOTHER
------------ */

window.onload = function() {

	// Find the Containing Div
	var frameContainer = document.getElementById(containingDiv);

	// Pull data attributes into variables
	var gameName       = frameContainer.getAttribute("data-game-name");
	var widgetTheme    = frameContainer.getAttribute("data-theme");
	var iframeWidth    = parseInt( frameContainer.getAttribute("data-width") );
	var iframeHeight   = parseInt( frameContainer.getAttribute("data-height") );
	var forceCredits   = frameContainer.getAttribute("data-credits");

	// Run the widget builder function
	buildWidget(containingDiv, gameName, widgetTheme, iframeWidth, iframeHeight, forceCredits);
	
}