var theHunt = "A caça está prestes a começar\n\nMas tome cuidado...";

var wellcomeText = "Bem vindo ao jogo Hunt the Wumpus\n\nPara iniciar pressione Qualquer tecla";

var img, font;
var charUp, charLeft, charDown, charRigth;
function preload() {
  img = loadImage('../images/wumpus.gif');
  font = loadFont('../fonts/8-bit/PressStart2P-Regular.ttf')

  // charUp = loadImage('/utils/images/wumpus/player_facing_to_up.png');
  // charLeft = loadImage('/utils/images/wumpus/player_facing_to_left.png');
  // charDown = loadImage('/utils/images/wumpus/player_facing_to_down.png');
  // charRigth = loadImage('/utils/images/wumpus/player_facing_to_right.png');
}

var NavPages = function() {

  this.page = "";
}

NavPages.prototype.setPage = function(page) {
  this.page = page;
  this.updatePage();
}

NavPages.prototype.updatePage = function() {

  /* Make the border */
  stroke(0);
  line(0, 0, 800, 0);
  line(0, 499, 800, 499);
  line(0, 0, 0, 499);
  line(799, 0, 799, 499);
  noStroke();

  let page = this.page;

  switch(page) {

    case "loading":
      this.loadingPage();
      break;

    case "startPage":
      this.startPage();
      break;
  }
}

NavPages.prototype.loadingPage = function() {

  imageMode(CENTER);
  image(img, 150, height/2.5);

  fill(0);
  textSize(18);
  textFont(font);
  textLeading(16);
  textAlign(LEFT);
  text(theHunt, 240, 230);

  textSize(100);
  textAlign(CENTER);
  fill(0, 102, 153);
  text("WUMPUS", 400, 450);

  fill(0);
  textSize(12);
  text("Carregando", 400, 487);

}

NavPages.prototype.startPage = function() {

  imageMode(CENTER);
  image(img, 150, height/2.5);

  fill(0);
  textSize(18);
  textFont(font);
  textLeading(18);
  textAlign(LEFT);
  text("Pressione qualquer botão", 280, 230);

}
