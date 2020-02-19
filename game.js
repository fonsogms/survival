class Game {
  constructor() {
    this.obstacles = [];
    this.coordinates = [];
    this.zombies = [];
  }
  preload() {
    this.fireBallImage = loadImage("./assets/fireBall.png");
    this.zombieImg = loadImage(
      "assets/zombies/Screenshot_2020-01-27_at_11-removebg-preview.png"
    );
    this.player = new Player();
    this.obstacles.push(
      new Obstacle(100, 100),
      new Obstacle(100, 200),
      new Obstacle(200, 300),
      new Obstacle(100, 400),
      new Obstacle(100, 400),
      new Obstacle(500, 400),
      new Obstacle(500, 500),
      new Obstacle(600, 500),
      new Obstacle(900, 500),
      new Obstacle(700, 600),
      new Obstacle(100, 0)
    );

    this.zombies.push(new Zombie(900, 900), new Zombie(0, 900));
    this.player.preload();
    console.log(this.player);
    console.log("preload");
  }
  drawGrid() {
    for (let i = 0; i <= width; i += 100) {
      //grid creation
      line(0, i, width, i);
      line(i, 0, i, height);
    }
  }
  setup() {
    for (let i = 0; i <= width; i += 100) {
      //grid creation

      for (let j = 0; j <= height; j += 100) {
        this.coordinates.push({
          x: i,
          y: j,
          occupied: false,
          f: 0,
          g: 0,
          h: 0
        });
      }
    }
    //checking occupied obstacles
    this.coordinates.forEach(coordinate => {
      this.obstacles.forEach(obstacle => {
        if (obstacle.x === coordinate.x && obstacle.y === coordinate.y) {
          coordinate.occupied = true;
        }
      });
    });
    console.log("setup");
  }
  checkCoordinates(obj) {
    for (let elem of game.coordinates) {
      if (obj.x === elem.x && obj.y === elem.y) {
        if (elem.occupied) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  checkDistance(obj, obj2) {
    let distance = Math.abs(obj.x - obj2.x) + Math.abs(obj.y - obj2.y);
    return distance;
  }
  removeFromArray(arr, elem) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == elem) {
        arr.splice(i, 1);
      }
    }
  }
  getNeighbors(step) {
    let possibleSteps = [];
    for (let i = 100; i >= -100; i -= 200) {
      let coordinate = { x: step.x + i, y: step.y };
      if (
        this.checkCoordinates(coordinate) ||
        coordinate.x >= width ||
        coordinate.x < 0
      ) {
        continue;
      }
      possibleSteps.push(coordinate);
    }
    for (let j = 100; j >= -100; j -= 200) {
      let coordinate = { x: step.x, y: step.y + j };
      if (
        this.checkCoordinates(coordinate) ||
        coordinate.y >= height ||
        coordinate.y < 0
      ) {
        continue;
      }
      possibleSteps.push(coordinate);
    }
    return possibleSteps;
  }
  checkCollision(a, b) {
    return (
      a.y + 100 < b.y || a.y > b.y + 100 || a.x + 100 < b.x || a.x > b.x + 100
    );
  }
  draw() {
    // draw obstacles

    this.player.draw();

    for (let fireBall of this.player.fireBalls) {
      if (this.checkCoordinates(fireBall)) {
        this.removeFromArray(this.player.fireBalls, fireBall);
      }
      for (let zombie of this.zombies) {
        if (!this.checkCollision(fireBall, zombie)) {
          console.log("auch");
          this.removeFromArray(this.player.fireBalls, fireBall);

          zombie.health -= fireBall.damage;
          if (zombie.health <= 0) {
            this.removeFromArray(this.zombies, zombie);
          }
        }
      }
    }

    this.zombies.forEach(elem => {
      elem.draw();
    });
    this.obstacles.forEach(elem => {
      elem.draw();
    });
  }
}
