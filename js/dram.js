//defined variables outside of function for use by grading and activities
var unitNumber;
var savedPage;
var activityCode;

//begin navigation code
$(document).ready(function(){
  unitNumber = $('body').data("activityunit");
  if (localStorage.getItem("dram_u"+unitNumber+"_saved_page") === null) {
    localStorage.setItem("dram_u"+unitNumber+"_saved_page", 1);
  }
  savedPage = parseInt(localStorage.getItem("dram_u"+unitNumber+"_saved_page"));
  var pageCount = $(".page").length;
  activityCode = "u"+unitNumber+"a"+savedPage;

  //function to add class to any jQuery object passed to it based on whether an activity has been completed or not.
  //first parameter must be jQuery object of element you want to add class to.
  //second parameter is activity to check.
  var showActivityCompletion = function($element, activityCode){
    if (localStorage.getItem("dram_"+activityCode+"_complete") === "true") {
      $element.addClass("activity-complete");
    }
    else{
      $element.removeClass("activity-complete");
    }
  };



  var hideReplayButton = function(){
    var $thePage = $(".pages-wrapper").find("[data-pagenumber='" + savedPage+ "']");
    var hasAudio = $thePage.data("hasaudio");
    if(hasAudio === "yes"){
      $(".menu-container").removeClass("no-audio");
    }
    else{
      $(".menu-container").addClass("no-audio");
    }
  };//end hideReplayButton

  var hideNav = function(){
    if( savedPage === pageCount ){
      $(".pt-button-next").removeClass("live-btn");
    }
    if( savedPage < pageCount ){
      $(".pt-button-next").addClass("live-btn");
    }
    if( savedPage === 1 ){
      $(".pt-button-prev").removeClass("live-btn");
    }
    if( savedPage > 1 ){
      $(".pt-button-prev").addClass("live-btn");
    }
  };//end hideNav

  var setPage = function(thePage){
    $(".page").removeClass('active-page page-before page-after');
    var $thePage = $(".pages-wrapper").find("[data-pagenumber='" + thePage+ "']");
    var thePageNo = $thePage.attr('data-pagenumber');
    $thePage.addClass("active-page");
    if ( thePageNo > 1 ){
      $thePage.prev().addClass('page-before');
    }
    if (thePageNo < pageCount) {
      $thePage.next().addClass('page-after');
    }
  };//end setPage


  var updateSavedPage = function(thePage){
    localStorage.setItem("dram_u"+unitNumber+"_saved_page", thePage);
    savedPage = thePage;
  };

  var updateActivityCode = function(n){
    activityCode = "u"+unitNumber+"a"+n;
  };

  //on load do this:
  setPage(savedPage);
  hideNav();
  showActivityCompletion( $(".activity-tab"), activityCode );
  hideReplayButton();

  //click navigation
  $('.pt-button').on('click',  function(){
    var nextPage;
    if ( $(this).hasClass('pt-button-prev') ) {
      nextPage = savedPage - 1;
    }
    else{
      nextPage = savedPage + 1;
    }
    setPage(nextPage);
    updateActivityCode(nextPage);
    updateSavedPage(nextPage);
    hideNav();
    showActivityCompletion( $(".activity-tab"), activityCode );
  });

var slidePage = {
  el: {
    holder: $(".pages-wrapper"),
    pageActive: $(".active-page"),
    pageBefore: $(".page-before"),
    pageAfter: $(".page-after"),
    nextBtn: $('.pt-button-next'),
    prevBtn: $('.pt-button-prev')
  },

  slideWidth: $('.pages-wrapper').width(),
  touchstartx: undefined,
  touchmovex: undefined,
  movex: undefined,
  invertmovex: undefined,
  
  init: function() {
    this.bindUIEvents();
  },

  bindUIEvents: function() {
    this.el.holder.on("touchstart", function(event) {
      slidePage.start(event);
    });

    this.el.holder.on("touchmove", function(event) {
      slidePage.move(event);
    });

    this.el.holder.on("touchend", function(event) {
      slidePage.end(event);
    });
  },

  start: function(event) {
    if( navigator.userAgent.match(/Android/i) ) {
      event.preventDefault();
    }
    this.touchstartx =  event.originalEvent.touches[0].pageX;
    $('.page').removeClass('animate');
  },

  move: function(event) {
    this.touchmovex =  event.originalEvent.touches[0].pageX;
    this.movex =this.touchstartx - this.touchmovex;
    this.invertmovex =this.movex*= -1;
    this.beforemovex = this.invertmovex - this.slideWidth;
    this.aftermovex = this.invertmovex + this.slideWidth;
    if (this.movex > 0) {
      if (savedPage === 1) {
        $(".active-page").css('transform','translate3d(0px,0,0)');
        $(".page-after").css('transform','translate3d(100%,0,0)');
      }
      else{
        $(".active-page").css('transform','translate3d(' + this.invertmovex + 'px,0,0)');
        $(".page-before").css('transform','translate3d(' + this.beforemovex + 'px,0,0)');
      }
    }
    if (this.movex < 0) {
      if (savedPage === pageCount) {
        $(".active-page").css('transform','translate3d(0px,0,0)');
        $(".page-before").css('transform','translate3d(-100%,0,0)');
      }
      else{
        $(".active-page").css('transform','translate3d(' + this.invertmovex + 'px,0,0)');
        $(".page-after").css('transform','translate3d(' + this.aftermovex + 'px,0,0)');
      }
    }
  },

  end: function(event) {
    $('.page').addClass('animate');
    if (this.movex<= -140 && savedPage < pageCount){
      this.el.nextBtn.click();
    }
    else if (this.movex>= 140 && savedPage>1){
      this.el.prevBtn.click();
    }

    $(".active-page").css('transform','translate3d(0px,0,0)');
    $(".page-before").css('transform','translate3d(-100%,0,0)');
    $(".page-after").css('transform','translate3d(100%,0,0)');

    this.movex = undefined;
    this.invertmovex = undefined;
  }
};
slidePage.init();

//loading tabs & content
$(".pages-tab").on('click', function(){
  //sets variable to content being clicked
  var activeContainer = $(this).parents(".pages-container").data("container");
  //makes associated container active
  $(this).parents("div." + activeContainer + "-container").addClass("is-active")
    .next("div." + activeContainer + "-modal").addClass("is-active");
  //loads activity if selected
  if (activeContainer === "activity"){
    $(this).next(".activity-holder").load("../html/"+activityCode+".html");
    //delay of title onscreen
    setTimeout(function(){
      $(".activity-title").addClass("is-active");
    }, 2500);
  }
});
//load flashcards
$(".menu-flashcards").on('click', function(){
  $(this).parents(".menu-container").removeClass("is-active")
    .parents("body").find(".flashcards-container").addClass("is-active")
    .children(".flashcards-holder").load("../html/u"+unitNumber+"fc.html");
});

//closing tabs & content
$(".pages-close").on('click', function(){
  //sets variable to content being closed
  var closeContainer = $(this).parents(".pages-container").data("container");
  //closes associated container
  $(this).parents("div." + closeContainer + "-container").removeClass("is-active")
    .next("div." + closeContainer + "-modal").removeClass("is-active");
  //empties activity container
  if (closeContainer === "activity"){
    $(this).siblings(".activity-holder").empty().siblings().removeClass("is-active").end().find(".activity-css").empty();
    $(this).siblings().removeClass("is-active");
    removeFeedback();
  }
  //removes modal when closing flashcards
  if (closeContainer === "flashcards"){
    $(this).parents().prev().removeClass("is-active");
  }
  showActivityCompletion( $(".activity-tab"), activityCode );
});

//refresh activity
$(".activity-reset").on('click', function(){
  localStorage.removeItem("dram_"+activityCode+"_savedState");
  $(this).parents(".activity-container").find(".activity-holder").empty().load("../html/u"+unitNumber+"a"+savedPage+".html")
    .siblings(".activity-reset").removeClass("is-active");
  removeFeedback();
});

//closing document ready
});