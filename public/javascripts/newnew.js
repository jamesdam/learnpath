counter = 1;

$(document).ready(function() {
$('#control-button').click(function(event) {
	counter = counter + 1;
	console.log("Test");
	var e = document.createElement('input'); 
	e.id = "pathNode" + counter;
	e.type='text'; 
	e.name = counter; 
	e.placeholder = "...";
	e.className = "span6";
	console.log(event);
	var t = $("#"+event.target.id);
	console.log(t);
	t.parent().parent().prev().append($('<div>').html(e).attr("class", "controls"));
});
});