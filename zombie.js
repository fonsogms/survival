// Why not use a matrix?

class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health = 50;
    this.imgs = game.zombie1Imgs;
    this.img = this.imgs.S[0];
    this.speed = 260;
    this.damage = 20;
    this.direction = "N";
    this.path = [];
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = 0;
  }
  //function using A* algorithm to find the best path to get to the player
  aFinder(origin, target) {
    let openList = [origin];
    let closedList = [];
    while (openList.length > 0) {
      let bestStep = {};
      bestStep.f = Infinity;
      for (let openElem of openList) {
        if (openElem.f < bestStep.f) {
          bestStep = openElem;
        }
      }
      let current = bestStep;
      if (current.x === target.x && current.y === target.y) {
        console.log("Done");
        let path = [];
        let temp = current;
        path.push(temp);
        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }
        return path.reverse();
      }

      game.removeFromArray(openList, current);
      closedList.push(current);
      current.neighbors = game.getNeighbors(current);
      let neighbors = current.neighbors;
      for (let neighbor of neighbors) {
        if (
          !closedList.find(closedNode => {
            if (neighbor.x === closedNode.x && neighbor.y === closedNode.y) {
              return true;
            }
          })
        ) {
          let tempG = current.g + 100;
          if (
            openList.find(openNode => {
              if (neighbor.x === openNode.x && neighbor.y === openNode.y) {
                return true;
              }
            })
          ) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
            }
          } else {
            neighbor.g = tempG;
            openList.push(neighbor);
          }
          neighbor.h = game.checkDistance(neighbor, target);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }
  occupySpots(obj) {
    game.coordinates.forEach(elem => {
      if (elem.x === obj.x && elem.y === obj.y) {
        elem.occupied = !elem.occupied;
      }
    });
  }

  //check the direction of the zombie to add images according to its direction
  checkDirection(previousPos, newPos, target) {
    if (newPos.x < previousPos.x) {
      this.direction = "W";
      this.img = this.imgs.W[this.i % 3];
    }
    if (newPos.x > previousPos.x) {
      this.direction = "E";
      this.img = this.imgs.E[this.i % 3];
    }
    if (newPos.y < previousPos.y) {
      this.direction = "N";
      this.img = this.imgs.N[this.i % 3];
    }
    if (newPos.y > previousPos.y) {
      this.direction = "S";
      this.img = this.imgs.S[this.i % 3];
    }
  }
  lookAtPlayer(target) {
    if (this.x > target.x) {
      this.direction = "W";
      this.img = this.imgs.W[this.i % 3];
    }
    if (this.x < target.x) {
      this.direction = "E";
      this.img = this.imgs.E[this.i % 3];
    }
    if (this.y > target.y) {
      this.direction = "N";
      this.img = this.imgs.N[this.i % 3];
    }
    if (this.y < target.y) {
      this.direction = "S";
      this.img = this.imgs.S[this.i % 3];
    }
  }
  zombieMovement() {
    this.i++;
    //this.occupySpots(this);
    //this is to make sure the zombie is only as close to one step to the player
    this.lookAtPlayer(game.player);

    if (game.checkDistance(this, game.player) > 100) {
      this.path = this.aFinder(this, game.player);
      if (this.path) {
        this.checkDirection(this, this.path[1], game.player);
        this.x = this.path[1].x;
        this.y = this.path[1].y;
      } else {
        let possibleSteps = game.getNeighbors(this);
        let nextStep = { distance: Infinity };
        for (let possibleStep of possibleSteps) {
          possibleStep.distance = game.checkDistance(possibleStep, game.player);
          if (possibleStep.distance < nextStep.distance) {
            nextStep = possibleStep;
          }
          this.lookAtPlayer(game.player);
        }
        this.x = nextStep.x;
        this.y = nextStep.y;
      }
    }
    // this.occupySpots(this);
  }
  draw() {
    this.rate = 300 - this.speed;
    // first is to make sure that we are occupying the first spot

    /*  if (frameCount % this.rate === 0) {
      console.log("check");
    } */
    if (frameCount % this.rate === 0) {
      game.coordinates.forEach(elem => {
        if (elem.x === this.x && elem.y === this.y) {
          console.log("working?");
          elem.occupied = !elem.occupied;
        }
      });
      this.zombieMovement();
      game.coordinates.forEach(elem => {
        if (elem.x === this.x && elem.y === this.y) {
          console.log("working?");
          elem.occupied = !elem.occupied;
        }
      });
    }

    image(this.img, this.x, this.y, 100, 100);
  }
}
