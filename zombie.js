class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health = 100;
    this.img = game.zombieImg;
    this.direction = "N";
  }

  moveRight() {
    this.x += 100;
    if (game.checkCoordinates(this)) {
      this.x -= 100;
    }
  }
  moveLeft() {
    console.log(game.checkCoordinates(this));

    this.x -= 100;
    if (game.checkCoordinates(this)) {
      this.x += 100;
    }
  }
  moveUp() {
    this.y -= 100;
    if (game.checkCoordinates(this)) {
      this.y += 100;
    }
  }
  moveDown() {
    this.y += 100;
    if (game.checkCoordinates(this)) {
      this.y -= 100;
    }
  }
  draw() {
    if (frameCount % 120 === 0) {
      if (game.player.x > this.x) {
        this.moveRight();
      } else if (game.player.x < this.x) {
        this.moveLeft();
      } else if (game.player.y > this.y) {
        this.y += 100;
      } else if (game.player.y < this.y) {
        this.y -= 100;
      }
    }
    image(this.img, this.x, this.y, 100, 100);
  }
}
