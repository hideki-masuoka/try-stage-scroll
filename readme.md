# コードを書いて横スクロールで移動する画面を作る

この記事は、[CoderDojo Advent Calendar 2022 - Adventar](https://adventar.org/calendars/7381) の17日目の投稿であり、昨年2021年4月に公開した記事、[コードを書いて画面内のキャラクターを動かす](https://zenn.dev/fkumnk/articles/57a9a8d5267bbc) の精神的続編です。

著：[CoderDojo紫雲](https://zen.coderdojo.com/dojos/jp/takamatsu-kagawa-prefecture/shiun-kagawa) 増岡秀樹


## 概要

これは、Webブラウザに表示されているキャラクターをキーボードで操作し、画面内のステージを横スクロールさせるプログラムを書く、練習用のサンプルコードです。

Phaser3 [Phaser - A fast, fun and free open source HTML5 game framework](https://phaser.io/) というWebゲームフレームワークを使用してJavaScriptでオブジェクトを操作するコードを書きます。

内容は、主に各地のCoderDojoに参加しているNinja向けとなっており、時間内でチュートリアルを終え、独自の応用にチャレンジできる程度の分量としています。

また、一部の説明を簡略化するために、プロパティ名などに漢字を含む日本語を使用しています。

## 目標

これを...

![変更前](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/before.webp)

こうして...

![編集中](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/working.webp)

こうじゃ！

![完了](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/complete.webp)


## 準備

CodeSandboxにあるサンプルコードを、Webブラウザで開いて編集します。

【サンプルコード】[focused-water-1y4xor - CodeSandbox](https://codesandbox.io/s/focused-water-1y4xor?file=/src/Game.js)

![CodeSandbox](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/fig-01-jyunbi-a.png)

@[codesandbox](https://codesandbox.io/embed/focused-water-1y4xor?fontsize=14&hidenavigation=1&module=%2Fsrc%2FGame.js&theme=dark)

Game.jsファイルが表示されていることを確認します。

今回は、このGame.jsファイルに書かれているcreate()関数の内容を編集します。

~~~javascript
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

      /*
       * Step.3-b
       * 画面(this)に
       * 空の背景画像を追加(add.image)する
       *
       * Step.3-c
       * 背景の移動量を調整".setScrollFactor"して
       * 空の背景画像が動かないようにする
       */

      /*
       * Step.4
       * 木の背景を追加して奥行きを表現する
       */

      /*
       * Step.4-a
       * 木の背景に渡す情報を定義する
       */

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

      /*
       * Step.4-d
       * 木の背景画像を2枚追加して、
       * 水平に並べる"木の背景.X座標 * 1"
       *
       * Step.4-e
       * 背景の移動量を調整".setScrollFactor"する
       */

      // ここで既存の機能を呼び出しています
      this.前回までのあらすじ();


      /*
       * Step.1
       * メインカメラ"this.cameras.main"が
       * プレイヤー・キャラクター"this.player"を
       * 追いかけるように".startFollow"する
       */

      /*
       * Step.2
       * ステージの境界を設定する
       */

      /*
       * Step.2-a
       * このステージに渡す情報を定義する
       */

      /*
       * Step.2-b
       * メインカメラ"this.cameras.main"の
       * 範囲を設定".setBounds"する
       */

      /*
       * Step.2-c
       * このステージ"this.physics.world"の
       * 境界を設定".setBounds"する
       */

      /*
       * Mission Complete?
       */

  }
~~~


**編集したファイルを保存するには、コントロールキーを押しながらSキーを押す【Ctrl+S】か、メニューバーから【File】を選択して【Save】をクリックします。**

![File Save](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/fig-01-jyunbi-b.png)


**このサンプルコードは自由に編集しても大丈夫です。ページを再読込すると、元の内容に戻ります。**
    
## 今回の任務は...

* Step.1 メインカメラがプレイヤー・キャラクターを追いかけるようにする
* Step.2 ステージの境界を設定する
* Step.3 空の背景を追加する
* Step.4 木の背景を追加して奥行きを表現する
* Step.5 改造タイム

## Step.1 メインカメラがプレイヤー・キャラクターを追いかけるようにする

![Step.1](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/fig-02-step1-a.png)

```javascript
  /*
   * Step.1
   * メインカメラ"this.cameras.main"が
   * プレイヤー・キャラクター"this.player"を
   * 追いかけるように".startFollow"する
   */
   this.cameras.main.startFollow(this.player);
```

### 観察タイム

コードを書いて変化を観察します。

![Step.1実行結果](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/fig-02-step1-b.png)

#### 今回使用した機能は...

> **startFollow**<br>
> ゲームオブジェクトを追跡するようにカメラを設定します。<br>
> [Phaser 3 API Documentation - Class: Camera](https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Scene2D.Camera.html#startFollow__anchor)

## Step.2 ステージの境界を設定する

Step.1 でカメラがプレイヤーを追いかけるようになりました。
しかし、見えない何かに遮られて途中から先に進めません。
Step.2 では、ステージに境界を設定することで、プレイヤーがその境界内を動き回れるようにします。

![Step.2](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/fig-02-step2-a.png)

### Step.2-a このステージに渡す情報を定義する

```javascript
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
```

### Step.2-b メインカメラの範囲を設定する

```javascript
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
```

### Step.2-c このステージの境界を設定する

```javascript
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
```

### 観察タイム

変化を観察します

![Step.2 実行結果](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/fig-02-step2-b.png)

#### 今回使用した機能は...

> **Camera.setBounds**<br>
> カメラの境界を設定します。境界は軸に合わせた長方形です。<br>
> [Phaser 3 API Documentation - Class: Camera](https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Scene2D.Camera.html#setBounds__anchor)

> **World.setBounds**<br>
> 指定されたワールド ピクセル寸法に一致するように物理ワールドの境界を設定します。<br>
> [Phaser 3 API Documentation - Class: World](https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.World.html#setBounds__anchor)

## Step.3 空の背景を追加する

Step.2 ではステージに境界を設定し、プレイヤーがその中を動き回れるようにしました。
このStep.3 では、ステージに背景を設定し疾走感を表現します。

### Step.3-a 空の背景画像に渡す情報を定義する

```javascript
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
```

### Step.3-b 画面に空の背景画像を追加する

```javascript
/*
* Step.3-b
* 画面"this"に
* 空の背景画像を追加"add.image"する
*
* Step.3-c
* 背景の移動量を調整".setScrollFactor"して
* 空の背景画像が動かないようにする
*/
this.add.image(空の背景.X座標, 空の背景.Y座標, 空の背景.画像名);
```

### Step.3-c 背景の移動量を調整して空の背景画像が動かないようにする

```javascript
/*
* Step.3-b
* 画面"this"に
* 空の背景画像を追加"add.image"する
*
* Step.3-c
* 背景の移動量を調整".setScrollFactor"して
* 空の背景画像が動かないようにする
*/
this.add.image(空の背景.X座標, 空の背景.Y座標, 空の背景.画像名)
    .setScrollFactor(空の背景.移動量);
```

コードを追記していくときには、セミコロンやピリオドの位置に注意して記述しましょう。

### 観察タイム

変化を観察します

![Step.3 実行結果](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/fig-02-step3-a.png)

#### 今回使用した機能は...

> **Scene.add.image**<br>
> 新しいイメージ ゲーム オブジェクトを作成し、シーンに追加します。<br>
> [Phaser 3 API Documentation - Class: GameObjectFactory](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectFactory.html#image__anchor)

> **Image.setScrollFactor**<br>
> このゲーム オブジェクトのスクロール係数を設定します。 スクロール係数は、このゲーム オブジェクトに対するカメラの動きの影響を制御します。<br>
> [Phaser 3 API Documentation - Class: Image](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Image.html#setScrollFactor__anchor)


## Step.4 木の背景を追加して奥行きを表現する

Step.3 ではステージに背景を追加し、スクロール時の疾走感を表現しました。
このStep.4では、空の背景とプレイヤーの間に木の背景を追加し、移動量を調整することでステージの奥行きを表現します。

### Step.4-a 木の背景に渡す情報を定義する

```javascript
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
```

### Step.4-b 木の背景を追加する

```javascript
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
this.add.image(木の背景.X座標 * 0, 木の背景.Y座標, 木の背景.画像名);
```

### Step.4-c 木の背景の表示位置を調整する

```javascript
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
    .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整);
```

### Step.4-d 新たに木の背景を追加して水平に並べる

```javascript
/*
* Step.4-d
* 木の背景画像を2枚追加して、
* 水平に並べる"木の背景.X座標 * 1"
*
* Step.4-e
* 背景の移動量を調整".setScrollFactor"する
*/
this.add.image(木の背景.X座標 * 1, 木の背景.Y座標, 木の背景.画像名)
    .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整);

this.add.image(木の背景.X座標 * 2, 木の背景.Y座標, 木の背景.画像名)
    .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整);
```

### Step.4-e 追加した全ての木の背景で移動量の調整を行う

```javascript
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
```
### 観察タイム

変化を観察します

![Step.4 実行結果](https://raw.githubusercontent.com/hideki-masuoka/try-stage-scroll/main/static/fig-02-step4-a.png)

#### 今回使用した機能は...

> **Image.setOrigin**<br>
> このゲーム オブジェクトの原点を設定します。 値は 0 から 1 の範囲で与えられます。<br>
> [Phaser 3 API Documentation - Class: Image](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Image.html#setOrigin__anchor)

> **木の背景.X座標 * 0**<br>
> ここでは、背景を水平に並べるために、X座標を0倍、1倍、2倍としました。


## Step.5 改造タイム

今回書いたコードをおさらいします。

```javascript
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
      X座標: 画面の幅 * 0.5,
      Y座標: 画面の丈 * 0.5,
      画像名: "bg-sky",
      移動量: 0
    };

    /*
     * Step.3-b
     * 画面(this)に
     * 空の背景画像を追加(add.image)する
     *
     * Step.3-c
     * 背景の移動量を調整".setScrollFactor"して
     * 空の背景画像が動かないようにする
     */
    this.add
      .image(空の背景.X座標, 空の背景.Y座標, 空の背景.画像名)
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
      X座標: 800,
      Y座標: 画面の丈,
      画像名: "bg-wood",
      X位置調整: 0,
      Y位置調整: 0.75,
      移動量: 0.25
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
    this.add
      .image(木の背景.X座標 * 0, 木の背景.Y座標, 木の背景.画像名)
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
    this.add
      .image(木の背景.X座標 * 1, 木の背景.Y座標, 木の背景.画像名)
      .setOrigin(木の背景.X位置調整, 木の背景.Y位置調整)
      .setScrollFactor(木の背景.移動量);

    this.add
      .image(木の背景.X座標 * 2, 木の背景.Y座標, 木の背景.画像名)
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
      X座標: 0,
      Y座標: 0,
      幅: 画面の幅 * 3,
      丈: 画面の丈
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
```

ここまでの4つのStepで、ステージの領域を任意の大きさで拡張し、プレイヤーがその中を自由に動き回れるようになりました。

今回の任務はこれで完了です。

思いつく限り、自由に改造してみてください。



**後日ここに参考動画を追加します：12月18日追記**


## What next?

### 参考文献

* [Parallax Scrolling Background in Phaser 3 - YouTube](https://www.youtube.com/watch?v=GwGzFczdpkg)
* [Digitherium - Phaser Platformer Series: 16 Camera Follow](https://digitherium.com/blog/phaser-platformer-series-16-camera-follow/)
* [Kenney • Background Elements Redux](https://www.kenney.nl/assets/background-elements-redux)
* [Kenney • Abstract Platformer](https://www.kenney.nl/assets/abstract-platformer)


### 明日(12月18日)のアドベントカレンダーは...

[CoderDojo Advent Calendar 2022 - Adventar](https://adventar.org/calendars/7381)
