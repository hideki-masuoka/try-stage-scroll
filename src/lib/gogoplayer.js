export const createPlatformsTo = (pf) => {
    const width = 1280;
    pf.create(800, 500, "platform");
    pf.create(250, 350, "platform");
    pf.create(950, 320, "platform");
    pf.create(width * 0.5, 720 - 32, 'ground');
    pf.create(width * 1.5, 720 - 32, 'ground');
    pf.create(width * 2.5, 720 - 32, 'ground');

}

export const createPlayerTo = (p, a) => {
    p.setBounce(0.2);
    p.setCollideWorldBounds(true);
    p.setOrigin(.8, .8);

    a.create({
        key: "left",
        frames: a.generateFrameNumbers("alien", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    a.create({
        key: "turn",
        frames: [{ key: "alien", frame: 4 }],
        frameRate: 20
    });

    a.create({
        key: "right",
        frames: a.generateFrameNumbers("alien", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

}

export const gogoPlayerTo = (p, c) => {
    const speed = {
        "move": 320,
        "jump": 330
    };

    // 1.もしカーソルキーの左が押されたら
    if (c.left.isDown)
    {
	      // 1.1. プレイヤーが移動するためにX座標への速度を減らしたい
	      p.setVelocityX(- speed.move);
	      // 1.2. プレイヤーが左に歩くアニメーションを付けたい
	      p.anims.play('left', true);
    }
    // 2. もし左ではなくカーソルキーの右が押されたら
    else if (c.right.isDown)
    {
	      // 2.1. プレイヤーが移動するためにX座標への速度を増やしたい
	      p.setVelocityX(speed.move);
	      // 2.2. プレイヤーが右に歩くアニメーションを付けたい
	      p.anims.play('right', true);
    }
    // 3. 何も押されていないときには
    else
    {
	      // 3.1. プレイヤーが停止するためにX座標への速度を無くしたい
	      p.setVelocityX(0);
	      // 3.2. プレイヤーが止まるアニメーションを付けたい
	      p.anims.play('turn');
    }

    // 4. もしカーソルキーの上が押されたとき、プレイヤーが地面にいるなら
    if (c.up.isDown && p.body.touching.down)
    {
	      // 4.1. プレイヤーがジャンプするために、Y座標への速度を減らしたい
	      p.setVelocityY(- speed.jump);
    }
    if (c.space.isDown && p.body.touching.down)
    {
	      // 4.1. プレイヤーがジャンプするために、Y座標への速度を減らしたい
	      p.setVelocityY(- speed.jump);
    }

}
