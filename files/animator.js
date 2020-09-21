// Filename: animator.js
// Description: This file holds all the code for the cella ant algorithm
/*Authors: Kevin Lopez*/
/*cwid: 889508465*/
/*email: kevinlopez8554@csu.fullerton.edu*/

/*Emiliano Arranaga*/
/*email: earranaga1202@csu.fullerton.edu*/
/*cwid: 888006756*/

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
    //setting the grid size
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

//rotater function
function rotate(ctxz, currentState, direction, min, maj, colors, numMoves) {
    ctxz.save();
    //if there's no more moves left, just stop
    if (numMoves === 0) {
        return;
    }
    //decrements the amount of moves left
    numMoves--;
    //get the current color of the cell
    const cell = ctxz.getImageData(min - 8, maj - 8, 1, 1);
    let r = cell.data[0];
    let g = cell.data[1];
    let b = cell.data[2];
    //for r,g,b, needed to use 128 as well because with 255 alone it does not always get recognized
    if (r === 0 && g === 0 && b === 0) {   // black
        currentState = 0;
    } else if ((r === 128 || r === 255) && g === 0 && b === 0) { // red
        currentState = 1;
    } else if ((r === 128 || r === 255) && (g === 128 || g === 255) && b === 0) { // yellow
        currentState = 2;
    } else if (r === 0 && g === 0 && (b === 128 || b === 255)) { // blue
        currentState = 3;
    } else if (r === 0 && (g === 128 || g === 255) && b === 0) { // green
        currentState = 4;
    }
    // draw the square on the grid
    drawSquare(ctxz, min, maj, colors[++currentState]); // infinite loop with currentState alone
    //now check which direction to turn
    switch (true) {
        //check the color of the cell (currentState is changed based off color)
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
    //move the triangle to new direction
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
    //10 ms between movements so we can see the movements finish faster
    setTimeout(rotate, 10, ctxz, currentState, direction, min, maj, colors, numMoves);

}
