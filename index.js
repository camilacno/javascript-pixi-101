import * as PIXI from 'pixi.js';
import Player from './player.js';
import Spawner from './spawner.js';
import Zombie from './zombie.js';

const canvasSize = 512;
const canvas = document.getElementById('mycanvas');
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x5c812f,
});

let player = new Player({ app });
let zSpawnwe = new Spawner({ create: () => new Zombie({ app, player }) });

app.ticker.add((delta) => {
  player.update();
  zSpawnwe.spawns.forEach((zombie) => zombie.update());
});
