import * as PIXI from 'pixi.js';
import Victor from 'victor';

export default class Zombie {
  constructor({ app, player }) {
    this.app = app;
    this.player = player;

    const radius = 16;
    this.speed = 2;
    this.zombie = new PIXI.Graphics();
    let r = this.randomSpawnPoint();

    this.zombie.position.set(r.x, r.y);
    this.zombie.beginFill(0xff0000, 1);
    this.zombie.drawCircle(0, 0, radius);
    this.zombie.endFill();

    app.stage.addChild(this.zombie);
  }

  get position() {
    return this.zombie.position;
  }

  attackPlayer() {
    if (this.attacking) return;
    this.attacking = true;
    this.interval = setInterval(() => {
      this.player.attack();
    }, 500);
  }

  kill() {
    this.app.stage.removeChild(this.zombie);
    clearInterval(this.interval);
  }

  update() {
    let zombiePosition = new Victor(
      this.zombie.position.x,
      this.zombie.position.y
    );
    let playerPosition = new Victor(
      this.player.position.x,
      this.player.position.y
    );
    if (zombiePosition.distance(playerPosition) < this.player.width / 2) {
      this.attackPlayer();
      return;
    }

    let distance = playerPosition.subtract(zombiePosition);
    let velocity = distance.normalize().multiplyScalar(this.speed);
    this.zombie.position.set(
      this.zombie.position.x + velocity.x,
      this.zombie.position.y + velocity.y
    );
  }

  randomSpawnPoint() {
    let edge = Math.floor(Math.random() * 4); // random int between 0 and 3 inclusive
    let spawnPoint = new Victor(0, 0);
    let canvasSize = this.app.screen.width;

    switch (edge) {
      case 0: // top
        spawnPoint.x = canvasSize * Math.random();
        break;
      case 1: // right
        spawnPoint.x = canvasSize;
        spawnPoint.y = canvasSize * Math.random();
        break;
      case 2: // botttom
        spawnPoint.x = canvasSize * Math.random();
        spawnPoint.y = canvasSize;
        break;
      default:
        //left
        spawnPoint.x = 0;
        spawnPoint.y = canvasSize * Math.random();
        break;
    }
    return spawnPoint;
  }
}
