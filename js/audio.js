document.addEventListener( "DOMContentLoaded", function() {
	
	var popcorn = Popcorn( "#ourvideo" );
	
	popcorn.footnote({
		start: 2,
		end: 5,
		target: "footnote",
		text: "Pop!"
	});

}, false );