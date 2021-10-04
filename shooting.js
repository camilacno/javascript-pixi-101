import * as PIXI from 'pixi.js';
import Victor from 'victor';

export default class Shooting {
  constructor({ app, player }) {
    this.app = app;
    this.player = player;

    this.bulletSpeed = 6;
    this.bullets = [];
    this.bulletRadius = 8;
    this.maximumBullets = 10;
  }

  fire() {
    if (this.bullets.length >= this.maximumBullets) {
      let b = this.bullets.shift();
      this.app.stage.removeChild(b);
    }

    this.bullets.forEach((b) => this.app.stage.removeChild(b));
    this.bullets = this.bullets.filter(
      (b) =>
        Math.abs(b.position.x) < this.app.screen.width &&
        Math.abs(b.position.y) < this.app.screen.height
    );
    this.bullets.forEach((b) => this.app.stage.addChild(b));

    const bullet = new PIXI.Graphics();
    bullet.position.set(this.player.position.x, this.player.position.y);
    bullet.beginFill(0x0000ff, 1);
    bullet.drawCircle(0, 0, this.bulletRadius);
    bullet.endFill();

    let angle = this.player.player.rotation - Math.PI / 2;
    bullet.velocity = new Victor(
      Math.cos(angle),
      Math.sin(angle)
    ).multiplyScalar(this.bulletSpeed);

    this.bullets.push(bullet);
    this.app.stage.addChild(bullet);
  }

  set shoot(shooting) {
    if (shooting) {
      this.fire();
      this.interval = setInterval(() => this.fire(), 500);
    } else {
      clearInterval(this.interval);
    }
  }

  update(delta) {
    this.bullets.forEach((bullet) =>
      bullet.position.set(
        bullet.position.x + bullet.velocity.x * delta,
        bullet.position.y + bullet.velocity.y * delta
      )
    );
  }
}
