
var Cell = function(i, j, w, hasHole) {

  this.x = i;
  this.y = j;
  this.width = w;

  this.hasWumpus = false;
  this.hasHole = hasHole;
}

Cell.prototype.show = function() {

  let w = this.width;
  let x = this.x * w;
  let y = this.y * w;

  stroke(255);
  noFill();
  rect(x, y, w, w);
}

Cell.prototype.getHole = function() {
  return this.hasHole;
}

Cell.prototype.getWumpus = function() {
  return this.hasWumpus;
}
