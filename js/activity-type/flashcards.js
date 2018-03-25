$(".flashcards-card").on('click', function(){
	$(this).addClass("is-active").removeClass("is-inactive").siblings(".flashcards-card").removeClass("is-active").addClass("is-inactive");
});