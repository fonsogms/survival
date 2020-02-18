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
  setup() {}

  checkNeighbours(node, vistedNode) {}
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
      // closedList.push(current);
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
          // console.log("Not closed");
          let tempG = current.g + 100;
          if (
            openList.find(openNode => {
              if (neighbor.x === openNode.x && neighbor.y === openNode.y) {
                return true;
              }
            })
          ) {
            console.log("in openset");
            if (tempG < neighbor.g) {
              console.log("better G");
              neighbor.g = tempG;
            }
          } else {
            neighbor.g = tempG;
            openList.push(neighbor);
          }
          neighbor.h = game.checkDistance(neighbor, target);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
          //console.log(neighbor);
        }
      }
    }
  }
  draw() {
    if (frameCount === 30) {
      //console.log(possibleSteps);
      // this.nextStep = this.pathTest(this, game.player);
      //console.log(this.nextStep);
      // console.log(this.x, this.y);
      //console.log(this.path);
    }
    if (frameCount % 32 === 0) {
      this.path = this.aFinder(this, game.player);

      this.x = this.path[1].x;
      this.y = this.path[1].y;
    }
    image(this.img, this.x, this.y, 100, 100);
  }
}
