//function to set background image
//
canvas = new fabric.Canvas('c');

var $ = function(id){return document.getElementById(id)};

  ellipse = new fabric.Ellipse({
	      left: 100,
	      top: 100,
	      stroke: 'black',
	      fill: 'rgba(0,0,0,0)',
	      selectable: true,
	      originX: 'center', originY: 'center',
	       rx: 50,
	      ry: 50,
		cornerColor: 'yellow',
	  cornerSize:12

	    });
canvas.add(ellipse);
function setBackgroundImage(imagePath)
{
//loadImage to adjust canvas size
 fabric.Image.fromURL(imagePath, function(oImg) 
		{
        	canvas.setHeight(oImg.height)
        	canvas.setWidth(oImg.width);
		});


//set Backgound Image
    canvas.setBackgroundImage(imagePath,canvas.renderAll.bind(canvas),
    {
	backgoundImageStretch: false
    });
}


setBackgroundImage('b.jpg');












var strokeControl = $('stroke-control');
  strokeControl.oninput = function() {
    ellipse.set('strokeWidth', parseFloat(this.value)).setCoords();
    canvas.requestRenderAll();
  };


  function updateControls() {
strokeControl.value=ellipse.strokeWidth;
  }


  canvas.on({
    'object:moving': updateControls,
    'object:scaling': updateControls,
    'object:resizing': updateControls,
    'object:rotating': updateControls,
    'object:skewing': updateControls
  });


