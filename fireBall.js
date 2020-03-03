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
        this.y -= 40;
        break;
      case "S":
        this.y += 40;
        break;
      case "W":
        this.x -= 40;
        break;
      case "E":
        this.x += 40;
        break;
    }

    image(this.img, this.x, this.y, square_side, square_side);
  }
}
