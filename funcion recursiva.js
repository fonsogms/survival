function bestStep(obj) {
  let cheapestPath = 1000;

  console.log();
  function findPathcost(origin, target) {
    let path1 = {
      x: origin.x + 100,
      y: origin.y,
      pathCost: origin.pathCost + 100,
      path: [...origin.path, { x: origin.x + 100, y: origin.y }]
    };
    let path2 = {
      x: origin.x - 100,
      y: origin.y,
      pathCost: origin.pathCost + 100,
      path: [...origin.path, { x: origin.x - 100, y: origin.y }]
    };
    let path3 = {
      x: origin.x,
      y: origin.y + 100,
      pathCost: origin.pathCost + 100,
      path: [...origin.path, { x: origin.x, y: origin.y + 100 }]
    };

    let path4 = {
      x: origin.x,
      y: origin.y - 100,
      pathCost: origin.pathCost + 100,
      path: [...origin.path, { x: origin.x, y: origin.y - 100 }]
    };

    console.log("Hola", path2);

    const possibleSteps = [path1, path2, path3, path4];

    possibleSteps.sort((a, b) => {
      if (game.checkDistance(a, target) < game.checkDistance(b, target)) {
        return b - a;
      } else {
        return a - b;
      }
    });
    // console.log(possibleSteps);
    for (let step of possibleSteps) {
      // console.log("new step", step);
      for (let prevSteps of step.path) {
        if (step.x === prevSteps.x && step.y === prevSteps.y) {
          console.log("repetido");
          continue;
        }
      }
      if (step.pathCost < cheapestPath) {
        if (
          !game.checkCoordinates(step) &&
          step.x < width &&
          step.x >= 0 &&
          step.y > 0 &&
          step.y < height
        ) {
          if (step.x === target.x && step.y === target.y) {
            //   console.log("checked");
            cheapestPath = step.pathCost;

            return step.pathCost;
          } else {
            console.log("new loop");
            step.pathCost = findPathcost(step, game.player);
            // console.log(step.pathCost);
            if (step.pathCost) {
              return step.pathCost;
            } else {
              continue;
            }
          }
        } else {
          console.log("not a possible step");
          return null;
        }
      } else {
        console.log("too pricy ");
        return null;
      }
    }
  }

  console.log("final cost blue", findPathcost(spath1, game.player));
  let b;
  // console.log("final cost red", findPathcost(spath2, game.player));
  // console.log(spath2);
  // console.log("final cost green", findPathcost(spath3, game.player));
  // console.log(spath3);

  // console.log("final cost black", findPathcost(spath4, game.player));
  // console.log(spath4);

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
