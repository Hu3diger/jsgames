/**
 * Game made by: Altieri, Esdras & Martin
 * Fonts: https://en.wikipedia.org/wiki/Hunt_the_Wumpus
 */


var loading = true;
var loadingCounter = 0;
var pages, actualPage = "loading";

function setup() {
  /* Create the canvas to draw */
  createCanvas(800, 500);
  pages = new NavPages();
  pages.setPage("loading");
}

function draw() {
  background(249, 248, 247);

  if (loading) {

    loadingCounter++;
    if (loadingCounter > 198) {
      loadingCounter = 199;
      loading = false;
      pages.setPage("startPage");
    }

    stroke(0);
    noFill();
    rect(300, 470, 200, 15, 10);

    noStroke();
    fill(0, 116, 242);
    rect(301, 470.5, loadingCounter, 15, 10);

  } else {
    // ??
  }

  pages.updatePage();

}

