$(document).ready(function(){

//calls css associated with this activity type - should make this a standard function eventually.
$(".activity-css").load("../css/activity-type/pmn.css");

	// generate random number
	var skip = [];
	function randomNum0toMax(max) {
		do { var myNum = Math.floor( (Math.random() * (max + 1)) ); } while (skip.indexOf(myNum) != -1);
		skip.push(myNum); // add myNum to skip so not repeated
		return myNum;
	}  // end randomNum0toMax

	// generate card content from folder
	// NEED TO REMOVE REF TO UNIT NUMBER
	$(".pmn-board .pmn-card").each(function(){
		var pmnUnitNum = $(".activity").data("activityunit");
		var pmnActNum = $(".activity").data("activitynumber");
		// generate random number
		var cardNumb = randomNum0toMax(5);
		// add cards to activity (quantity defined in html), and then copy them
		$(this).append("<div class='pmn-card-inner' data-cardnum='" + cardNumb + "'><div class='pmn-card-front'></div><div class='pmn-card-back' style='background-image: url(../img/activity/u" + pmnUnitNum + "a" + pmnActNum + "/u" + pmnUnitNum + "a" + pmnActNum + "-" + cardNumb + ".jpg)' ></div></div>").clone().removeClass("pmn-card-1").addClass("pmn-card-2").insertAfter(this);
	});

	/**
	 * jQuery Shuffle (http://mktgdept.com/jquery-shuffle)
	 * A jQuery plugin for shuffling a set of elements
	 *
	 * v0.0.1 - 13 November 2009
	 *
	 * Copyright (c) 2009 Chad Smith (http://twitter.com/chadsmith)
	 * Dual licensed under the MIT and GPL licenses.
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.opensource.org/licenses/gpl-license.php
	 *
	 * Shuffle elements using: $(selector).shuffle() or $.shuffle(selector)
	 *
	 **/
	(function(d){
    d.fn.shuffle=function(c){
        c=[];
        return this.each(function()
            {
                c.push(d(this).clone(true));
            }).each(function(a,b)
            {
                d(b).replaceWith(c[a=Math.floor(Math.random()*c.length)]);
                c.splice(a,1);
            });
    };
    d.shuffle=function(a){
       return d(a).shuffle();
    };
	})(jQuery);

	$(".pmn-card").shuffle();

	// check for number of cards
	var pmnCard = $(".pmn-card").length;
	// set size of wrapper accordingly
	if (pmnCard === 6){
		$(".pmn-wrapper").addClass("three-cards");
	} if (pmnCard === 8){
		$(".pmn-wrapper").addClass("four-cards");
	}

	// store number of clicks
	var pmnCounter = 0;
	var pmnCorrect = pmnCard / 2;
	var pmnCorrectCounter = 0;
	$(".pmn-card").click(function(){
		// add click to counter
		pmnCounter++;
		// add class if less than 3 clicks made
		if (pmnCounter < 3) {
			$(this).toggleClass("selected");
		}
		// after 2 clicks, check to see if turned cards match
		if (pmnCounter === 2) {
			var pairA = $(".pmn-card-1.selected .pmn-card-inner").data("cardnum");
			var pairB = $(".pmn-card-2.selected .pmn-card-inner").data("cardnum");
			if (pairA === pairB) {
				// if correct, mark as correct
				setTimeout(function(){
					$(".pmn-card.selected").addClass("correct").removeClass("selected");
					// clear counter
					pmnCounter = 0;
					pmnCorrectCounter++;
					if (pmnCorrectCounter === pmnCorrect) {
						activityGrading(activityCode);
					}
				}, 250);
			}
			else {
				// if incorrect, mark as incorrect and turn back over
				$(".pmn-card.selected:not('.correct')").addClass("incorrect");
				setTimeout(function(){
					$(".pmn-card.selected").removeClass("selected incorrect");
					// clear counter
					pmnCounter = 0;
				}, 1200);
			}
		}
	});

});