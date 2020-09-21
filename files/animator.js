//draws the triangle facing left
function drawTriangleWest(ctxz, min, maj) {
    ctxz.save();
    ctxz.beginPath();
    ctxz.moveTo(min + 7, maj + 7);
    ctxz.lineTo(min - 7, maj);
    ctxz.lineTo(min + 7, maj - 7);
    ctxz.closePath();
    ctxz.fillStyle = 'white';
    ctxz.fill();
    ctxz.strokeStyle = 'black';
    ctxz.stroke();
    ctxz.restore();
}

//draws the triangle facing up
function drawTriangleNorth(ctxz, min, maj) {
    ctxz.save();
    ctxz.beginPath();
    ctxz.moveTo(min - 7, maj + 7);
    ctxz.lineTo(min, maj - 7);
    ctxz.lineTo(min + 7, maj + 7);
    ctxz.closePath();
    ctxz.fillStyle = 'white';
    ctxz.fill();
    ctxz.strokeStyle = 'black';
    ctxz.stroke();
    ctxz.restore();
}

//draws the triangle facing right
function drawTriangleEast(ctxz, min, maj) {
    ctxz.save();
    ctxz.beginPath();
    ctxz.moveTo(min - 7, maj - 7);
    ctxz.lineTo(min + 7, maj);
    ctxz.lineTo(min - 7, maj + 7);
    ctxz.closePath();
    ctxz.fillStyle = 'white';
    ctxz.fill();
    ctxz.strokeStyle = 'black';
    ctxz.stroke();
    ctxz.restore();
}

//draws the triangle facing down
function drawTriangleSouth(ctxz, min, maj) {
    ctxz.save();
    ctxz.beginPath();
    ctxz.moveTo(min + 7, maj - 7);
    ctxz.lineTo(min, maj + 7);
    ctxz.lineTo(min - 7, maj - 7);
    ctxz.closePath();
    ctxz.fillStyle = 'white';
    ctxz.fill();
    ctxz.strokeStyle = 'black';
    ctxz.stroke();
    ctxz.restore();
}

//draws a grid
function draw_grid(ctxz, min, maj, stroke_) {
    ctxz.save();
    let width = ctxz.canvas.width;
    let height = ctxz.canvas.height;
    for (let ix = 0; ix < width; ix += width / min) {
        ctxz.beginPath();
        ctxz.moveTo(ix, 0);
        ctxz.lineTo(ix, height);
        ctxz.strokeStyle = stroke_;
        ctxz.lineWidth = 0.5;
        ctxz.stroke();
    }
    for (let iy = 0; iy < height; iy += height / maj) {
        ctxz.beginPath();
        ctxz.moveTo(0, iy);
        ctxz.lineTo(width, iy);
        ctxz.strokeStyle = stroke_;
        ctxz.lineWidth = 0.5;
        ctxz.stroke();
    }
    ctxz.restore();
}

//paints square on grid
function drawSquare(ctxz, min, majo, color) {
    ctxz.save();
    ctxz.fillStyle = color;
    ctxz.fillRect(min - 8, majo - 8, 16, 16);
    ctxz.restore();
}

function rotate(ctxz, currentState, direction, min, maj, colors, numMoves) {
    ctxz.save();
    if (numMoves === 0) {
        return;
    }
    numMoves--;
    // records current color
    const space = ctxz.getImageData(min - 8, maj - 8, 1, 1);
    let r = space.data[0];
    let g = space.data[1];
    let b = space.data[2];
    if (r === 0 && g === 0 && b === 0) {   //black
        currentState = 0;
    } else if ((r === 128 || r === 255) && g === 0 && b === 0) { //red
        currentState = 1;
    } else if ((r === 128 || r === 255) && (g === 128 || g === 255) && b === 0) { //yellow
        currentState = 2;
    } else if (r === 0 && g === 0 && (b === 128 || b === 255)) { //blue
        currentState = 3;
    } else if (r === 0 && (g === 128 || g === 255) && b === 0) { //green
        currentState = 4;
    }
    // draws the square on the grid
    drawSquare(ctxz, min, maj, colors[++currentState]);
    currentState--;
    //checks which direction to turn
    switch (true) {
        case (currentState === 0 || currentState === 3 || currentState === 4):
            // turn left
            if (direction > 0) {
                direction--;
            } else {
                direction = 3;
            }
            break;
        case (currentState === 1 || currentState === 2):
            // turn right
            if (direction < 3) {
                direction++;
            } else {
                direction = 0;
            }
            break;
    }
    //moves the triangle to new direction
    switch (direction) {
        case 0:
            maj -= 18;
            drawTriangleNorth(ctxz, min, maj);
            break;
        case 1:
            min += 18;
            drawTriangleEast(ctxz, min, maj);
            break;
        case 2:
            maj += 18;
            drawTriangleSouth(ctxz, min, maj);
            break;
        case 3:
            min -= 18;
            drawTriangleWest(ctxz, min, maj);
    }
    ctxz.restore();
    //make it run every 50ms
    setTimeout(rotate, 50, ctxz, currentState, direction, min, maj, colors, numMoves);

}