class Game {
  constructor() {
    this.obstacles = [];
    this.coordinates = [];
    this.zombies = [];
    this.entrances = [
      { x: 0, y: -square_side },
      { x: WIDTH, y: HEIGHT },
      { x: 0, y: HEIGHT },
      { x: WIDTH, y: 0 },
    ];
    this.deathsCounter = 0;
    this.fireBalls = [];
    this.players = [];
    this.start = false;
    this.pause = false;
    this.turrets = [];
    this.defensables = [];
    this.hearts = [];
    this.bombs = [];
    this.turretReload = [];
    this.laserGuns = [];
    this.turretsItem = [];
    this.finished = false;
  }
  preload() {
    declareResources(this);

    for (let i = 1; i <= 3; i++) {
      this[`zombie${i}Imgs`] = {
        N: this[`zombie${i}N`],
        S: this[`zombie${i}S`],
        W: this[`zombie${i}W`],
        E: this[`zombie${i}E`],
      };
    }
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
          h: 0,
        });
      }
    }

    //checking occupied obstacles
    this.coordinates.forEach((coordinate) => {
      this.obstacles.forEach((obstacle) => {
        if (obstacle.x === coordinate.x && obstacle.y === coordinate.y) {
          coordinate.occupied = true;
        }
      });
    });

    //occupying the first places
    /*     this.coordinates.forEach(elem => {
      if (
        (elem.x === this.player.x && elem.y === this.player.y) ||
        (elem.x === this.players[1].x && elem.y === this.players[1].y)
      ) {
        elem.occupied = true;
      }
    }); */

    this.coordinates.forEach((elem) => {
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
      textSize();
      // rect(100, player.health, player.x, player.y);
      rect(
        player.x,
        player.y,
        (square_side * player.health) / 100,
        square_side / 10
      );
      text(`Player ${index + 1}`, player.x, player.y - 10);
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
      for (let defensive of this.defensables) {
        for (let zombie of this.zombies) {
          if (this.checkDistance(zombie, defensive) <= square_side) {
            defensive.health -= zombie.damage;
            if (defensive.health <= 0) {
              this.removeFromArray(this.players, defensive);
              this.removeFromArray(this.turrets, defensive);
              /* this.uded();

            
              noLoop(); */
              if (!this.players.length) {
                fill("black");
                rect(0, 0, width, height);
                fill("red");

                textSize(20);
                text(
                  "GAME OVER PRESS SPACE TO RESTART",
                  width / 4.5,
                  height / 2
                );
                this.finished = true;
                noLoop();
              }
            }
          }
        }
      }
    }
  }

  createRandomNumbers() {
    let randomX;
    let randomY;

    while (true) {
      randomX = square_side * Math.floor(Math.random() * (WIDTH / square_side));
      randomY =
        square_side * Math.floor(Math.random() * (HEIGHT / square_side));
      if (!this.checkCoordinates({ x: randomX, y: randomY })) {
        break;
      }
    }
    return [randomX, randomY];
  }
  randomAppearence(itemArray, timeFrame, itemClass) {
    let secondTime = frameCount - 200;
    if (secondTime % timeFrame === 0) {
      if (itemArray.length > 0) {
        itemArray.pop();
      }
    }
    if (frameCount % timeFrame === 0) {
      let randomNumbers = this.createRandomNumbers();
      itemArray.push(new itemClass(...randomNumbers));
    }
  }
  randomHeart() {
    this.randomAppearence(this.hearts, 1500, Heart);
  }

  randomBomb() {
    this.randomAppearence(this.bombs, 5000, Bomb);
  }
  randomTurret() {
    this.randomAppearence(this.turretsItem, 2100, TurretReload);
  }
  randomLaserGun() {
    this.randomAppearence(this.laserGuns, 1800, LaserGun);
  }
  randomZombies() {
    if (this.deathsCounter < 5) {
      if (frameCount % 150 === 0) {
        /*  let zombies = [Zombie, Zombie2, Zombie3];
      this.createZombie(zombies[Math.floor(Math.random() * 3)]); */
        this.createZombie(Zombie);
      }
    } else if (this.deathsCounter < 10) {
      if (frameCount % 140 === 0) {
        this.createZombie(Zombie);
      }
    } else if (this.deathsCounter < 15) {
      if (frameCount % 150 === 0) {
        this.createZombie(Zombie);
        this.createZombie(Zombie);
      }
    } else if (this.deathsCounter < 30) {
      if (frameCount % 150 === 0) {
        let zombies = [Zombie, Zombie2, Zombie3];
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(Zombie);
      }
    } else if (this.deathsCounter < 60) {
      if (frameCount % 150 === 0) {
        let zombies = [Zombie, Zombie2, Zombie3];
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
      }
    } else if (this.deathsCounter < 120) {
      if (frameCount % 140 === 0) {
        let zombies = [Zombie, Zombie2, Zombie3];
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
      }
    } else {
      if (frameCount % 100 === 0) {
        let zombies = [Zombie, Zombie2, Zombie3];

        this.createZombie(zombies[Math.floor(Math.random() * 3)]);

        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
        this.createZombie(zombies[Math.floor(Math.random() * 3)]);
      }
    }
  }
  playersIteration() {
    this.players.forEach((player, index) => {
      player.draw();
      if (this.hearts[0] && !this.checkCollision(this.hearts[0], player, 0)) {
        this.hearts.pop();
        player.health = 100;
      }
      if (this.bombs[0] && !this.checkCollision(this.bombs[0], player, 0)) {
        this.bombs.pop();

        for (let i = this.zombies.length - 1; i >= 0; i--) {
          let zombie = this.zombies[i];
          zombie.occupySpots(zombie);
          this.removeFromArray(this.zombies, zombie);
          this.deathsCounter++;
        }
      }
      if (
        this.turretsItem[0] &&
        !this.checkCollision(this.turretsItem[0], player, 0)
      ) {
        this.turretsItem.pop();
        player.turrets += 1;
      }
      if (
        this.laserGuns[0] &&
        !this.checkCollision(this.laserGuns[0], player, 0)
      ) {
        this.laserGuns.pop();
        player.laser = true;
        setTimeout(function () {
          player.laser = false;
        }, 30000);
      }
    });
  }

  shooting() {
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
  }
  draw() {
    if (game.finished) {
    }
    this.defensables = [...this.players, ...this.turrets];
    frameRate(30);

    this.coordinates.forEach((elem) => {
      if (!elem.occupied) {
        image(this.earthImg, elem.x, elem.y, square_side, square_side);
      }
    });

    //Create random zombies in especified places
    this.randomZombies();
    //manage zombies death and fireballs disappearance
    this.shooting();
    //Random items creation
    this.randomHeart();
    this.randomBomb();
    this.randomTurret();
    this.randomLaserGun();

    //Drawing of zombies
    this.zombies.forEach((elem) => {
      elem.draw();
    });

    //DRAWING OF THE ITEMS AND OTHER ELEMENTS
    this.hearts.forEach((elem) => {
      image(
        this.heart,
        elem.x + square_side / 4,
        elem.y + square_side / 4,
        square_side / 2,
        square_side / 2
      );
    });
    this.bombs.forEach((elem) => {
      image(this.bomb, elem.x, elem.y, square_side, square_side);
    });
    this.turretsItem.forEach((elem) => {
      image(this.turretImgs.W, elem.x, elem.y, square_side, square_side);
    });
    this.obstacles.forEach((elem) => {
      elem.draw();
    });

    this.turrets.forEach((elem) => {
      elem.draw();
    });
    this.laserGuns.forEach((elem) => {
      image(this.laserGun, elem.x, elem.y, square_side, square_side);
    });

    this.playersIteration();
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
