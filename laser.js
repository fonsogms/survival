class Laser extends FireBall {
  constructor(x, y, direction) {
    super(x, y, direction);
    this.imgs = game.lasers;
    this.damage = 60;
  }
  draw() {
    switch (this.direction) {
      case "N":
        this.img = this.imgs.vertical;
        this.y -= square_side / 2;
        break;
      case "S":
        this.img = this.imgs.vertical;

        this.y += square_side / 2;
        break;
      case "W":
        this.img = this.imgs.horizontal;

        this.x -= square_side / 2;
        break;
      case "E":
        this.img = this.imgs.horizontal;

        this.x += square_side / 2;
        break;
    }
    image(
      this.img,
      this.x + square_side / 5,
      this.y + square_side / 5,
      square_side / 2,
      square_side / 2
    );
  }
}

// No I can not....
