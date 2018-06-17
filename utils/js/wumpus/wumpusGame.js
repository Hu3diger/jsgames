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
var current;
var lose = false;

$().ready(function() {
  $(".modal").modal();

  $(".reset").on("click", function() {
    resetGame()
  });
});

function setup() {
  /* Create the canvas to draw */

  img = loadImage('/utils/images/wumpus.gif');
  font = loadFont('/utils/fonts/8-bit/PressStart2P-Regular.ttf')

  charUp = loadImage('/utils/images/wumpus/player_facing_to_up.png');
  charLeft = loadImage('/utils/images/wumpus/player_facing_to_left.png');
  charDown = loadImage('/utils/images/wumpus/player_facing_to_down.png');
  charRigth = loadImage('/utils/images/wumpus/player_facing_to_right.png');

  createCanvas(801, 501);
  resetGame();
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

    for (var x = 0; x < grid.length; x++) {
      if (grid[x].hasHole == true) {
        current = grid[x];
        current.showNeighbors();
      } else if (grid[x].hasWumpus == true) {
        current = grid[x];
        current.showNeighborsWumpus();
      }
    }

    char.showChar();

  }
}


function resetGame() {
  lose = false;

  row = floor(width / w);
  col = floor(height / w);
  let useWumpus = false;
  let wumpusUsed = false;
  let hole;

  for (var x = 0; x < row; x++) {
    for (var y = 0; y < col; y++) {

      if (wumpusUsed == false && x > 5) {
        useWumpus = (random(50) > 45 ? true : false);
        if (useWumpus) wumpusUsed = true;
      } else {
        useWumpus = false;
      }

      let a = random(50);
      let useHole = false;
      if (x > 0) useHole = (a > 48 ? true : false);
      // if (x == 3 && y == 5) useHole = true;

      let cell = new Cell(x, y, w, useHole, useWumpus);
      grid.push(cell);
    }
  }

  pages = new NavPages();
  pages.setPage("startPage");  // startPage   loading

  char = new Char(1, 1, w);
  grid[0].visited = false;
}


function keyPressed() {

  if (gameStarted === false) {
    pages.setPage("loading");
    gameStarted = true;
    loading = true;
  } else if (lose == false) {

    if (keyCode == UP_ARROW) {  // top
      if (char.canMoveTo(0) == true) {
        char.moveTo(0, -2);
      }
      char.setDir(0)
    } else if (keyCode == LEFT_ARROW) { // left
      if (char.canMoveTo(1) == true) {
        char.moveTo(-2, 0);
      }
        char.setDir(1)
    } else if (keyCode == DOWN_ARROW) { // down
      if (char.canMoveTo(2) == true) {
        char.moveTo(0, 2);
      }
      char.setDir(2)
    } else if (keyCode == RIGHT_ARROW) { // right
      if (char.canMoveTo(3) == true) {
        char.moveTo(2, 0);
      }
      char.setDir(3)
    } else if (keyCode == 32) {
      for (var x = 0; x < char.side.length; x++) {
        if (char.side[x] == true) shoot(x);
      }
    }

    let charX = floor(char.x / 2);
    let charY = floor(char.y / 2);

    for (var x = 0; x < grid.length; x++) {
      if (grid[x].x == charX && grid[x].y == charY) {
        grid[x].visited = false;
        if (grid[x].hasHole == true) {
          $("#modalTitle").html("Você perdeu!");
          $("#textModal").html("Você caiu dentro de um buraco :(");
          $("#modal1").modal("open");
          lose = true;
        } else if(grid[x].hasWumpus == true) {
          $("#modalTitle").html("Você perdeu!");
          $("#textModal").html("O wumpus te comeu!");
          $("#modal1").modal("open");
          lose = true;
        }
      }
    }
  }
}

function shoot(dir) {
  let x = floor(char.x / 2);
  let y = floor(char.y / 2);

  let top     = grid[index(x    , y - 1)];
  let left    = grid[index(x - 1, y    )];
  let rigth   = grid[index(x + 1, y    )];
  let bottom  = grid[index(x    , y + 1)];

  let win = false;

  if (dir == 0) {
    if (top && top.hasWumpus) win = true

  } else if (dir == 1) {
    if (left && left.hasWumpus) win = true;

  } else if (dir == 2) {
    if (bottom && bottom.hasWumpus) win = true;

  } else if (dir == 3) {
    if (rigth && rigth.hasWumpus) win = true;
  }

  lose = true;
  if (win == true) {
    $("#modalTitle").html("Você ganhow!");
    $("#textModal").html("Acertou o wumpus em cheio");
    $("#modal1").modal("open");
    return false;
  }

  $("#modalTitle").html("Você perdeu!");
  $("#textModal").html("O local onde você atirou a flecha não possuia um Wumpus");

  $("#modal1").modal("open");
}


function index(y, x) {
  if (x < 0 || y < 0 || x > col-1 || y > row-1)
    return -1;

  return x + y * col;
}