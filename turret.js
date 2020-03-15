class Turret {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.imgs = game.turretImgs;
    this.img = game.turretImgs[direction];
    this.health = 300;
  }
  shoot() {
    game.fireBalls.push(new FireBall(this.x, this.y, this.direction));
  }
  checkEnemies() {
    for (let i = this.x; i <= WIDTH; i += square_side) {
      //if there is an obstacle stop

      if (game.checkCoordinates({ x: i, y: this.y })) {
        for (let zombie of game.zombies) {
          if (i === zombie.x && this.y === zombie.y) {
            this.direction = "E";
            this.shoot();
            return true;
          }
        }

        break;
      }
      //if there is zombie shoot
    }
    for (let i = this.x; i >= 0; i -= square_side) {
      //if there is an obstacle stop

      if (game.checkCoordinates({ x: i, y: this.y })) {
        for (let zombie of game.zombies) {
          if (i === zombie.x && this.y === zombie.y) {
            this.direction = "W";
            this.shoot();
            return true;
          }
        }

        break;
      }
    }

    for (let i = this.y; i >= 0; i -= square_side) {
      //if there is an obstacle stop

      if (game.checkCoordinates({ x: this.x, y: i })) {
        console.log(i);
        for (let zombie of game.zombies) {
          if (this.x === zombie.x && i === zombie.y) {
            this.direction = "N";
            this.shoot();
            return true;
          }
        }

        break;
      }
    }

    for (let i = this.y; i <= HEIGHT; i += square_side) {
      //if there is an obstacle stop

      if (game.checkCoordinates({ x: this.x, y: i })) {
        for (let zombie of game.zombies) {
          if (this.x === zombie.x && i === zombie.y) {
            this.direction = "S";
            this.shoot();
            return true;
          }
        }

        break;
      }
    }
  }
  draw() {
    if (frameCount % 20 === 0) {
      this.checkEnemies();
    }
    image(this.imgs[this.direction], this.x, this.y, square_side, square_side);
  }
}
