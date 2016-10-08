function changeDir(e){
  console.log(e);
}
// globs
var canvas, ctx, gTimer;
var D = {
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4
}

var food = {
  x: 4,
  y: 4,
  width: 5,
  height: 5,
  eat: function(){
    console.log("nom nom");
    this.display = false;
  },
  display: false
}

var snake ={
  curD : D.RIGHT
}

var snakeSeg = {
  x: 4,
  y: 4,
  width: 5,
  height: 5,
  bods: []
}

function render(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Check for Food And Self Destruct

  // Move Snake
  switch(snake.curD){
    case D.LEFT:
      snakeSeg.x -= snakeSeg.width;
    break;
    case D.RIGHT:
      snakeSeg.x += snakeSeg.width;
    break;
    case D.DOWN:
      snakeSeg.y += snakeSeg.height;
    break;
    case D.UP:
      snakeSeg.y -= snakeSeg.height;
    break;
  }
  if(!food.display){
    food.x = Math.random() * (canvas.width);
    food.y = Math.random() * (canvas.height);
    food.display = true;
  }else{
    ctx.fillStyle = "white";
    ctx.fillRect(food.x, food.y, food.height,food.width);
    if (food.x < snakeSeg.x + snakeSeg.width &&
       food.x + food.width > snakeSeg.x &&
       food.y < snakeSeg.y + snakeSeg.height &&
       food.height + food.y > snakeSeg.y) {
        food.eat();
    }
  }

    // Draw Snake
    ctx.fillStyle = "green";
    ctx.fillRect(snakeSeg.x, snakeSeg.y, snakeSeg.height,snakeSeg.width);
}

function tick(){
  render();
}

document.body.onload = function () {
  canvas = document.getElementById("cBoard");
  ctx = canvas.getContext("2d");

  document.body.onkeydown = function(e){
    switch(e.keyCode){
      case 37: // Left
        snake.curD = D.LEFT;
      break;
      case 38:  // Up
        snake.curD = D.UP;
      break;
      case 39:  // Right
        snake.curD = D.RIGHT;
      break;
      case 40:  // Down
        snake.curD = D.DOWN;
      break;
    }
  }

  gTimer = setInterval(tick, 500);
}
