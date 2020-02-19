// Why not use a matrix?

class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health = 100;
    this.img = game.zombieImg;
    this.direction = "N";
    this.path = [];
    this.f = 0;
    this.g = 0;
    this.h = 0;
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
  draw() {
    if (frameCount % 20 === 0) {
      game.coordinates.forEach(elem => {
        if (elem.x === this.x && elem.y === this.y) {
          elem.occupied = !elem.occupied;
        }
      });
      //this is to make sure the zombie is only as close to one step to the player
      if (game.checkDistance(this, game.player) > 100) {
        this.path = this.aFinder(this, game.player);
        this.x = this.path[1].x;
        this.y = this.path[1].y;
        game.coordinates.forEach(elem => {
          if (elem.x === this.x && elem.y === this.y) {
            elem.occupied = !elem.occupied;
          }
        });
      }
    }
    // if the zombie dies he has to dissappear

    image(this.img, this.x, this.y, 100, 100);
  }
}
