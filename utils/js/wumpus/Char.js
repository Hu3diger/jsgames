
var Char = function(x, y, w) {
  this.x = x;
  this.y = y;
  this.w = w;

  //            top,  left, bottom, right
  this.side = [false, false, true, false];
}

Char.prototype.showChar = function() {

  let x = this.x * (this.w / 2);
  let y = this.y * (this.w / 2);
  let w = this.w - 1;

  if (this.side[0] === true) {
    image(charUp, x, y, w, w);
  } else if (this.side[1] === true) {
    image(charLeft, x, y, w, w);
  } else if (this.side[2] === true) {
    image(charDown, x, y, w, w);
  }else if (this.side[3] === true) {
    image(charRigth, x, y, w, w);
  }
}

Char.prototype.setDir = function(dir) {
  for (var x = 0; x < this.side.length; x++) this.side[x] = false;
  if (dir > -1 && dir < 4) this.side[dir] = true;
}

Char.prototype.canMoveTo = function(dir) {
  return this.side[dir];
}

Char.prototype.moveTo = function(x, y) {
  this.x += x;
  this.y += y;

  if (this.x < 0) this.x = 1;
  if (this.y < 0) this.y = 1;
  if (this.x > 31) this.x = 31
  if (this.y > 19) this.y = 19;
}
