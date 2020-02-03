// Why not use a matrix?

class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health = 100;
    this.img = game.zombieImg;
    this.direction = "N";
    this.path = [{ x: 10000000, y: 101321323 }];
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
  getCloser(obj) {
    if (this.path.length > 10) {
      console.log(this.path);
      this.path = [];
    }
    let path1 = {
      x: this.x + 100,
      y: this.y
    };
    let path2 = {
      x: this.x - 100,
      y: this.y
    };
    let path3 = {
      x: this.x,
      y: this.y + 100
    };

    let path4 = {
      x: this.x,
      y: this.y - 100
    };
    let bestOption = { distance: 2000 };
    let possibleSteps = [path1, path2, path3, path4];

    for (let elem of possibleSteps) {
      if (
        this.path.find(pastStep => {
          if (elem.x === pastStep.x && elem.y === pastStep.y) {
            return true;
          }
        })
      ) {
        continue;
      }
      if (
        game.checkCoordinates(elem) ||
        elem.x >= width ||
        elem.x < 0 ||
        elem.y >= height ||
        elem.y < 0
      ) {
        continue;
      }
      if (game.checkDistance(elem, game.player) < bestOption.distance) {
        elem.distance = game.checkDistance(elem, game.player);
        bestOption = elem;
        this.path.push(elem);
      }
    }

    return bestOption;
  }
  findPath(target) {
    let path1 = {
      x: this.x + 100,
      y: this.y,
      path: []
    };
    let path2 = {
      x: this.x - 100,
      y: this.y,
      path: []
    };
    let path3 = {
      x: this.x,
      y: this.y + 100,
      path: []
    };

    let path4 = {
      x: this.x,
      y: this.y - 100,
      path: []
    };
    let possibleSteps = [path1, path2, path3, path4];
    for (let step of possibleSteps) {
    }
  }

  draw() {
    if (frameCount % 20 === 0) {
      let newStep = this.getCloser(game.player);

      if (Object.keys(newStep).length === 3) {
        this.x = newStep.x;
        this.y = newStep.y;
      } else {
        this.path = [];
      }
    }

    image(this.img, this.x, this.y, 100, 100);
  }
}
