function activityColoring(){

  var els = {
    activityContainer: $(".activity-container"),
    cssDrop: $(".activity-css"),
    cPlaceholder: $(".canvas-placeholder"),
    activeColor: $(".active-color"),
  };

  var vars = {
    canvasI: els.cPlaceholder.attr("src"),
    canvasW: parseInt(els.cPlaceholder.data("width")),
    canvasH: parseInt(els.cPlaceholder.data("height")),
    defaultColor: els.activeColor.data("choosecolor"),
    transitionTime: els.activityContainer.css('-webkit-transition-duration')
  };

  var setup = function(canvasWidth,canvasHeight,overlayImage){
    var canvas = new fabric.Canvas('coloring-canvas');
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);
    canvas.freeDrawingBrush.width = 45;
    canvas.freeDrawingBrush.color = 'transparent';
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = vars.defaultColor;
    canvas.setOverlayImage(overlayImage, canvas.renderAll.bind(canvas));
    canvas.on("after:render", function(){canvas.calcOffset();});

    $('.choose-color').click(function () {
      if ( $(this).hasClass("active-color") ){
        //do nothing
      }
      else{
        $(this).addClass('active-color').siblings().removeClass('active-color');
        canvas.freeDrawingBrush.color = $(this).data("choosecolor");
      }
    });

    //----load data----
    if (localStorage.getItem("dram_"+activityCode+"_savedState") === null) {
      //do nothing
    }
    else{
      var loadCanvas = localStorage.getItem("dram_"+activityCode+"_savedState");
      canvas.loadFromJSON(loadCanvas);
    }

    //----save data----
    $('.activity-close').on('click.saveState', function () {
      localStorage.setItem("dram_"+activityCode+"_savedState", JSON.stringify(canvas));
      $(this).off('click.saveState');
    });
  };

  var init = function(){
    els.cssDrop.load("../css/activity-type/coloring.css");
    setTimeout(function(){
      setup(vars.canvasW,vars.canvasH,vars.canvasI);
      els.cPlaceholder.hide();
    }, 500);
  };
  init();
}
activityColoring();