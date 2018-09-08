//function to set background image
//
canvas = new fabric.Canvas('c');
var currentImageName = "";

var $ = function (id) {
	return document.getElementById(id)
};

ellipse = new fabric.Ellipse({
		left: 100,
		top: 100,
        width: 100,
        height: 100,
		stroke: 'blue',
		fill: 'rgba(0,0,0,0)',
		selectable: true,
		originX: 'center',
		originY: 'center',
		rx: 50,
		ry: 50,
		cornerColor: 'green',
		cornerSize: 5

	});
canvas.add(ellipse);


function setBackgroundImage(imagePath) {
    currentImageName = "images/"+imagePath;

var jsonObject = {"name":currentImageName};
jQuery.post("isEllipseOnImage.php",{json : JSON.stringify(jsonObject)},function(data) {
    

    phpResonse = JSON.parse(data);

      if(typeof phpResonse["name"] !== 'undefined'){
        updateEllipse(phpResonse);
     }
    
    //loadImage to adjust canvas size
	fabric.Image.fromURL(currentImageName, function (oImg) {
		canvas.setHeight(oImg.height)
		canvas.setWidth(oImg.width);
	});

	//set Backgound Image
	canvas.setBackgroundImage(currentImageName, canvas.renderAll.bind(canvas), {
		backgoundImageStretch: false
	});
    
});
    
    
    

}

var strokeControl = $('stroke-control');
strokeControl.oninput = function () {
	ellipse.set('strokeWidth', parseFloat(this.value)).setCoords();
	canvas.requestRenderAll();
};

function updateControls() {
	strokeControl.value = ellipse.strokeWidth;
    console.log(ellipse.aCoords.tl);
}

canvas.on({
	'object:moving': updateControls,
	'object:scaling': updateControls,
	'object:resizing': updateControls,
	'object:rotating': updateControls,
	'object:skewing': updateControls
});
function getOutput() {
jQuery.ajax({url: "getImages.php"}).done(function( html ) {
    jQuery("#results").append(html);
});
}
function saveToJson()
{
var bbox = ellipse.getBoundingRect();

var jsonObject = {"name":currentImageName,"left":bbox.left, "top":bbox.top, "width":bbox.width, "height":bbox.height};
jQuery.post("json.php",{json : JSON.stringify(jsonObject)},function(data) {
    console.log(data);
}
);


}
function updateEllipse(ellipseData)
{
    
   canvas.remove(ellipse);
    
    ellipse = new fabric.Ellipse({
		left: ellipseData["left"],
		top: ellipseData["top"],
        width: ellipseData["width"],
        height: ellipseData["height"],
		stroke: 'blue',
		fill: 'rgba(0,0,0,0)',
		selectable: true,
		originX: 'center',
		originY: 'center',
		rx: 50,
		ry: 50,
		cornerColor: 'green',
		cornerSize: 5

	});
canvas.add(ellipse);
console.log("update");
console.log(ellipseData);
//ellipse.set({left:ellipseData["left"] ,height: ellipseData["height"], top: ellipseData["top"], width: ellipseData["width"], selectable : true});

}
