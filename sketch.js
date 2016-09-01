var s;
var scl = 20;
var food;
var death = false;
var highScore=0;
var score=0;
var fr=10;

function setup() {

  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);
  pickLocation();

}

function pickLocation() {
  var cols = floor((width-scl)/scl);
  var rows = floor((height-scl)/scl);
  food = [floor(random(1,cols)), floor(random(1,rows))];
  food[0]*=scl;
  food[1]*=scl;
  if(s.x===food[0]&&s.y===food[1])
    pickLocation();
  for(var i = 0; i < s.tail.length; i++) {
    if(s.tail[i].x===food[0]&&s.tail[i].y===food[1]){
      pickLocation();
    }
  }
}

function mousePressed() {
  score=0;
  death=false;
  s.x=0;
  s.y=0;
  s.xspeed = 1;
  s.yspeed = 0;
  s.tail=[];
  fr=10;
}

function draw() {
  frameRate(fr);
  textSize(32);
  fill(255, 0, 100);
  if(!death){
  background(51);

  text(score, 550, 30);
  if (s.eat(food)) {
    score++;
    pickLocation();
  }
  death=s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
  rect(food[0], food[1], scl, scl);
}else{
  fill(255);
  background(200,50,50)
  text("Game over\nScore:"+score,230,300);
  if(score>highScore)
    highScore=score;
}
textSize(12);
text("Highscore:"+highScore,525,575);
text("Press enter to Restart",250,575);



}





function keyPressed() {
  if (keyCode === UP_ARROW) {
    if(s.yspeed!=1)
      s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    if(s.yspeed!=-1)
      s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    if(s.xspeed!=-1)
      s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    if(s.xspeed!=1)
      s.dir(-1, 0);
    }else if (keyCode === CONTROL){
      s.total++;

  } else if(keyCode===ENTER){
    if(score>highScore)
      highScore=score;
    score=0;
    death=false;
    s.x=0;
    s.y=0;
    s.xspeed = 1;
    s.yspeed = 0;
    s.tail=[];
    s.total=0;
    fr=10;

  }
}
