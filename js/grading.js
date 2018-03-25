function activityGrading(activityCode) {
	$(document).find(".activity-container").children(".pages-reset, .activity-feedback").addClass("is-active").children(".activity-feedback-badge").html("<img src='../img/ui/feedback-badge-bg.gif' />");
	setTimeout(function(){
		$(".activity-feedback-buttons").addClass("is-active");
		localStorage.setItem("dram_"+activityCode+"_complete", true);
	}, 1500);
}

var removeFeedback = function(){
  $(".activity-feedback, .activity-feedback-buttons").removeClass("is-active")
    .parents().find(".activity-feedback-badge img").remove();
};

$(".activity-feedback-return").on('click', function(){
  $(this).parents(".activity-container").children(".pages-reset, .activity-feedback").removeClass("is-active");
});