class Turret {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.imgs = game.turretImgs;
    this.img = game.turretImgs[direction];
  }

  draw() {
    image(this.img, this.x, this.y, square_side, square_side);
  }
}
