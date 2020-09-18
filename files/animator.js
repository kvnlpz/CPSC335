//draws the triangle facing left
function drawTriangleWest(rctx, rminor, rmajor) {
    rctx.save();
    rctx.beginPath();
    rctx.moveTo(rminor + 7, rmajor + 7);
    rctx.lineTo(rminor - 7, rmajor);
    rctx.lineTo(rminor + 7, rmajor - 7);
    rctx.closePath();
    rctx.fillStyle = 'white';
    rctx.fill();
    rctx.strokeStyle = 'black';
    rctx.stroke();
    rctx.restore();
}

//draws the triangle facing up
function drawTriangleNorth(rctx, rminor, rmajor) {
    rctx.save();
    rctx.beginPath();
    rctx.moveTo(rminor - 7, rmajor + 7);
    rctx.lineTo(rminor, rmajor - 7);
    rctx.lineTo(rminor + 7, rmajor + 7);
    rctx.closePath();
    rctx.fillStyle = 'white';
    rctx.fill();
    rctx.strokeStyle = 'black';
    rctx.stroke();
    rctx.restore();
}

//draws the triangle facing right
function drawTriangleEast(rctx, rminor, rmajor) {
    rctx.save();
    rctx.beginPath();
    rctx.moveTo(rminor - 7, rmajor - 7);
    rctx.lineTo(rminor + 7, rmajor);
    rctx.lineTo(rminor - 7, rmajor + 7);
    rctx.closePath();
    rctx.fillStyle = 'white';
    rctx.fill();
    rctx.strokeStyle = 'black';
    rctx.stroke();
    rctx.restore();
}

//draws the triangle facing down
function drawTriangleSouth(rctx, rminor, rmajor) {
    rctx.save();
    rctx.beginPath();
    rctx.moveTo(rminor + 7, rmajor - 7);
    rctx.lineTo(rminor, rmajor + 7);
    rctx.lineTo(rminor - 7, rmajor - 7);
    rctx.closePath();
    rctx.fillStyle = 'white';
    rctx.fill();
    rctx.strokeStyle = 'black';
    rctx.stroke();
    rctx.restore();
}

//draws a grid
function draw_grid(rctx, rminor, rmajor, rstroke) {
    rctx.save();
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for (let ix = 0; ix < width; ix += width / rminor) {
        rctx.beginPath();
        rctx.moveTo(ix, 0);
        rctx.lineTo(ix, height);
        rctx.strokeStyle = rstroke;
        rctx.lineWidth = 0.5;
        rctx.stroke();
    }
    for (let iy = 0; iy < height; iy += height / rmajor) {
        rctx.beginPath();
        rctx.moveTo(0, iy);
        rctx.lineTo(width, iy);
        rctx.strokeStyle = rstroke;
        rctx.lineWidth = 0.5;
        rctx.stroke();
    }
    rctx.restore();
}

//paints square on grid
function drawSquare(rctx, rminor, rmajor, color) {
    rctx.save();
    rctx.fillStyle = color;
    rctx.fillRect(rminor - 8, rmajor - 8, 16, 16);
    rctx.restore();
}

function rotate(rctx, curState, direction, rminor, rmajor, colors, moves) {
    rctx.save();
    if (moves === 0) {
        return;
    }
    moves--;
    // records current color
    const space = rctx.getImageData(rminor - 8, rmajor - 8, 1, 1);
    let r = space.data[0];
    let g = space.data[1];
    let b = space.data[2];
    if (r === 0 && g === 0 && b === 0) {   //black
        curState = 0;
    } else if ((r === 128 || r === 255) && g === 0 && b === 0) { //red
        curState = 1;
    } else if ((r === 128 || r === 255) && (g === 128 || g === 255) && b === 0) { //yellow
        curState = 2;
    } else if (r === 0 && g === 0 && (b === 128 || b === 255)) { //blue
        curState = 3;
    }
    // draws the square on the grid
    drawSquare(rctx, rminor, rmajor, colors[++curState]);
    curState--;
    //checks which direction to turn
    switch (true) {
        case (curState === 2 || curState === 3):
            // turn left
            if (direction > 0) {
                direction--;
            } else {
                direction = 3;
            }
            break;
        case (curState === 0 || curState === 1):
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
            rmajor -= 18;
            drawTriangleNorth(rctx, rminor, rmajor);
            break;
        case 1:
            rminor += 18;
            drawTriangleEast(rctx, rminor, rmajor);
            break;
        case 2:
            rmajor += 18;
            drawTriangleSouth(rctx, rminor, rmajor);
            break;
        case 3:
            rminor -= 18;
            drawTriangleWest(rctx, rminor, rmajor);
    }
    rctx.restore();
    //make it run every 50ms
    setTimeout(rotate, 50, rctx, curState, direction, rminor, rmajor, colors, moves);

}