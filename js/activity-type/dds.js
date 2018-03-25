//Dependencies: jQuery jQueryUI
var ddsTotal = $(".dds-drag").length;
var ddsCorrect = 0;

$(".dds-drag").each(function(){
  var ddsPiece = $(this).data("eltdds");
  $(this).draggable({
    containment: ".activity",
    cursor: "move",
    snap: ".dds-drop-" + ddsPiece,
    snapMode: "inner"
  });
});
$(".dds-drop").each(function(){
  var ddsPiece = $(this).data("eltdds");
  $(this).droppable({
    accept: ".dds-drag-" + ddsPiece,
    hoverClass: "ui-state-active",
    drop: function(event, ui){
      $(ui.draggable).offset($(this).offset());
      $(this).addClass("correct");
      ddsCorrect ++;
      if (ddsTotal === ddsCorrect){
        activityGrading(activityCode);
      }
    }
  });
});
//calls css associated with this activity type - should make this a standard function eventually.
$(".activity-css").load("../css/activity-type/dds.css");