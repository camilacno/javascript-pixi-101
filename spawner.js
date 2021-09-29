export default class Spawner {
  constructor({ create }) {
    this.create = create;

    const spawnInterval = 1000; //milliseconds
    this.maxSpawns = 30;
    this.spawns = [];
    setInterval(() => this.spawn(), spawnInterval);
  }

  spawn() {
    if (this.spawns.length >= this.maxSpawns) return;

    let newZombie = this.create();
    this.spawns.push(newZombie);
  }
}
