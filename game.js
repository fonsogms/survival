class Game {
  constructor() {
    this.obstacles = [];
    this.coordinates = [];
    this.zombies = [];
    this.entrances = [
      { x: -100, y: 0 },
      { x: 1000, y: 900 },
      { x: 0, y: 1000 },
      { x: 900, y: -100 }
    ];
    this.deathsCounter = 0;
    this.fireBalls = [];
    this.players = [];
    this.start = false;
    this.pause = false;
  }
  preload() {
    declareResources(this);
    this.fireBallImage = loadImage("./assets/fireBall.png");
    this.earthImg = loadImage("./assets/Tierra.png");
    this.stoneImg = loadImage("./assets/piedra.png");

    for (let i = 1; i <= 3; i++) {
      this[`zombie${i}Imgs`] = {
        N: this[`zombie${i}N`],
        S: this[`zombie${i}S`],
        W: this[`zombie${i}W`],
        E: this[`zombie${i}E`]
      };
    }
    console.log(this);
    this.player1 = new Player(0, 0);
    this.player2 = new Player(300, 200);
    this.players.push(this.player1);
    // this.players.push(this.player2);

    this.obstacles.push(
      new Obstacle(100, 200),
      new Obstacle(200, 400),
      new Obstacle(300, 400),
      new Obstacle(400, 400),

      new Obstacle(600, 500),
      new Obstacle(900, 500),
      new Obstacle(700, 600),
      new Obstacle(100, 0)
    );

    //this.zombies.push(new Zombie(900, 900), new Zombie(0, 900));
    this.players[0].preload();
    //this.players[1].preload();
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

    //occupying the first places
    /*     this.coordinates.forEach(elem => {
      if (
        (elem.x === this.player.x && elem.y === this.player.y) ||
        (elem.x === this.players[1].x && elem.y === this.players[1].y)
      ) {
        elem.occupied = true;
      }
    }); */

    this.coordinates.forEach(elem => {
      if (elem.occupied) {
        // fill("blue");
        // rect(elem.x, elem.y, 100, 100);
      } else {
        image(this.earthImg, elem.x, elem.y, 100, 100);
      }
    });
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
  showPlayersHealth() {
    this.players.forEach((player, index) => {
      fill("blue");
      textSize(20);
      // rect(100, player.health, player.x, player.y);
      rect(player.x, player.y, player.health, 10);
      text(`Player${index + 1}: `, player.x + 18, player.y - 10);
    });
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
      for (let zombie of this.zombies) {
        if (zombie.x === step.x && zombie.y === step.y) {
          continue;
        }
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
  checkCollision(a, b, c) {
    return a.y + c < b.y || a.y > b.y + c || a.x + c < b.x || a.x > b.x + c;
  }
  uded() {
    textSize(70);
    text("U DED", 400, 400);
    fill(0, 102, 153);
    text("Bruh", 400, 500);
  }
  createZombie(zombie) {
    let random = Math.floor(Math.random() * this.entrances.length);
    let randomEntance = this.entrances[random];
    this.zombies.push(new zombie(...Object.values(randomEntance)));
  }
  zombiesEating() {
    if (frameCount % 60 === 0) {
      for (let player of this.players) {
        for (let zombie of this.zombies) {
          if (this.checkDistance(zombie, player) <= 100) {
            player.health -= zombie.damage;
            console.log(player.health);
            if (player.health <= 0) {
              this.removeFromArray(this.players, player);
              /* this.uded();
              noLoop(); */
            }
          }
        }
      }
    }
  }
  draw() {
    // draw obstacles
    // frameRate(300);
    this.fireBalls = [];
    frameRate(30);

    this.coordinates.forEach(elem => {
      image(this.earthImg, elem.x, elem.y, 100, 100);

      if (elem.occupied) {
        // fill("blue");
        image(game.stoneImg, this.x, this.y, 100, 100);
      }
    });
    this.players.forEach((player, index) => {
      this.fireBalls.push(...player.fireBalls);
      player.draw();
    });

    //Create random zombies in especified places
    if (this.deathsCounter < 5) {
      if (frameCount % 200 === 0) {
        /*  let zombies = [Zombie, Zombie2, Zombie3];
        this.createZombie(zombies[Math.floor(Math.random() * 3)]); */
        this.createZombie(Zombie);
      }
    } else if (this.deathsCounter < 10) {
      if (frameCount % 180 === 0) {
        this.createZombie(Zombie);
      }
    } else if (this.deathsCounter < 15) {
      if (frameCount % 200 === 0) {
        this.createZombie(Zombie);
        this.createZombie(Zombie);
      }
    } else if (this.deathsCounter < 30) {
      if (frameCount % 200 === 0) {
        let zombies = [Zombie, Zombie2, Zombie3];
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(Zombie);
      }
    } else if (this.deathsCounter < 60) {
      if (frameCount % 200 === 0) {
        let zombies = [Zombie, Zombie2, Zombie3];
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
      }
    } else if (this.deathsCounter < 120) {
      if (frameCount % 160 === 0) {
        let zombies = [Zombie, Zombie2, Zombie3];
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
      }
    } else {
      if (frameCount % 130 === 0) {
        let zombies = [Zombie, Zombie2, Zombie3];

        this.createZombie(zombies[Math.floor(Math.random() * 3)]);

        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
      }
    }

    //manage zombies death and fireballs disappearance
    for (let fireBall of this.fireBalls) {
      for (let player of this.players) {
        if (this.checkCoordinates(fireBall)) {
          this.removeFromArray(player.fireBalls, fireBall);
        }

        for (let zombie of this.zombies) {
          if (!this.checkCollision(fireBall, zombie, 80)) {
            this.removeFromArray(player.fireBalls, fireBall);
            zombie.health -= fireBall.damage;
            if (zombie.health <= 0) {
              zombie.occupySpots(zombie);
              this.removeFromArray(this.zombies, zombie);
              this.deathsCounter++;
            }
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

    this.zombiesEating();
    this.showPlayersHealth();
    textSize(40);
    fill("red");
    text(`Zombies killed: ${this.deathsCounter}`, 600, 50);
  }
}
