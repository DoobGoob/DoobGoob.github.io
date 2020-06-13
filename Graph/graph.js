//Canvas Objects
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
//Canvas on Starting Pixel
xScreen = 0;
yScreen = 80;
//number of  points taken to graph
n =1000;
//graph max and min values
xMax = 20;
yMax = 20;
xMin = -20;
yMin = -20;

//Graphing
function graph(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Grid
    ctx.beginPath();
    for (i=0;i<7;i++){
        ctx.strokeStyle = '#DCDCDC'
        ctx.lineWidth = 1;

        ctx.moveTo(2*(i+1)*canvas.height/16,0);
        ctx.lineTo(2*(i+1)*canvas.height/16,500);
        ctx.moveTo((i+1)*canvas.height/8,0);
        ctx.lineTo((i+1)*canvas.height/8,500);

        
        ctx.moveTo(0,(i+1)*canvas.height/8);
        ctx.lineTo(500, (i+1)*canvas.height/8);
        ctx.moveTo(0,(i+1)*canvas.height/8);
        ctx.lineTo(500, (i+1)*canvas.height/8);

    }
    ctx.stroke();

    //Plane
    //X-Axis
    ctx.beginPath();
    ctx.strokeStyle = 'Black'
    for (i=0;i<2;i++){
        hProp = (yMax)/(yMax-yMin);
        xPixel = i*canvas.width;
        yPixel = hProp*canvas.height;

        ctx.lineTo(xPixel, yPixel);
    }
    ctx.stroke();
    //Y-Axis
    ctx.beginPath();
    ctx.strokeStyle = 'Black'
    for (i=0;i<2;i++){
        wProp = (-xMin)/(xMax-xMin);
        xPixel = wProp*canvas.width;
        yPixel = i*canvas.height;
        ctx.lineTo(xPixel, yPixel);
    }
    ctx.stroke();
    
    //Function 1
    ctx.beginPath();
    ctx.strokeStyle = 'Red'
    ctx.lineWidth = 2;
    for (i=0;i<n;i++){
        wProp = i/(n-1);
        x = xMin + wProp*(xMax-xMin);
        //function with respect to xValue
        y = x*x*x;
        hProp = (yMax-y)/(yMax-yMin);
        xPixel = wProp*canvas.width;
        yPixel = hProp*canvas.height;

        ctx.lineTo(xPixel, yPixel);
    }
    ctx.stroke();

        //Function 2
        ctx.beginPath();
        ctx.strokeStyle = 'Blue'
        ctx.lineWidth = 2;
        for (i=0;i<n;i++){
            wProp = i/(n-1);
            x = xMin + wProp*(xMax-xMin);
            //function with respect to xValue
            y = x*x;
            hProp = (yMax-y)/(yMax-yMin);
            xPixel = wProp*canvas.width;
            yPixel = hProp*canvas.height;
    
            ctx.lineTo(xPixel, yPixel);
        }
        ctx.stroke();
}
//Interactive Graph Functions

//Mouse Position on Canvas
var mouse = {
    x: undefined,
    y: undefined,
    xdown: undefined,
    ydown: undefined,
    xup: undefined,
    yup: undefined
}
canvas.onmousemove = function(event){
    mouse.x = event.x;
    mouse.y = event.y-yScreen;

}
//Convert Pixel Value to X/Y-value
function xConvert(xPix){
    return ((xPix/canvas.width)*(xMax-xMin)+xMin);
}
function yConvert(yPix){
    return yMax-(yPix/canvas.height)*(yMax-yMin);
}

//Zoom In/Out
canvas.onwheel = function(event){
    //Scale Max/Min values
    //Determine Scroll Up or Down
    if (event.deltaY<0){
        scale = 0.8;
    }
    else{
        scale = 1.2;
    }
    xMax = scale*xMax
    yMax = scale*yMax
    xMin = scale*xMin
    yMin = scale*yMin
    graph()
}

//Click for Coordinate Values
canvas.ondblclick= function(){
    graph();
    //Gets Pixel x-value
    x = xConvert(mouse.x);
    //Gets Pixel y-value
    y = yConvert(mouse.y);
    //String of Coordinates
    coordinates = '('+x.toFixed(2)+','+y.toFixed(2)+')';
    //Canvas Coordinates
    ctx.fillStyle = 'grey';
    ctx.fillText(coordinates, mouse.x+20, mouse.y);
    ctx.fillRect(mouse.x+2,mouse.y-2,4,4)
    ctx.stroke();
}

//Drag Graph
canvas.onmousedown = function(event){
    mouse.xdown = event.x;
    mouse.ydown = event.y;
}
canvas.onmouseup = function(event){
    mouse.xup = event.x;
    mouse.yup = event.y;
    drag();
}
function drag(){
    //Convert Pixel to X/Y-values
    xInitial = xConvert(mouse.xdown);
    xFinal = xConvert(mouse.xup);
    yInitial = xConvert(mouse.ydown);
    yFinal = xConvert(mouse.yup);

    //Delta X/Y-value
    xDelta = xInitial-xFinal;
    yDelta = yFinal-yInitial;

    //Drag Graph
    xMin = xMin+xDelta;
    xMax = xMax+xDelta;
    yMin = yMin+yDelta;
    yMax = yMax+yDelta;
    graph();
}

graph()
