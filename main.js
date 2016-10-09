(()=>{
// globs
var canvas, ctx, gTimer;
// ENUM
var D = {
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4
}

// Food
var food = {
  x: 4,
  y: 4,
  width: 5,
  height: 5,
  eat: function(){
    // console.log("nom nom");
    this.display = false;
  },
  display: false
}

// Snek
var snake ={
  curD : D.RIGHT,
  nextD: D.RIGHT,
  body : [],
  addSeg: function (x,y){
    // console.log("adding to ", x,y);
    var seg = snakeSeg(x,y);
    this.body.push(seg);
  }
}

// SnekSeg
var snakeSeg = function (_x,_y ) {
  return {
    x: _x,
    y: _y,
    width: 5,
    height: 5
  }
}

// Flag
var lLast = 0;
// TickRender
function render(){
  // Prevent a possiblity of quick direction pivots causing turnning back on self
  snake.curD = snake.nextD;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Check for Food And Self Destruct
  if(!food.display){
    food.x = Math.random() * (canvas.width);
    food.y = Math.random() * (canvas.height);
    food.display = true;
  }else{
    // Draw Food
    ctx.fillStyle = "white";
    ctx.fillRect(food.x, food.y, food.height,food.width);
    // If Head Eats Food
    if (food.x < snake.body[0].x + snake.body[0].width &&
       food.x + food.width > snake.body[0].x &&
       food.y < snake.body[0].y + snake.body[0].height &&
       food.height + food.y > snake.body[0].y) {
        food.eat();
        // Add to tail
        snake.addSeg(snake.body[snake.body.length-1].x,snake.body[snake.body.length-1].y);
        // Dont move last seg
        lLast = 1;
    }
  }
  // Move Snake Body, leave last segment if its new
  for(var i = snake.body.length-lLast-1; i>0; i--){
    snake.body[i].x = snake.body[i-1].x;
    snake.body[i].y = snake.body[i-1].y;
  }
  // Move Head
  switch(snake.curD){
    case D.LEFT:
      snake.body[0].x -= snake.body[0].width;
    break;
    case D.RIGHT:
      snake.body[0].x += snake.body[0].width;
    break;
    case D.DOWN:
      snake.body[0].y += snake.body[0].height;
    break;
    case D.UP:
      snake.body[0].y -= snake.body[0].height;
    break;
  }
  // Draw Snake
  ctx.fillStyle = "green";
  snake.body.forEach(function (seg,i){
    // console.log(seg.x, seg.y, i);
    ctx.fillRect(seg.x, seg.y, seg.height, seg.width);
  });

  lLast = 0;
  if(lost()) lose();

}

function lose(){
  clearInterval(gTimer);
  var msg = "GAME OVER! YOUR SNEK LEVEL WAS " + snake.body.length + "!!!";
  ctx.fillStyle = "red";
  ctx.font = "18px monospace";
  ctx.fillText(msg, canvas.width/2 - (msg.length*5), canvas.height/2 - 200);
}

function lost(){
  // Out of Bounds
  if(snake.body[0].x < 0 || snake.body[0].x >= canvas.width ||
    snake.body[0].y < 0 || snake.body[0].y >= canvas.height )
      return true;
  // Ate Self
  var ateSelf
  snake.body.forEach((seg) =>{
    var matches = 0;
    snake.body.forEach((subseg) =>{
        if(seg.x == subseg.x && seg.y == subseg.y)  matches++;
    });
    if(matches==2) { ateSelf = true; }
  });
  // console.log(ateSelf);
  if (ateSelf)  return true;
  return false;
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
        if(snake.curD !== D.RIGHT)  snake.nextD = D.LEFT;
      break;
      case 38:  // Up
        if(snake.curD !== D.DOWN)  snake.nextD = D.UP;
      break;
      case 39:  // Right
        if(snake.curD !== D.LEFT)  snake.nextD = D.RIGHT;
      break;
      case 40:  // Down
        if(snake.curD !== D.UP)  snake.nextD = D.DOWN;
      break;
      case 0x20:
        if(gTimer !== null) {clearInterval(gTimer); gTimer = null;}
        else                {gTimer = setInterval(tick, 100);     }
      break;
    }
  }

  snake.addSeg(10,20);
  snake.addSeg(15,20);

  gTimer = setInterval(tick, 150);
}
})();
