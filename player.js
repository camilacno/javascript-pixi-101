import * as PIXI from 'pixi.js';
import Shooting from './shooting';

export default class Player {
  constructor({ app }) {
    this.app = app;

    const playerWidth = 32;
    this.player = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.player.anchor.set(0.5);
    this.player.position.set(app.screen.width / 2, app.screen.height / 2);
    this.player.width = this.player.height = playerWidth;
    this.player.tint = 0xea985d;
    app.stage.addChild(this.player);

    this.lastMouseButton = 0;
    this.shooting = new Shooting({ app, player: this });
    //health bar
    const margin = 16;
    const barHeight = 8;
    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;
    this.healthBar = new PIXI.Graphics();
    this.healthBar.beginFill(0xff0000);
    this.healthBar.initialWidth = app.screen.width - 2 * margin;
    this.healthBar.drawRect(
      margin,
      app.screen.height - barHeight - margin / 2,
      this.healthBar.initialWidth,
      barHeight
    );
    this.healthBar.endFill();
    this.healthBar.zIndex = 1;
    this.app.stage.sortableChildren = true;
    this.app.stage.addChild(this.healthBar);
  }

  attack() {
    this.currentHealth -= 1;
    this.healthBar.width =
      (this.currentHealth / this.maxHealth) * this.healthBar.initialWidth;

    if (this.currentHealth <= 0) {
      this.dead = true;
    }
  }

  get position() {
    return this.player.position;
  }

  get width() {
    return this.player.width;
  }

  update() {
    if (this.dead) return;
    const mouse = this.app.renderer.plugins.interaction.mouse;
    const cursorPosition = mouse.global;
    let angle =
      Math.atan2(
        cursorPosition.y - this.player.position.y,
        cursorPosition.x - this.player.position.x
      ) +
      Math.PI / 2;
    this.player.rotation = angle;

    if (mouse.buttons !== this.lastMouseButton) {
      this.shooting.shoot = mouse.buttons !== 0;
      this.lastMouseButton = mouse.buttons;
    }

    this.shooting.update();
  }
}
