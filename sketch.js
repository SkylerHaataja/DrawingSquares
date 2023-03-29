// q and e control line speed
// a and d control line width
// w controls background color
// s controls line color



var num_lines = 1;
var lines = [];
var line_container;
var lineSpeed = 5;
var weight = 1;
var bgColor = ["grey", "red", "magenta", "purple", "blue","cyan", "green", "lightgreen","yellow", "orange", "white"];
var w = 0;
var lnColor = ["black", "red", "magenta", "purple", "blue","cyan", "green", "lightgreen","yellow", "orange","grey"];
var s = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  initLine();
}

function draw() {
  background(bgColor[w]);
  stroke(lnColor[s]);
  drawLines();
  moveLine();
}

function initLine(){
  lines.push({x1: 0, y1: height/2, x2: 0, y2: height/2, vel_x: lineSpeed, vel_y: 0});
  
}

function drawLines(){
  for(var i = 0; i < lines.length; i++){
    var x1 = lines[i].x1;
    var x2 = lines[i].x2;
    var y1 = lines[i].y1;
    var y2 = lines[i].y2;
    line(x1, y1, x2, y2);
  }
}

function moveLine(){
  lines[lines.length-1].x2 += lines[lines.length-1].vel_x;
  lines[lines.length-1].y2 += lines[lines.length-1].vel_y;
  wrapAround();
}

function wrapAround(){
  x2 = lines[lines.length-1].x2;
  y2 = lines[lines.length-1].y2;
  vel_x = lines[lines.length-1].vel_x;
  vel_y = lines[lines.length-1].vel_y;
  if(x2>width)
    newLine(0,y2, vel_x, vel_y)
  else if(x2<0)
    newLine(width,y2, vel_x, vel_y)
  else if(y2<0)
    newLine(x2,height, vel_x, vel_y)
  else if(y2>height)
    newLine(x2,0, vel_x, vel_y)
  
}

function newLine(x2,y2, vx, vy){
  lines.push({x1: x2, y1: y2, x2: x2, y2: y2, vel_x: vx, vel_y: vy});
}

function keyPressed(){
  if (keyCode === UP_ARROW)
    setVelocity(0, -lineSpeed);
  else if (keyCode === DOWN_ARROW)
    setVelocity(0, lineSpeed);
  else if (keyCode === LEFT_ARROW)
    setVelocity(-lineSpeed, 0);
  else if (keyCode === RIGHT_ARROW)
    setVelocity(lineSpeed, 0);
}

function keyTyped(){
  if(key === 'a'){
    if(weight > 1){
      weight -= 1;
      strokeWeight(weight);
    }
  }
  else if (key === 'd'){
    weight += 1;
    strokeWeight(weight);
  }
  else if (key === 'w'){
    w = (w+1)%bgColor.length;
  }
  else if (key === 's'){
    s = (s+1)%lnColor.length;
  }
  else if (key === 'q'){
    if(lineSpeed > 1)
      lineSpeed--;
      updateLineSpeed();
    
  }
  else if (key === 'e'){
    lineSpeed++;
    updateLineSpeed();
  }
}

function updateLineSpeed(){
  if(lines[lines.length-1].vel_x < 0)
      lines[lines.length-1].vel_x = -lineSpeed;
  else if(lines[lines.length-1].vel_x > 0)
      lines[lines.length-1].vel_x = lineSpeed;
  else if(lines[lines.length-1].vel_y < 0)
      lines[lines.length-1].vel_y = -lineSpeed;
  else 
  if(lines[lines.length-1].vel_y > 0)
      lines[lines.length-1].vel_y = lineSpeed;
      
}

function setVelocity(x, y){
    var x2 = lines[lines.length-1].x2;
    var y2 = lines[lines.length-1].y2;
    lines.push({x1: x2, y1: y2, x2: x2, y2: y2, vel_x: 1, vel_y: 0});
    lines[lines.length-1].vel_x = x;
    lines[lines.length-1].vel_y = y;
}