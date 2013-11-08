/*
 * Javascript functions
 * for the clock
 *
 */

 var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 var days_of_the_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 
function startClock() {

	var today = new Date();
	var hours = today.getHours();
	var mins = today.getMinutes();
	
	var dotw = today.getDay();
	var day = today.getDate();
	var month = today.getMonth() + 1; //January is 0
	var year = today.getFullYear();
	
	if(day == 1 || day == 21 || day == 31) day += 'st';
	else if(day == 2 || day == 22) day += 'nd';
	else if(day == 3 || day == 23) day += 'rd';	
	else day += 'th';
	
	if(mins < 10)
	{
		mins = "0" + mins;
	}
	
	document.getElementById('date').innerHTML = days_of_the_week[dotw] + ', ' + day + ' of ' + months[month] + ', ' + year;
	document.getElementById('clock').innerHTML = hours + ":" + mins;
	
	t = setTimeout(function(){startClock()},500);
	
}