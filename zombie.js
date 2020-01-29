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

  bestStep(obj) {
    let cheapestPath = 1000;
    let path1 = { x: this.x + 100, y: this.y, pathCost: 0 };
    let path2 = { x: this.x - 100, y: this.y, pathCost: 0 };
    let path3 = { x: this.x, y: this.y + 100, pathCost: 0 };
    let path4 = { x: this.x, y: this.y - 100, pathCost: 0 };

    function findPathcost(origin, target) {
      let path2 = {
        x: origin.x - 100,
        y: origin.y,
        pathCost: origin.pathCost + 100
      };
      let path4 = {
        x: origin.x,
        y: origin.y - 100,
        pathCost: origin.pathCost + 100
      };
      let path1 = {
        x: origin.x + 100,
        y: origin.y,
        pathCost: origin.pathCost + 100
      };

      let path3 = {
        x: origin.x,
        y: origin.y + 100,
        pathCost: origin.pathCost + 100
      };
      let possibleSteps = [path1, path2, path3, path4];
      for (let step of possibleSteps) {
        if (step.pathCost < cheapestPath) {
          if (
            !game.checkCoordinates(step) &&
            step.x < width &&
            step.x >= 0 &&
            step.y > 0 &&
            step.y < height
          ) {
            if (step.x === target.x && step.y === target.y) {
              console.log("checked");
              cheapestPath = step.pathCost;

              return step.pathCost;
            } else {
              // console.log("new loop");
              step.pathCost = findPathcost(step, game.player);

              return step.pathCost;
            }
          } else {
            // console.log("not a possible step");
            return step.pathCost;
          }
        } else {
          //console.log("very pricy path", step);
          return step.pathCost;
        }
      }
      possibleSteps.forEach(step => {
        //console.log(step, cheapestPath);
      });
      /* return origin.pathCost; */
    }

    console.log("final cost", findPathcost(path2, game.player));
    console.log("final cost", findPathcost(path1, game.player));
    console.log("final cost", findPathcost(path3, game.player));
    console.log("final cost", findPathcost(path4, game.player));

    /*     possibleSteps.forEach(possibleStep => {
      possibleStep.distance = game.checkDistance(obj, possibleStep);
      console.log(possibleStep.distance, bestOption.distance);
      if (
        possibleStep.distance < bestOption.distance &&
        !game.checkCoordinates(possibleStep)
      ) {
        bestOption = possibleStep;
      }
    }); */
    //return bestOption;
  }
  draw() {
    if (frameCount === 120) {
      this.bestStep(game.player);
    }
    // if (frameCount % 120 === 0) {
    //   let newStep = this.bestStep(game.player);
    //   this.x = newStep.x;
    //   this.y = newStep.y;
    // }
    image(this.img, this.x, this.y, 100, 100);
  }
}
