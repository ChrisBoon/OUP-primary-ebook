$(".activity-css").load("../css/activity-type/maze.css");

$(function(){


//-------------------------------------------------------------------------------------------
//	VARIABLES 

	var canvas    =  $('#mazeCanvas')[0],
	    ctx       =  canvas.getContext('2d'),
	    canvas_W  =  $(canvas).width(),
	    canvas_H  =  $(canvas).height(),

	    isDown    =  false,         // track if finger is down or not
	    map       =  new Image();   // create map object
	    sprite    =  new Image(),   // create sprite object
	    starPath  =  new Image(),   // create path object
	    starPath01  =  new Image(),   // create path object
	    sprite_x  =  37,					// amount to offset sprite from center of cell
	    sprite_y  =  37,					// amount to offset sprite from center of cell
	    pathStore =  new Array();   // all the paths we draw will be stored here
	    pathStore1 =  new Array();   // all the paths we draw will be stored here
	    pathStore2 =  new Array();   // all the paths we draw will be stored here
	    pathStore3 =  new Array();   // all the paths we draw will be stored here

	sprite.src    =  '../img/activity/u7a6/star.png';  // link to sprite image
	map.src       =  '../img/activity/u7a6/ghost02.png'; // link to map image 
	starPath.src      =  '../img/activity/u7a6/star-path.png'; // link to path image 
	starPath01.src      =  '../img/activity/u7a6/star-path01.png'; // link to path image 

	var pathStore1Sprite = starPath, pathStore2Sprite = starPath, pathStore3Sprite = starPath;


	// create the cell object literal, the initial values should not change
	var cell = { size: 32, half: 16 };


//	end of variables
//-------------------------------------------------------------------------------------------
//	HELPER FUNCTIONS 

	map.onload = function() { 
	  loadCell(10, 1);																																	// load the starting cell
	  enableTouch();																																	// the cell info is now available to activate the drag function
	  pathStore.push( [cell.x, cell.y] );                                         // load the start of the path
	  ctx.drawImage( sprite, (cell.x - sprite_x), (cell.y - sprite_y) )				// draw the sprite (may need to check it has loaded first)
  } // map.onload

	function loadCell(row, col) {

	  var ghostCanvas = document.createElement('canvas');
	  var ghostCtx=ghostCanvas.getContext('2d');
	  ghostCtx.drawImage( map, 0, 0 )       // draw the map once the image has loaded

	  var imgData = ghostCtx.getImageData((col -1 ),(row -1),3,3);   // sample a 3 x 3 area of map
	  if (imgData.data[7] == 255) {cell.top = 1} else {cell.top = 0}           // if an area of the map is black give it value of 1
	  if (imgData.data[23] == 255) {cell.right = 1} else {cell.right = 0}
	  if (imgData.data[31] == 255) {cell.bottom = 1} else {cell.bottom = 0}
	  if (imgData.data[15] == 255) {cell.left = 1} else {cell.left = 0}

    cell.deadend = 0;																					// record if we are going down a dead end
	  if (imgData.data[16] == 255 && imgData.data[17] == 0) {cell.deadend = 1}
	  if (imgData.data[17] == 255 && imgData.data[16] == 0) {cell.deadend = 2}
	  if (imgData.data[18] == 255 && imgData.data[17] == 0) {cell.deadend = 3}

	  cell.x      =  (cell.half + (col * cell.size));  // x co-ord of centre of cell
	  cell.y      =  (cell.half + (row * cell.size));  // y co-ord of centre of cell
	  cell.row    =  row;                              // which row of grid it is in
	  cell.col    =  col;                              // which col of grid it is in
	}

	// check if co-ords are inside an area, returns true if they are
	function isInside(containerX, containerY, containerW, containerH, testX, testY) {
		return  (containerX <= testX) && (containerX + containerW >= testX) &&
	    		  (containerY <= testY) && (containerY + containerH >= testY);
	}

	// redraw the path
	function drawPath() {
		ctx.clearRect(0, 0, canvas_W , canvas_H );				// erase the canvas ready for new draw

    //when we reach the trigger point make the path a different color
    if (cell.col == 5 && cell.row == 7) {pathStore1Sprite = starPath01}
    if (cell.col == 17 && cell.row == 7) {pathStore2Sprite = starPath01}
    if (cell.col == 17 && cell.row == 13) {pathStore3Sprite = starPath01}

    // when we exit the dead end path remove the path and reset the sprite for this path
    if (pathStore1Sprite == starPath01 && cell.deadend != 1) { pathStore1.length = 0; pathStore1Sprite = starPath;}
    if (pathStore2Sprite == starPath01 && cell.deadend != 2) { pathStore2.length = 0; pathStore2Sprite = starPath;}
    if (pathStore3Sprite == starPath01 && cell.deadend != 3) { pathStore3.length = 0; pathStore3Sprite = starPath;}

		
		// add a path image for every cell we have passed through
		for (var i = 0; i < pathStore.length; i++) {			// loop through all the stored co-ordinates in the pathStore 
		  ctx.drawImage( starPath, (pathStore[i][0] - cell.half), (pathStore[i][1] - cell.half) )	
		};
		for (var i = 0; i < pathStore1.length; i++) {			// loop through all the stored co-ordinates in the pathStore 
		  ctx.drawImage( pathStore1Sprite, (pathStore1[i][0] - cell.half), (pathStore1[i][1] - cell.half) )	
		};
		for (var i = 0; i < pathStore2.length; i++) {			// loop through all the stored co-ordinates in the pathStore 
		  ctx.drawImage( pathStore2Sprite, (pathStore2[i][0] - cell.half), (pathStore2[i][1] - cell.half) )	
		};
		for (var i = 0; i < pathStore3.length; i++) {			// loop through all the stored co-ordinates in the pathStore 
		  ctx.drawImage( pathStore3Sprite, (pathStore3[i][0] - cell.half), (pathStore3[i][1] - cell.half) )	
		};

		ctx.drawImage( sprite, (cell.x - sprite_x), (cell.y - sprite_y) );		// finally place the sprite at the end
	}

//	end helper function
//---------------------------------------------------------------
//	TOUCH EVENTS

  // This needs map.onload to have finished before it is activated
  function enableTouch() {
	  $(canvas).on('mousedown touchstart', function(e) {
			drag_X = e.pageX - $(this).offset().left;				// finger position on canvas
			drag_Y = e.pageY - $(this).offset().top; 				// finger position on canvas
	
			// is the finger on the sprite? if so set isDown to true
			if (isInside((cell.x - cell.half), (cell.y - cell.half), cell.size, cell.size, drag_X, drag_Y))
			   { isDown = true; }
	
	  }).on('mouseup touchend', function() {
	    	isDown = false;											// finger has come up so stop drawing
	
	  }).on('mousemove touchmove', function(e) {
			if (isDown) {
				drag_X = e.pageX - $(this).offset().left;
				drag_Y = e.pageY - $(this).offset().top;
				var change = false; // to record if cell changes so we know to do updates
	
				// if the finger has moved outside of the cell check where the cells exits are
				// if it is possible to move towards the finger change the row or col number
				// the + 5 is to force the sprite to go around corners

	      // we could get a diagonal line if two of these are correct so added the else
				if ( cell.top    == 1 && drag_Y < (cell.y - (cell.half + 5)) ) { cell.row -= 1; change = true; }
				else if ( cell.right  == 1 && drag_X > (cell.x + (cell.half + 5)) ) { cell.col += 1; change = true; }
				else if ( cell.bottom == 1 && drag_Y > (cell.y + (cell.half + 5)) ) { cell.row += 1; change = true; }
				else if ( cell.left   == 1 && drag_X < (cell.x - (cell.half + 5)) ) { cell.col -= 1; change = true; }
	
				// we have a new cell
				if (change == true) 
					{
          if (cell.col == 20 && cell.row == 2) {
          	isDown = false; //game is finished stop moving
          	ctx.clearRect(0, 0, canvas_W , canvas_H );	

          	$('.activity').addClass('finish')
          	setTimeout(function(){
          		activityGrading(activityCode);
          	}, 2000);
          }
          else {

          if (cell.deadend == 0)       { pathStore.unshift( [cell.x, cell.y] )}  // store its co-ords in reverse order so candraw path
          else if (cell.deadend == 1)  { pathStore1.unshift( [cell.x, cell.y] )}
          else if (cell.deadend == 2)  { pathStore2.unshift( [cell.x, cell.y] )}
          else if (cell.deadend == 3)  { pathStore3.unshift( [cell.x, cell.y] )}

					loadCell(cell.row, cell.col);				// load the new cell info
				  drawPath()				// redraw the path and sprite
				  }
				}
	
			}  //if
		})  // touchmove
	} // enableTouch   
//---------------------------------------------------------------
//	end touch events

}) ; //end jQuery
