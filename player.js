class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = "S";
    this.fireBalls = [];
    this.health = 100;
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
    this.fireBalls.push(new FireBall(this.x, this.y, this.direction));
  }

  draw() {
    image(this.image, this.x, this.y, square_side, square_side);
    this.fireBalls.forEach(elem => {
      elem.draw();
    });
  }
}
