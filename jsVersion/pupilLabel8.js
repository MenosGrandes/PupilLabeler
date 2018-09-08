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
        console.log(ellipse.getScaledWidth());

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
var bbox = ellipse.getBoundingRect(true,true);

var jsonObject = {"name":currentImageName,"left":ellipse.left, "top":ellipse.top, "width":ellipse.getScaledWidth(), "height":ellipse.getScaledHeight(),"scaleX":ellipse.zoomX,"scaleY":ellipse.zoomY,"rx":ellipse.rx,"ry":ellipse.ry};
jQuery.post("json.php",{json : JSON.stringify(jsonObject)},function(data) {
    console.log(data);
}
);


}
function updateEllipse(ellipseData)
{
    
    console.log(ellipseData);
    console.log("PRZED");
    console.log(ellipse);
   canvas.remove(ellipse);
    
    ellipse = new fabric.Ellipse({
		left: ellipseData["left"],
		top: ellipseData["top"],
        width: (ellipseData["width"] * ellipseData["scaleX"]),
        height: (ellipseData["height"] * ellipseData["scaleY"]) ,
		stroke: 'blue',
		fill: 'rgba(0,0,0,0)',
		selectable: true,
		originX: 'center',
		originY: 'center',
		rx: ellipseData["rx"],
		ry: ellipseData["ry"],
		cornerColor: 'green',
		cornerSize: 5,
        zoomX: ellipseData["scaleX"],
        zoomY: ellipseData["scaleY"],

	});
    ellipse.calcCoords();
canvas.add(ellipse);
console.log("update");
console.log(ellipse);
ellipse.scaleToWidth(ellipseData["width"]);
//ellipse.set({left:ellipseData["left"] ,height: ellipseData["height"], top: ellipseData["top"], width: ellipseData["width"], selectable : true});

}
