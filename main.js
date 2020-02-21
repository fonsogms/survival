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

function playerMovement(player) {
  if (keyCode === 37) {
    player.image = player.soldierLeft;
    player.x -= 100;
    player.direction = "W";
    if (player.x < 0 || game.checkCoordinates(player)) {
      player.x += 100;
    }
  }
  // move Right
  else if (keyCode === 39) {
    player.image = player.soldierRight;
    player.x += 100;
    player.direction = "E";
    if (player.x >= width || game.checkCoordinates(player)) {
      player.x -= 100;
    }
  }
  //move Up
  else if (keyCode === 38) {
    player.image = player.soldierUp;
    player.y -= 100;
    player.direction = "N";
    if (player.y < 0 || game.checkCoordinates(player)) {
      player.y += 100;
    }
  }
  // move Down
  else if (keyCode === 40) {
    player.image = player.soldierDown;
    player.y += 100;
    player.direction = "S";
    if (player.y >= height || game.checkCoordinates(player)) {
      player.y -= 100;
    }
  } else if (keyCode === 32) {
    player.shoot();
  }
}
function keyPressed() {
  playerMovement(game.player);
  //move Left
}
