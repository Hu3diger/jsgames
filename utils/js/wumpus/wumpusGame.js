/**
 * Game made by: Altieri, Esdras & Martin
 * Fonts: https://en.wikipedia.org/wiki/Hunt_the_Wumpus
 */


var loading = false, gameStarted = false;
var loadingCounter = 0;
var pages, actualPage = "loading";
var w = 50;
var row, col;
var grid = [];
var char;

function setup() {
  /* Create the canvas to draw */
  createCanvas(801, 501);
  row = floor(width / w);
  col = floor(height / w);

  console.log("Possuo ", col, " colunas");
  console.log("Possuo ", row, " linhas");

  for (var x = 0; x < row; x++) {
    for (var y = 0; y < col; y++) {
      let a = random(50);
      let cell = new Cell(x, y, w, (a > 48 ? true : false));
      grid.push(cell);
    }
  }

  console.log(grid);
  pages = new NavPages();
  pages.setPage("startPage");  // startPage   loading

  char = new Char(1, 1, w);

}

function draw() {
  background(249, 248, 247);

  if (loading) {

    loadingCounter++;
    if (loadingCounter > 198) {
      loadingCounter = 199;
      loading = false;
      // pages.setPage("gameScreen");
    }

    stroke(0);
    noFill();
    rect(300, 470, 200, 20);

    noStroke();
    fill(0, 116, 242);
    rect(301, 470.5, loadingCounter, 20);

    pages.updatePage();
  } else if (gameStarted == false) {
    pages.updatePage();
  }else {
    background(51);

    for (var x = 0; x < grid.length; x++) {
      grid[x].show();
    }

    char.showChar();

  }
}

function keyPressed() {

  if (gameStarted === false) {
    pages.setPage("loading");
    gameStarted = true;
    loading = true;
  } else {


    if (keyCode == UP_ARROW) { // top
      if (char.canMoveTo(0) == true) {
        char.moveTo(0, -2);
      } else {
        char.setDir(0)
      }
    } else if (keyCode == LEFT_ARROW) { // left
      if (char.canMoveTo(1) == true) {
        char.moveTo(-2, 0);
      } else {
        char.setDir(1)
      }
    } else if (keyCode == DOWN_ARROW) { // down
      if (char.canMoveTo(2) == true) {
        char.moveTo(0, 2);
      } else {
        char.setDir(2)
      }
    } else if (keyCode == RIGHT_ARROW) { // right
      if (char.canMoveTo(3) == true) {
        char.moveTo(2, 0);
      } else {
        char.setDir(3)
      }
    }

    let charX = floor(char.x / 2);
    let charY = floor(char.y / 2);
    for (var x = 0; x < grid.length; x++) {
      // grid[x].show();
      if (grid[x].x == charX && grid[x].y == charY) {
        if (grid[x].hasHole == true) console.log("buraco");
        else console.log("nope");
      }
    }
  }
}
