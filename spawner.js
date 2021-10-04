export default class Spawner {
  constructor({ app, create }) {
    this.app = app;
    const spawnInterval = 1000; //milliseconds
    this.maxSpawns = 3;
    this.create = create;
    this.spawns = [];
    setInterval(() => this.spawn(), spawnInterval);
  }

  spawn() {
    if (this.app.gameStarted === false) return;

    if (this.spawns.length >= this.maxSpawns) return;

    let newZombie = this.create();
    this.spawns.push(newZombie);
  }
}
