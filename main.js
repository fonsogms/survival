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

function playerMovement(player, left, up, right, down, shoot) {
  [37, 38, 39, 40];
  if (keyCode === left) {
    player.image = player.soldierLeft;
    player.x -= 100;
    player.direction = "W";
    if (player.x < 0 || game.checkCoordinates(player)) {
      player.x += 100;
    }
  }
  // move Right
  else if (keyCode === right) {
    player.image = player.soldierRight;
    player.x += 100;
    player.direction = "E";
    if (player.x >= width || game.checkCoordinates(player)) {
      player.x -= 100;
    }
  }
  //move Up
  else if (keyCode === up) {
    player.image = player.soldierUp;
    player.y -= 100;
    player.direction = "N";
    if (player.y < 0 || game.checkCoordinates(player)) {
      player.y += 100;
    }
  }
  // move Down
  else if (keyCode === down) {
    player.image = player.soldierDown;
    player.y += 100;
    player.direction = "S";
    if (player.y >= height || game.checkCoordinates(player)) {
      player.y -= 100;
    }
  } else if (keyCode === shoot) {
    player.shoot();
  }
}
function keyPressed() {
  playerMovement(game.player, 37, 38, 39, 40, 32);
  playerMovement(game.player2, 65, 87, 68, 83, 81);

  //move Left
}
