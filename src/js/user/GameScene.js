"use strict";
var user = (function (user) {
    const Utils = user.Utils;
    const ARROW_ORDER = ['left', 'up', 'right', 'down'];
    const getArrowKey = (keyCode) => {
        if (keyCode.inRange(37, 40)) {
            return ARROW_ORDER[keyCode - 37];
        }

        return null;
    };
    const MOVE_SPEED_H = 5;
    const MOVE_SPEED_V = 3;
    const FALLING_DOWN_SPEED = 1;
    const MAX_ASTEROID_COUNT = 10;

    /**
     * 主遊戲畫面
     *
     * @class user.GameScene
     * @extends Framework.Scene
     */
    user.GameScene = class extends Framework.Scene {
        load() {
            this.background = new user.Background();
            this.player = new user.Player();
            this.attach(this.background);
            this.attach(this.player);

            this.arrowKeyHoldStatus = {
                left: false,
                up: false,
                right: false,
                down: false,
            };

            this.gameOver = false;

            this.asteroidCount = 0;
            for (let i = 0; i < 3; i++) {
                Framework.ResourceManager.loadImage({url:`images/asteroid_brown-${i}.png`});
                Framework.ResourceManager.loadImage({url:`images/asteroid_gray-${i}.png`});
            }

        }

        initialize() {
            this.player.position = new Framework.Point(0, 270);
            this.score = 0;
        }

        update() {
            super.update();

            let playerOffsetX = 0, playerOffsetY = 0;
            //TODO: 移動玩家


            this.player.move(playerOffsetX, playerOffsetY);
            
            //TODO: 判斷玩家墜落

            this.asteroidCount = this.attachArray.filter(x => x instanceof user.Asteroid).length;

            while (this.asteroidCount < MAX_ASTEROID_COUNT) {
                this.makeAsteroid();
                this.asteroidCount++;
            }

            /**
             * 所有子彈
             * @type {user.Bullet[]}
             */
            let bullets = this.attachArray.filter(x => x instanceof user.Bullet);

            /**
             * 所有隕石
             * @type {user.Asteroid[]}
             */
            let asteroids = this.attachArray.filter(x => x instanceof user.Asteroid);

            let playerRect = this.player.rect;
            asteroids.forEach(a => {
                let asteroidRect = a.rect;
                //TODO: 判斷隕石被那些子彈打到
                bullets.forEach(b => {

                });

                //TODO: 判斷隕石有沒有打到玩家
                if (Utils.aabb(playerRect, asteroidRect)) {

                }
            });


            if (this.isGameOver()) {
                Framework.Game.goToLevel('over', {score: this.score});
            }
        }

        makeAsteroid() {
            let asteroid = new user.Asteroid();
            asteroid.load();
            asteroid.initialize();
            this.attach(asteroid);
        }

        draw(ctx) {
            super.draw(ctx);

            //TODO: 顯示分數及血量
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            // Hint: 用fillStyle, fillText
        }

        isGameOver() {
            if (!this.gameOver) {
                if (this.player.hp <= 0) {
                    this.gameOver = true;
                    console.log('over');
                }
            }

            return this.gameOver;
        }

        onKeyDown(e) {
            console.log('Down', e.keyCode);
            let arrowState = getArrowKey(e.keyCode);

            //TODO: 設定方向鍵 (按下)

            //TODO: 觸發玩家射擊
        }

        onKeyUp(e) {
            console.log('Up', e.keyCode);
            let arrowState = getArrowKey(e.keyCode);

            //TODO: 設定方向鍵 (離開)
        }

        teardown() {
        }
    };
    return user;
})(user || {});
