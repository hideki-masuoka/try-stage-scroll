import {createPlatformsTo, createPlayerTo, gogoPlayerTo} from './lib/gogoplayer.js';
export default class Game extends Phaser.Scene {
    player;
    platforms;
    cursors;

  preload() {
      this.load.image("platform", "assets/platform-c.png");
      this.load.image("ground", "assets/platform-bottom-c.png");
      this.load.spritesheet("alien", "assets/alienYellow_walk.png", {
          frameWidth: 80,
          frameHeight: 100
      });

      this.load.image('bg-sky', 'assets/bg-sky-w.png');
      this.load.image('bg-wood', 'assets/bg-wood.png');
  }

  create() {
      const width = this.scale.width;
      const height = this.scale.height;

      this.add.image(width * 0.5, height * 0.5, 'bg-sky')
          .setScrollFactor(0);

      this.add.image(0, height, 'bg-wood')
          .setOrigin(0,0.75)
          .setScrollFactor(0.25);
      this.add.image(800, height, 'bg-wood')
          .setOrigin(0,0.75)
          .setScrollFactor(0.25);
      this.add.image(800 * 2, height, 'bg-wood')
          .setOrigin(0,0.75)
          .setScrollFactor(0.25);

      this.platforms = this.physics.add.staticGroup();
      createPlatformsTo(this.platforms);

      this.player = this.physics.add.sprite(100, 550, "alien");
      createPlayerTo(this.player, this.anims);

      this.cursors = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(this.player, this.platforms);

      this.cameras.main.setBounds(0, 0, width * 3, height);
      this.cameras.main.startFollow(this.player);
      this.physics.world.setBounds(0, 0, width * 3, height);

  }

  update() {
      gogoPlayerTo(this.player, this.cursors);
  }
}
