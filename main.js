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
  let futurePlayer = { ...player };
  /*   game.coordinates.forEach(elem => {
    if (elem.x === player.x && elem.y === player.y) {
      console.log("working?");
      elem.occupied = !elem.occupied;
    }
  }); */
  if (keyCode === left) {
    player.image = player.soldierLeft;
    futurePlayer.x -= 100;
    player.direction = "W";
    if (futurePlayer.x >= 0 && !game.checkCoordinates(futurePlayer)) {
      player.x -= 100;
    }
  }
  // move Right
  else if (keyCode === right) {
    player.image = player.soldierRight;
    futurePlayer.x += 100;
    player.direction = "E";
    if (futurePlayer.x < width && !game.checkCoordinates(futurePlayer)) {
      player.x += 100;
    }
  }
  //move Up
  else if (keyCode === up) {
    player.image = player.soldierUp;
    futurePlayer.y -= 100;
    player.direction = "N";
    if (futurePlayer.y >= 0 && !game.checkCoordinates(futurePlayer)) {
      player.y -= 100;
    }
  }
  // move Down
  else if (keyCode === down) {
    player.image = player.soldierDown;
    futurePlayer.y += 100;
    player.direction = "S";
    if (futurePlayer.y < height && !game.checkCoordinates(futurePlayer)) {
      player.y += 100;
    }
  } else if (keyCode === shoot) {
    player.shoot();
  }
  /*  game.coordinates.forEach(elem => {
    if (elem.x === player.x && elem.y === player.y) {
      console.log("working?");
      elem.occupied = true;
    }
  }); */
}
function keyPressed() {
  playerMovement(game.player, 37, 38, 39, 40, 32);
  playerMovement(game.player2, 65, 87, 68, 83, 81);

  //move Left
}
