class Zombie2 extends Zombie {
  constructor(x, y) {
    super(x, y);
    this.imgs = game.zombie2Imgs;
    this.img = this.imgs.S[0];

    this.health = 300;
    this.speed = 270;
    this.damage = 60;
  }
}
