var theHunt = "A caça está prestes a começar\n\nMas tome cuidado...";

var wellcomeText = "Bem vindo ao jogo Hunt the Wumpus\n\nPara iniciar pressione Qualquer tecla";

var img, font;

function preload() {
  img = loadImage('/utils/images/wumpus.gif');
  font = loadFont('/utils/fonts/8-bit/PressStart2P-Regular.ttf')
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
  image(img, 180, height/2.5);

  fill(0);
  textSize(18);
  textFont(font);
  textLeading(16);
  textAlign(LEFT);
  text(theHunt, 270, 230);

  textSize(100);
  textAlign(CENTER);
  fill(0, 102, 153);
  text("WUMPUS", 400, 450);

  fill(255);
  textSize(12);
  text("Carregando", 400, 483.5);

}

NavPages.prototype.startPage = function() {

  fill(0);
  textSize(18);
  textFont(font);
  textLeading(18);
  textAlign(LEFT);
  text("Pressione qualquer botão", 300, 230);

}
