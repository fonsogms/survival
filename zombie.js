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
    // console.log(game.checkCoordinates(this));

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
  getCloser(origin, target) {
    let path1 = {
      x: origin.x + 100,
      y: origin.y,
      path: [...origin.path, { x: origin.x + 100, y: origin.y }]
    };
    let path2 = {
      x: origin.x - 100,
      y: origin.y,
      path: [...origin.path, { x: origin.x - 100, y: origin.y }]
    };
    let path3 = {
      x: origin.x,
      y: origin.y + 100,
      path: [...origin.path, { x: origin.x, y: origin.y + 100 }]
    };

    let path4 = {
      x: origin.x,
      y: origin.y - 100,
      path: [...origin.path, { x: origin.x, y: origin.y - 100 }]
    };
    let bestOption = { distance: 4000 };
    let possibleSteps = [path1, path2, path3, path4];

    for (let elem of possibleSteps) {
      if (
        origin.path.find(pastStep => {
          if (elem.x === pastStep.x && elem.y === pastStep.y) {
            return true;
          }
        })
      ) {
        //  console.log("already been there", elem.path);

        continue;
      }

      if (
        game.checkCoordinates(elem) ||
        elem.x >= width ||
        elem.x < 0 ||
        elem.y >= height ||
        elem.y < 0
      ) {
        //  console.log("not a possible step");
        continue;
      }
      if (game.checkDistance(elem, target) < bestOption.distance) {
        // console.log("possible step");
        elem.distance = game.checkDistance(elem, target);
        bestOption = elem;
      } else if (game.checkDistance(elem, target) === bestOption.distance) {
      }
    }
    console.log(bestOption);
    return bestOption;
  }
  pathFinder(player) {
    let path1 = {
      x: this.x + 100,
      y: this.y,
      path: [{ x: this.x + 100, y: this.y }]
    };
    let path2 = {
      x: this.x - 100,
      y: this.y,
      path: [{ x: this.x - 100, y: this.y }]
    };
    let path3 = {
      x: this.x,
      y: this.y + 100,
      path: [{ x: this.x, y: this.y + 100 }]
    };

    let path4 = {
      x: this.x,
      y: this.y - 100,
      path: [{ x: this.x, y: this.y - 100 }]
    };
    let possiblePaths = [path1, path2, path3, path4];
    const findPath = (origin, target) => {
      if (origin.x === target.x && origin.y === target.y) {
        //  console.log("target found");
        return origin;
      } else {
        let nextStep = this.getCloser(origin, target);
        if (Object.keys(nextStep).length >= 3) {
          //  console.log("starting new loop");

          let foundPath = findPath(nextStep, target);
          console.log("this is one path", foundPath);

          return foundPath;
        }
      }

      //me devuelve cual es el paso mas cercano con registro del path
    };
    let shortestPath = {
      path: [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        11,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        11,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ]
    };

    for (let path of possiblePaths) {
      console.log(path);
      let bestPossiblePath = findPath(path, player);
      //console.log(bestPossiblePath);

      if (!bestPossiblePath) {
        continue;
      }

      if (bestPossiblePath.path.length < shortestPath.path.length) {
        shortestPath = path;
      }
    }
    if (shortestPath.x) {
      return shortestPath;
    } else {
      return this.getCloser(this, player);
    }
  }

  draw() {
    if (frameCount % 120 === 0) {
      let nextStep = this.pathFinder(game.player);
      this.x = nextStep.x;
      this.y = nextStep.y;
    }

    /*     if (frameCount % 20 === 0) {
      let newStep = this.getCloser(this, game.player);
      console.log(newStep);
      if (Object.keys(newStep).length >= 3) {
        this.x = newStep.x;
        this.y = newStep.y;
      } else {
        this.path = [];
      }
    } */

    image(this.img, this.x, this.y, 100, 100);
  }
}
