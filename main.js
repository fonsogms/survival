let square_side = 50;
let WIDTH = 600;
let HEIGHT = 600;
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
  /*   console.log("hello");
   */
  createCanvas(WIDTH, HEIGHT);
  game.setup();
}
function beforeStartGame() {
  fill("black");
  rect(0, 0, width, height);
  fill("red");
  textSize(height / 30);
  textFont(myFont);
  text("Press 1 or 2 for number of players", width / 4, height / 4);

  image(title, width / 3.5, height - height * 1.1, width / 2, height / 2);
  if (keyIsPressed) {
    if (keyCode === 49) {
      gameStart = true;
    } else if (keyCode === 50) {
      // console.log(game.players.push(game.player2));
      game.players.push(game.player2);
      game.players[1].preload();
      gameStart = true;
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
      textSize(height / 10);
      text("Paused", width / 3, height / 2);
    }
    //to show constantly the elements
  } else {
    beforeStartGame();
  }
}

function playerMovement(player, left, up, right, down, shoot, turret) {
  let futurePlayer = { ...player };
  /*   game.coordinates.forEach(elem => {
    if (elem.x === player.x && elem.y === player.y) {
      console.log("working?");
      elem.occupied = !elem.occupied;
    }
  }); */
  if (keyCode === left) {
    player.image = player.soldierLeft;
    futurePlayer.x -= square_side;
    player.direction = "W";
    if (futurePlayer.x >= 0 && !game.checkCoordinates(futurePlayer)) {
      player.x -= square_side;
    }
  }
  // move Right
  else if (keyCode === right) {
    player.image = player.soldierRight;
    futurePlayer.x += square_side;
    player.direction = "E";
    if (futurePlayer.x < width && !game.checkCoordinates(futurePlayer)) {
      player.x += square_side;
    }
  }
  //move Up
  else if (keyCode === up) {
    player.image = player.soldierUp;
    futurePlayer.y -= square_side;
    player.direction = "N";
    if (futurePlayer.y >= 0 && !game.checkCoordinates(futurePlayer)) {
      player.y -= square_side;
    }
  }
  // move Down
  else if (keyCode === down) {
    player.image = player.soldierDown;
    futurePlayer.y += square_side;
    player.direction = "S";
    if (futurePlayer.y < height && !game.checkCoordinates(futurePlayer)) {
      player.y += square_side;
    }
  } else if (keyCode === shoot) {
    player.shoot();
  } else if (keyCode === turret) {
    player.createTurret();
  }
}
function keyPressed() {
  if (gameStart) {
    if (keyCode === 13) {
      gamePaused = !gamePaused;
    }
    if (!gamePaused) {
      playerMovement(game.player1, 37, 38, 39, 40, 32, 66);
      playerMovement(game.player2, 65, 87, 68, 83, 81);
      loop();
    } else {
      noLoop();
    }
  }

  //move Left
}
