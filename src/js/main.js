console.log("hello")

let canvas = document.getElementById("cvsTemplate")
let ctx = canvas.getContext("2d")
ctx.lineWidth = 6
ctx.beginPath()
ctx.moveTo(80, 110)
ctx.bezierCurveTo(400, 70, 120, 300, 160, 200)
ctx.moveTo(150, 50)
ctx.lineTo(120, 230)
ctx.moveTo(240, 100)
ctx.lineTo(270, 150)
ctx.stroke()

let canvasDrawing = document.getElementById("cvsDrawing")
let drawingCtx = canvasDrawing.getContext("2d")

drawingCtx.fillStyle = "white"
drawingCtx.fillRect(0, 0, canvasDrawing.width, canvasDrawing.height)

let draw_color = "black"
let draw_width = "6"
let is_drawing = false

canvasDrawing.addEventListener("touchstart", start)
canvasDrawing.addEventListener("touchmove", draw)
canvasDrawing.addEventListener("mousedown", start)
canvasDrawing.addEventListener("mousemove", draw)
canvasDrawing.addEventListener("touchend", stop)
canvasDrawing.addEventListener("mouseup", stop)
canvasDrawing.addEventListener("mouseout", stop)

function start(e) {
    is_drawing = true
    drawingCtx.beginPath();
    drawingCtx.moveTo(e.clientX - canvasDrawing.offsetLeft, e.clientY - canvasDrawing.offsetTop)
    e.preventDefault()
}

function draw(e) {
    if(is_drawing) {
        drawingCtx.lineTo(e.clientX - canvasDrawing.offsetLeft, e.clientY - canvasDrawing.offsetTop)
        drawingCtx.strokeStyle = draw_color
        drawingCtx.lineWidth = draw_width
        drawingCtx.lineCap = "round"
        drawingCtx.lineJoin = "round"
        drawingCtx.stroke();
    }
}

function stop(e) {
    if(is_drawing) {
        drawingCtx.stroke();
        drawingCtx.closePath();
        is_drawing = false
    }
    e.preventDefault();
}