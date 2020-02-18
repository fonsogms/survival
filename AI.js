// checkNeighbours(node, visitedNodes, pathStack, target) {
//   let path1 = {
//     x: node.x + 100,
//     y: node.y
//   };
//   let path2 = {
//     x: node.x - 100,
//     y: node.y
//   };
//   let path3 = {
//     x: node.x,
//     y: node.y + 100
//   };

//   let path4 = {
//     x: node.x,
//     y: node.y - 100
//   };
//   let unvisited = 0;
//   let possiblePaths = [path1, path2, path3, path4];
//   possiblePaths.forEach(elem => {
//     elem.distance = game.checkDistance(elem, target);
//   });
//   possiblePaths.sort((a, b) => {
//     return b.distance - a.distance;
//   });
//   // console.log(possiblePaths);
//   for (let elem of possiblePaths) {
//     if (
//       game.checkCoordinates(elem) ||
//       elem.x >= width ||
//       elem.x < 0 ||
//       elem.y >= height ||
//       elem.y < 0
//     ) {
//       continue;
//     }

//     if (
//       !visitedNodes.find(visitedNode => {
//         if (elem.x === visitedNode.x && elem.y === visitedNode.y) {
//           return true;
//         }
//       })
//     ) {
//       pathStack.push(elem);
//       unvisited += 1;
//     }
//   }
//   /*  if (unvisited === 0) {
//     pathStack.pop();
//   } */
// }

/*   pathTest(origin, target) {
    let pathStack = [{ x: origin.x, y: this.y, visited: false }];
    let visitedNodes = [];
    let path = [];
    while (true) {
      let currentStep = pathStack.shift();
      path.push(currentStep);
      currentStep.visitied = true;
      visitedNodes.push(currentStep);

      if (currentStep.x === target.x && currentStep.y === target.y) {
        return pathStack;
        break;
      }
      this.checkNeighbours(currentStep, visitedNodes, pathStack, target);
    }
  } */

/*   pathFinder(player) {
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
  } */

/*   getCloser(origin, target) {
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
      } /* else if (game.checkDistance(elem, target) === bestOption.distance) {
        let currentStep = getCloser(elem, target);
        let currentBestOption = getCloser(bestOption, target);
        if (currentStep && currentBestOption) {
          if (currentStep.distance < currentBestOption.distance) {
            bestOption = elem;
          }
        }
      } 
    }
    return bestOption;
  }
 */
