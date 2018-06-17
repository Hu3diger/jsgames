
var Cell = function(i, j, w, hasHole, hasWumpus) {

  this.x = i;
  this.y = j;
  this.width = w;

  this.hasWumpus = hasWumpus;
  this.hasHole = hasHole;

  this.visited = true;
  this.closeHole = false;
  this.closeWumpus = false;
}

Cell.prototype.show = function() {

  let w = this.width;
  let x = this.x * w;
  let y = this.y * w;

  if (this.visited == false) {
    stroke(255);

    if (this.hasHole == true)
      fill(0);
    else if (this.hasWumpus == true)
      fill(255);
    else if (this.closeHole == true)
      fill(255, 0, 0);
    else if (this.closeWumpus == true)
      fill(0, 255, 0);
    else
      noFill();
  } else {
    noStroke();
    fill(51);
  }

  rect(x, y, w, w);
}

Cell.prototype.showNeighborsWumpus = function() {
  let w = this.width;
  let x = this.x;
  let y = this.y;

  let top     = grid[index(x    , y - 1)];
  let left    = grid[index(x - 1, y    )];
  let bottom  = grid[index(x + 1, y    )];
  let rigth   = grid[index(x    , y + 1)];

  if (top && top.hasHole == false) {
    top.closeWumpus = true;
  }

  if (left && left.hasHole == false) {
    left.closeWumpus = true;
  }

  if (bottom && bottom.hasHole == false) {
    bottom.closeWumpus = true;
  }

  if (rigth && rigth.hasHole == false) {
    rigth.closeWumpus = true;
  }
}

Cell.prototype.showNeighbors = function () {
  let w = this.width;
  let x = this.x;
  let y = this.y;

  let top     = grid[index(x    , y - 1)];
  let left    = grid[index(x - 1, y    )];
  let bottom  = grid[index(x + 1, y    )];
  let rigth   = grid[index(x    , y + 1)];

  if (top && top.hasHole == false) {
    top.closeHole = true;
  }

  if (left && left.hasHole == false) {
    left.closeHole = true;
  }

  if (bottom && bottom.hasHole == false) {
    bottom.closeHole = true;
  }

  if (rigth && rigth.hasHole == false) {
    rigth.closeHole = true;
  }
}

Cell.prototype.getHole = function() {
  return this.hasHole;
}

Cell.prototype.getWumpus = function() {
  return this.hasWumpus;
}
