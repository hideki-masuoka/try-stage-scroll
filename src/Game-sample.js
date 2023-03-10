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
      // 画面の幅と丈を取得しています
      const 画面の幅 = this.scale.width;
      const 画面の丈 = this.scale.height;

      /*
       * 今回の任務は...
       *
       * Step.1 メインカメラがプレイヤー・キャラクターを追いかけるようにする
       * Step.2 ステージの境界を設定する
       * Step.3 空の背景を追加する
       * Step.4 木の背景を追加して奥行きを表現する
       *
       * Mission Start!
       *
       */

      /*
       * Step.3
       * 空の背景を追加する
       */

      /*
       * Step.3-a
       * 空の背景画像に渡す情報を定義する
       */
      const 空の背景 = {
          "X座標": 画面の幅 * 0.5,
          "Y座標": 画面の丈 * 0.5,
          "画像名": 'bg-sky',
          "移動量": 0
      };

      /*
       * Step.3-b
       * 画面"this""に
       * 空の背景画像を追加"add.image""する
       *
       * Step.3-c
       * 背景の移動量を調整".setScrollFactor"して
       * 空の背景画像が動かないようにする
       */
      this.add.image(空の背景.X座標, 空の背景.Y座標, 空の背景.画像名)
          .setScrollFactor(空の背景.移動量);

      /*
       * Step.4
       * 木の背景を追加して奥行きを表現する
       */

      /*
       * Step.4-a
       * 木の背景に渡す情報を定義する
       */
      const 木の背景 = {
          "X座標": 800,
          "Y座標": 画面の丈,
          "画像名": 'bg-wood',
          "X位置調整": 0,
          "Y位置調整": 0.75,
          "移動量": 0.25
      };

      /*
       * Step.4-b
       * 画面"this"に
       * 木の背景画像を追加"add.image"する
       *
       * Step.4-c
       * 背景の表示位置を調整".setOrigin"する
       *
       * Step.4-e
       * 背景の移動量を調整".setScrollFactor"する
       */
      this.add.image(木の背景.X座標 * 0, 木の背景.Y座標, 木の背景.画像名)
          .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
          .setScrollFactor(木の背景.移動量);

      /*
       * Step.4-d
       * 木の背景画像を2枚追加して、
       * 水平に並べる"木の背景.X座標 * 1"
       *
       * Step.4-e
       * 背景の移動量を調整".setScrollFactor"する
       */
      this.add.image(木の背景.X座標 * 1, 木の背景.Y座標, 木の背景.画像名)
          .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
          .setScrollFactor(木の背景.移動量);

      this.add.image(木の背景.X座標 * 2, 木の背景.Y座標, 木の背景.画像名)
          .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
          .setScrollFactor(木の背景.移動量);

      // ここで既存の機能を呼び出しています
      this.前回までのあらすじ();


      /*
       * Step.1
       * メインカメラ"this.cameras.main"が
       * プレイヤー・キャラクター"this.player"を
       * 追いかけるように".startFollow"する
       */
      this.cameras.main.startFollow(this.player);

      /*
       * Step.2
       * ステージの境界を設定する
       */

      /*
       * Step.2-a
       * このステージに渡す情報を定義する
       */
      const このステージ = {
          "X座標": 0,
          "Y座標": 0,
          "幅": 画面の幅 * 3,
          "丈": 画面の丈
      };

      /*
       * Step.2-b
       * メインカメラ"this.cameras.main"の
       * 範囲を設定".setBounds"する
       */
      this.cameras.main.setBounds(
          このステージ.X座標,
          このステージ.Y座標,
          このステージ.幅,
          このステージ.丈
      );

      /*
       * Step.2-c
       * このステージ"this.physics.world"の
       * 境界を設定".setBounds"する
       */
      this.physics.world.setBounds(
          このステージ.X座標,
          このステージ.Y座標,
          このステージ.幅,
          このステージ.丈
      );

      /*
       * Mission Complete?
       */

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
