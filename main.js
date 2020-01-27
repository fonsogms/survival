const game = new Game();
function preload() {
  //preloading all the resources before setup of the game
  game.preload();
}
function setup() {
  //setup the first elements of the game
  createCanvas(1000, 1000);
  game.setup();
}
function draw() {
  clear();

  game.drawGrid();
  game.draw();
  //to show constantly the elements
}
function keyPressed() {
  console.log(game.checkCoordinates(game.player));
  //move Left
  if (keyCode === 37) {
    game.player.image = game.player.soldierLeft;
    game.player.x -= 100;
    game.player.direction = "W";
    if (game.player.x < 0 || game.checkCoordinates(game.player)) {
      game.player.x += 100;
    }
  }
  // move Right
  else if (keyCode === 39) {
    game.player.image = game.player.soldierRight;
    game.player.x += 100;
    game.player.direction = "E";
    if (game.player.x >= width || game.checkCoordinates(game.player)) {
      game.player.x -= 100;
    }
  }
  //move Up
  else if (keyCode === 38) {
    game.player.image = game.player.soldierUp;
    game.player.y -= 100;
    game.player.direction = "N";
    if (game.player.y < 0 || game.checkCoordinates(game.player)) {
      game.player.y += 100;
    }
  }
  // move Down
  else if (keyCode === 40) {
    game.player.image = game.player.soldierDown;
    game.player.y += 100;
    game.player.direction = "S";
    if (game.player.y >= height || game.checkCoordinates(game.player)) {
      game.player.y -= 100;
    }
  } else if (keyCode === 32) {
    game.player.shoot();
  }
}
