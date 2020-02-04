function pathFinder(zombie, player) {
  let path1 = {
    x: zombie.x + 100,
    y: zombie.y,
    path: [{ x: zombie.x + 100, y: zombie.y }]
  };
  let path2 = {
    x: zombie.x - 100,
    y: zombie.y,
    path: [{ x: zombie.x - 100, y: zombie.y }]
  };
  let path3 = {
    x: zombie.x,
    y: zombie.y + 100,
    path: [{ x: zombie.x, y: zombie.y + 100 }]
  };

  let path4 = {
    x: zombie.x,
    y: zombie.y - 100,
    path: [{ x: zombie.x, y: zombie.y - 100 }]
  };
  let possiblePaths = [path1, path2, path3, path4];
  const findPath = (origin, target) => {
    if (origin.x === target.x && origin.y === target.y) {
      //  console.log("target found");
      return origin;
    } else {
      let nextStep = zombie.getCloser(origin, target);
      if (Object.keys(nextStep).length >= 3) {
        //  console.log("starting new loop");

        let foundPath = findPath(nextStep, target);
        console.log("zombie is one path", foundPath);

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
    return zombie.getCloser(zombie, player);
  }
}
