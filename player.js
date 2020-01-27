class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = "S";
    this.fireBalls = [];
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
    image(this.image, this.x, this.y, 100, 100);
    this.fireBalls.forEach(elem => {
      elem.draw();
    });
  }
}
