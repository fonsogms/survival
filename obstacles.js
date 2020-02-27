class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  checkCoordinates(obj) {
    if (obj.x === this.x && obj.y) {
    }
  }
  draw() {
    fill("red");
    image(game.stoneImg, this.x, this.y, 100, 100);
  }
}
