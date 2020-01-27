class Game {
  constructor() {
    this.obstacles = [];
    this.coordinates = [];
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
      new Obstacle(600, 500)
    );

    this.zombie = new Zombie(600, 700);
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
        this.coordinates.push({ x: i, y: j, occupied: false });
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
    console.log(this.coordinates);
  }
  checkCoordinates(obj) {
    for (let elem of this.coordinates) {
      if (obj.x === elem.x && obj.y === elem.y) {
        if (elem.occupied) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  draw() {
    // draw obstacles
    this.obstacles.forEach(elem => {
      elem.draw();
    });

    this.player.draw();
    this.zombie.draw();
    console.log("hello");
  }
}
