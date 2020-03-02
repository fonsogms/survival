const game = new Game();
let gameStart = false;
let gamePaused = false;
let title;
let myFont;
function preload() {
  //preloading all the resources before setup of the game
  title = loadImage("assets/pixil-frame-0.png");
  myFont = loadFont("assets/Lacquer-Regular.ttf");
  game.preload();
}
function setup() {
  //setup the first elements of the game
  console.log("hello");
  createCanvas(1000, 1000);
  game.setup();
}
function beforeStartGame() {
  fill("black");
  rect(0, 0, 1000, 1000);
  fill("red");
  textSize(36);
  textFont(myFont);
  text("Press 1 or 2 for number of players", 200, 200);

  image(title, 200, -200, 600, 600);
  if (keyIsPressed) {
    if (keyCode === 49) {
      gameStart = true;
    } else if (keyCode === 50) {
      // console.log(game.players.push(game.player2));
      game.players.push(game.player2);
      game.players[1].preload();
      gameStart = true;
      console.log("not my dad");
    }
  }
}
function draw() {
  if (gameStart) {
    clear();

    background(color(77, 50, 26));

    game.draw();
    if (gamePaused) {
      fill("red");
      textSize(100);
      text("Paused", 350, 500);
    }
    //to show constantly the elements
  } else {
    beforeStartGame();
  }
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
  if (gameStart) {
    if (keyCode === 13) {
      gamePaused = !gamePaused;
    }
    if (!gamePaused) {
      playerMovement(game.player1, 37, 38, 39, 40, 32);
      playerMovement(game.player2, 65, 87, 68, 83, 81);
      loop();
    } else {
      noLoop();
    }
  }

  //move Left
}
