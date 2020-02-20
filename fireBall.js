class FireBall {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.img = game.fireBallImage;
    this.damage = 20;
  }
  draw() {
    switch (this.direction) {
      case "N":
        this.y -= 20;
        break;
      case "S":
        this.y += 20;
        break;
      case "W":
        this.x -= 20;
        break;
      case "E":
        this.x += 20;
        break;
    }

    image(this.img, this.x, this.y, 100, 100);
  }
}
