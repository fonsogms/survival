class Game {
  constructor() {
    this.obstacles = [];
    this.coordinates = [];
    this.zombies = [];
    this.entrances = [
      { x: -square_side, y: 0 },
      { x: WIDTH + square_side, y: HEIGHT },
      { x: 0, y: HEIGHT + square_side },
      { x: WIDTH, y: -square_side }
    ];
    this.deathsCounter = 0;
    this.fireBalls = [];
    this.players = [];
    this.start = false;
    this.pause = false;
    this.turrets = [];
    this.defensable = [];
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
    for (let i = 1; i < WIDTH / square_side - 1; i++) {
      this.obstacles.push(new Obstacle(square_side * i, square_side));
    }
    for (let i = 1; i < WIDTH / square_side - 1; i++) {
      this.obstacles.push(new Obstacle(square_side * i, WIDTH - square_side));
    }

    for (let i = 1; i <= 4; i++) {
      this.obstacles.push(new Obstacle(square_side * i, square_side * 8));
      this.obstacles.push(
        new Obstacle(square_side * 1, square_side * (3 + i === 6 ? 7 : 3 + i))
      );
      this.obstacles.push(
        new Obstacle(square_side * 4, square_side * (3 + i === 5 ? 6 : 3 + i))
      );
      this.obstacles.push(new Obstacle(square_side * 7, square_side * (i + 3)));
      this.obstacles.push(
        new Obstacle(square_side * 10, square_side * (i + 3))
      );

      if (i !== 3) {
        this.obstacles.push(new Obstacle(square_side * i, square_side * 3));
        this.obstacles.push(
          new Obstacle(square_side * (6 + i), square_side * 3)
        );
      }
    }

    this.players[0].preload();
    //this.players[1].preload();
    console.log("preload");
  }
  drawGrid() {
    for (let i = 0; i <= width; i += square_side) {
      //grid creation
      line(0, i, width, i);
      line(i, 0, i, height);
    }
  }
  setup() {
    for (let i = 0; i <= width; i += square_side) {
      //grid creation

      for (let j = 0; j <= height; j += square_side) {
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
        image(this.earthImg, elem.x, elem.y, square_side, square_side);
      }
    });
  }

  // check if its and occupied spot
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
      rect(
        player.x,
        player.y,
        (square_side * player.health) / 100,
        square_side / 10
      );
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
    for (let i = square_side; i >= -square_side; i -= square_side * 2) {
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
    for (let j = square_side; j >= -square_side; j -= square_side * 2) {
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
          if (this.checkDistance(zombie, player) <= square_side) {
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
    // this.fireBalls = [];
    frameRate(30);

    this.coordinates.forEach(elem => {
      if (!elem.occupied) {
        image(this.earthImg, elem.x, elem.y, square_side, square_side);
      }
    });
    this.players.forEach((player, index) => {
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
      fireBall.draw();
      for (let player of this.players) {
        if (this.checkCoordinates(fireBall)) {
          this.removeFromArray(this.fireBalls, fireBall);
        }

        for (let zombie of this.zombies) {
          if (!this.checkCollision(fireBall, zombie, square_side / 2)) {
            this.removeFromArray(this.fireBalls, fireBall);
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
    this.turrets.forEach(elem => {
      elem.draw();
    });

    this.zombiesEating();
    this.showPlayersHealth();
    textSize(width / 40);
    fill("red");
    text(
      `Zombies killed: ${this.deathsCounter}`,
      width - width / 4,
      square_side / 2
    );
  }
}
