/********************************
 *
 *   Canvas related functions
 *
 ********************************/

var canvas;
var ctx;
var sketch;
var sketch_style;

function init_canvas() {
    
	canvas = document.querySelector('#tela');
	ctx = canvas.getContext('2d');
	
	sketch = document.querySelector('#paint');
	sketch_style = getComputedStyle(sketch);
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));

	var mouse = {x: 0, y: 0};
	 
	/* Mouse Capturing Work */
	canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	}, false);
	
	/* Drawing on Paint App */
	ctx.lineWidth = 5;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.strokeStyle = "blue";
	 
	canvas.addEventListener('mousedown', function(e) {
			ctx.beginPath();
			ctx.moveTo(mouse.x - 250, mouse.y - 40);
	 
			canvas.addEventListener('mousemove', onPaint, false);
	}, false);
	 
	canvas.addEventListener('mouseup', function() {
			canvas.removeEventListener('mousemove', onPaint, false);
	}, false);
	 
	var onPaint = function() {
			ctx.lineTo(mouse.x - 250, mouse.y - 40);
			ctx.stroke();
	};
	
};


function changeColor(hex) {
    
    ctx.strokeStyle = hex;

};

function guardarTela () {
   
    //grab the context from your destination canvas
    var destinationCanvas = document.getElementById('background');
	destinationCanvas.width = parseInt(sketch_style.getPropertyValue('width'));
	destinationCanvas.height = parseInt(sketch_style.getPropertyValue('height'));
    var destCtx = destinationCanvas.getContext('2d');
    
    //call its drawImage() function passing it the source canvas directly
    destCtx.drawImage(canvas, 0, 0);
    
};

function limparTela() {
    
    ctx.clearRect ( 0 , 0 , 2000 , 1000 );

};

function limparFundo() {
    
    var destinationCanvas = document.getElementById('background');
    var toclear = destinationCanvas.getContext('2d');
    toclear.clearRect( 0 , 0 , 4000 , 2000 );

}


window.onload = init_canvas;