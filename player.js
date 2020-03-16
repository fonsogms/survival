class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = "S";
    this.fireBalls = [];
    this.health = 100;
    this.turrets = 1;
  }

  preload() {
    this.fireBall = new FireBall(this.x, this.y, this.direction);
    this.soldierUp = loadImage("./assets/soldierUp.png");
    this.soldierDown = loadImage("./assets/soldierDown.png");
    this.soldierLeft = loadImage("./assets/soldierLeft.png");
    this.soldierRight = loadImage("./assets/soldierRight.png");
    this.image = this.soldierUp;
  }
  shoot() {
    game.fireBalls.push(new FireBall(this.x, this.y, this.direction));
  }
  createTurret() {
    if (this.turrets > 0) {
      game.turrets.push(new Turret(this.x, this.y, this.direction));
      this.turrets -= 1;
    }
  }
  draw() {
    image(this.image, this.x, this.y, square_side, square_side);
  }
}
