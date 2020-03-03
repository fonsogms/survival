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
        this.y -= square_side;
        break;
      case "S":
        this.y += square_side;
        break;
      case "W":
        this.x -= square_side;
        break;
      case "E":
        this.x += square_side;
        break;
    }

    image(this.img, this.x, this.y, square_side, square_side);
  }
}
