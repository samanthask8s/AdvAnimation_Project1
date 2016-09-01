fill(255, 0, 100);
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total=0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos[0], pos[1]);
    if (d < 1) {
      this.total++;
      fr*=1.01;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.tail = [];
        this.total=0;
        return true;

      }
    }
    return false;
  }

  this.update = function() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {

    for (var i = 0; i < this.tail.length; i++) {
      fill((this.tail[i].y/2.352941176),(this.tail[i].x/2.352941176),150);
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    fill(150,255,255);
    rect(this.x, this.y, scl, scl);

  }
}
