//hi
var boids = [];
var maxBoids = 10;

function setup() {
createCanvas(1000, 700);
background(21, 3, 77);
loadBoids(maxBoids);
}

function draw() {
  runBoids();
}

function loadBoids(mb){
//  Load my array with boids
for(var i = 0; i < mb; i++){
    var rad = random(15, 25);
 boids[i] = new Boid(random(0,width-rad), random(0,height-rad), rad);
}
}

function runBoids(){
//  Load my array with boids
for(var i = 0; i < maxBoids; i++){
 boids[i].run();
}
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++  Boid code
function  Boid(x, y, r)  {
this.acc = createVector(random(-1,1), random(-1,1));
this.vel = p5.Vector.random2D();
this.pos = createVector(x, y);
this.rad = r;
this.index = 1;
this.rcr = random(50,200);
this.rcg = random(120,255);
this.rcb = random(50,60);
//document.write(this.index);
//document.write(this.index==1);

this.maxspeed = 4; // Maximum speed
//this.maxforce = 0.5; // Maximum steering force
}

Boid.prototype.applyForce = function(force) {
this.acc.add(force);
}


Boid.prototype.run = function() {
this.update();
this.checkEdges();
this.render();
}


// Method to update location
Boid.prototype.update = function() {
// Update velocity
this.vel.add(this.acc);
// Limit speed
this.vel.limit(this.maxspeed);
this.pos.add(this.vel);
//document.write(this.index);
if (this.index==0)this.rcg++;
//this.rcr+=5;
if (this.index==1)this.rcb++;
if (this.index==2)this.rcr++;
// Reset accelertion to 0 each cycle
this.acc.mult(random(.8,1.15));
if(this.acc.mag()<.3||this.acc.mag()>1.5)
this.acc = createVector(random(-1,1), random(-1,1));
//this.acc.mult(0);
}


// Wraparound
Boid.prototype.checkEdges = function() {
  //if (this.pos.x < -this.rad) this.pos.x = width + this.rad;
  if (this.pos.x < 0 ||this.pos.x > width -this.rad){
    this.vel.x *=-1;
		this.acc.x*=-1;
		this.index=2
    this.rcr = random(50,60);
  this.rcg = random(200,50);
  this.rcb = random(120,255);

  }
  if (this.pos.y < 0 || this.pos.y > height - this.rad) {
    this.vel.y *=-1;
		this.acc.y*=-1;
		this.index=0;
    this.rcr = random(120,255);
    this.rcg = random(50,60);
    this.rcb = random(200,50);
  }
}

// Draw boid as a circle
Boid.prototype.render = function() {
  fill(this.rcr, this.rcg, this.rcb,120);
  noStroke();
  //stroke(22);
  //stroke(0,0,255,90);
  rect(this.pos.x, this.pos.y, this.rad, this.rad,10);


}
