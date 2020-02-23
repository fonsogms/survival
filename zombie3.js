class Zombie3 extends Zombie {
  constructor(x, y) {
    super(x, y);
    this.imgs = game.zombie3Imgs;
    this.img = this.imgs.S[0];

    this.health = 200;
    this.damage = 20;
    this.speed = 280;
  }
}
