/*
 * Javascript functions
 * for the clock
 *
 */

 var months = ["janeiro", "fevereiro", "mar#231;o", "abril", "maio", "junho", "julho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
 var dias_da_semana = ["Domingo", "Segunda", "Ter&#231;a", "Quarta", "Quinta", "Sexta", "Sábado"];
 
function startClock() {

	var today = new Date();
	var hours = today.getHours();
	var mins = today.getMinutes();
	
	var dotw = today.getDay();
	var day = today.getDate();
	var month = today.getMonth() + 1; // January is 0
	var year = today.getFullYear();
	
	if(day < 10)
	{
		dd = '0' + day
	}
	
	if(mins < 10)
	{
		mins = "0" + mins;
	}
	
	document.getElementById('date').innerHTML = dias_da_semana[dotw] + ', ' + day + ' de ' + months[month] + ' de ' + year;
	document.getElementById('clock').innerHTML = hours + ":" + mins;
	
	t = setTimeout(function(){startClock()},500);
	
}