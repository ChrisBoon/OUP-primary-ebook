//Dependencies: jQuery jQueryUI
var activityPan = function(){

	// generate random number
	var skip = [];
	function randomNum0toMax(max) {
		do { var myNum = Math.floor( (Math.random() * (max + 1)) ); } while (skip.indexOf(myNum) != -1);
		skip.push(myNum); // add myNum to skip so not repeated
		return myNum;
	}  // end randomNum0toMax

	var targetImg = $(".pan-click");
	var targetImgArray = [ [840, 160], [150, 700], [400, 1450], [1000, 1650], [1600, 1150], [1500, 450] ];
	var targetImgPos = [];

	// function to position target image
	function positionTarget() {
		targetImgPos.push(targetImgArray[randomNum0toMax(5)]);
		// set target image to start at a random co-ordinate
		targetImg.css({"top": targetImgPos[0][0] + "px", "left": targetImgPos[0][1] + "px"});
		targetImgPos = [];
	}

	positionTarget();

	$(function(){
		// set variables
		var dragImg = $(".pan-drag-layer");
		var contImg = $(".pan-view-container");
		var dragCont = $(".pan-drag-container");
		// set width & height calculations
		var dragContL = dragImg.width() - contImg.width();
		var dragContT = dragImg.height() - contImg.height();

		// set css values of pan-drag-container
		dragCont.css({
			"width": (dragImg.width() * 2) - contImg.width(),
			"height": (dragImg.height() * 2) - contImg.height(),
			"left": -dragContL,
			"top": -dragContT
		});

		// set css values of pan-drag-layer
		dragImg.css({
			"left": dragContL / 2,
			"top": dragContT / 2
		});

		// animate image a bit after title disappears
		setTimeout(function(){
			dragImg.animate({ "left": "-=80px", "top": "-=80px" }, "slow" );
		}, 3200);

	});

	$(".pan-drag-layer").draggable({
		containment: ".pan-drag-container",
		cursor: "move"
	});

	var panCorrect = 0;

	targetImg.click(function(){
		$(this).addClass("selected");
		setTimeout(function(){
			positionTarget();
			targetImg.removeClass("selected");
		}, 1500);
		panCorrect++;
		if (panCorrect === 3) {
			skip = [];
			setTimeout(function(){
				activityGrading(activityCode);
			}, 1500);
			panCorrect = 0;
		}
	});
};
activityPan();