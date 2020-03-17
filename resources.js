/* let zombie1S=[]
let zombie1W=[]
let zombie1E=[] */
declareResources = game => {
  game.fireBallImage = loadImage("./assets/fireBall.png");
  game.earthImg = loadImage("./assets/Tierra.png");
  game.stoneImg = loadImage("./assets/piedra.png");
  game.heart = loadImage("assets/pixel-heart-2779422_1920.png");
  game.bomb = loadImage("assets/bomb_circle_0.png");
  game.lasers = {
    vertical: loadImage("assets/verticalLaser.png"),
    horizontal: loadImage("assets/horizontalLaser.png")
  };
  game.laserGun = loadImage("assets/alien-gun-4780305_1280.png");
  game.turretImgs = {
    N: loadImage("assets/turret/turretUp.png"),
    S: loadImage("assets/turret/turretDown.png"),
    W: loadImage("assets/turret/turretLeft.png"),
    E: loadImage("assets/turret/turretRight.png")
  };
  for (let i = 1; i <= 3; i++) {
    game[`zombie${i}N`] = [];
    game[`zombie${i}S`] = [];
    game[`zombie${i}W`] = [];
    game[`zombie${i}E`] = [];
    for (let j = 1; j <= 4; j++) {
      game[`zombie${i}N`].push(loadImage(`assets/zombies/zombie${i}N${j}.png`));
      game[`zombie${i}S`].push(loadImage(`assets/zombies/zombie${i}S${j}.png`));
      game[`zombie${i}W`].push(loadImage(`assets/zombies/zombie${i}W${j}.png`));
      game[`zombie${i}E`].push(loadImage(`assets/zombies/zombie${i}E${j}.png`));
    }
  }
};
