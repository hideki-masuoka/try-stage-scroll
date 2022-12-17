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
      const 画面の幅 = this.scale.width;
      const 画面の丈 = this.scale.height;

      /*
       * 画面(this)に空の背景画像を追加(add.image)する
       * 背景の移動量を調整する
       */
      const 空の背景 = {
          "X座標": 画面の幅 * 0.5,
          "Y座標": 画面の丈 * 0.5,
          "画像名": 'bg-sky',
          "移動量": 0
      };
      this.add.image(空の背景.X座標, 空の背景.Y座標, 空の背景.画像名)
          .setScrollFactor(空の背景.移動量);

      /*
       * 画面(this)に木の背景画像を追加(add.image)する
       * 背景の表示位置を調整する
       * 背景を追加する
       * 背景の移動量を調整する
       */
      const 木の背景 = {
          "X座標": 800,
          "Y座標": 画面の丈,
          "画像名": 'bg-wood',
          "X位置調整": 0,
          "Y位置調整": 0.75,
          "移動量": 0.25
      };
      this.add.image(木の背景.X座標 * 0, 木の背景.Y座標, 木の背景.画像名)
          .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
          .setScrollFactor(木の背景.移動量);

      // 2枚目と3枚目の画像を追加する
      this.add.image(木の背景.X座標 * 1, 木の背景.Y座標, 木の背景.画像名)
          .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
          .setScrollFactor(木の背景.移動量);
      this.add.image(木の背景.X座標 * 2, 木の背景.Y座標, 木の背景.画像名)
          .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
          .setScrollFactor(木の背景.移動量);

      // ここで既存の機能を呼び出す
      this.前回までのあらすじ();

      /*
       * このステージにカメラを追加して横にスクロールさせる
       */
      const このステージ = {
          "X座標": 0,
          "Y座標": 0,
          "幅": 画面の幅 * 3,
          "丈": 画面の丈
      };
      // メインカメラの範囲を設定する
      this.cameras.main.setBounds(
          このステージ.X座標,
          このステージ.Y座標,
          このステージ.幅,
          このステージ.丈
      );
      // メインカメラがプレイヤー・キャラクターを追いかけるようにする
      this.cameras.main.startFollow(this.player);
      // このステージの境界を設定する
      this.physics.world.setBounds(
          このステージ.X座標,
          このステージ.Y座標,
          このステージ.幅,
          このステージ.丈
      );

  }

  update() {
      gogoPlayerTo(this.player, this.cursors);
  }

    前回までのあらすじ() {
        // 足場の追加
        this.platforms = this.physics.add.staticGroup();
        createPlatformsTo(this.platforms);

        // プレイヤー・キャラクターの追加
        this.player = this.physics.add.sprite(100, 550, "alien");
        createPlayerTo(this.player, this.anims);

        // 操作と衝突判定の追加
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms);
    }
}
