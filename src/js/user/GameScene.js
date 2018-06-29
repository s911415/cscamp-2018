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
                Framework.ResourceManager.loadImage(`images/asteroid_brown-${i}.png`);
                Framework.ResourceManager.loadImage(`images/asteroid_gray-${i}.png`);
            }

        }

        initialize() {
            this.player.position = new Framework.Point(0, 270);
            this.score = 0;
        }

        update() {
            super.update();

            let playerOffsetX = 0, playerOffsetY = 0;
            if (this.arrowKeyHoldStatus.left) playerOffsetX -= MOVE_SPEED_H;
            if (this.arrowKeyHoldStatus.right) playerOffsetX += MOVE_SPEED_H;
            if (this.arrowKeyHoldStatus.up) playerOffsetY -= MOVE_SPEED_V;
            if (this.arrowKeyHoldStatus.down) playerOffsetY += MOVE_SPEED_V;
            playerOffsetY += FALLING_DOWN_SPEED;

            this.player.move(playerOffsetX, playerOffsetY);

            if (this.player.position.y >= Framework.Config.canvasHeight - 50) {
                this.player.hurt(100);
            }

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
                bullets.forEach(b => {
                    if (!b.used && Utils.aabb(b.rect, asteroidRect)) {
                        a.hurt((30 * Math.random()) | 0);
                        if (a.hp <= 0)
                            this.score += 10;
                        b.used = true;
                        this.detach(b);
                    }
                });

                if (Utils.aabb(playerRect, asteroidRect)) {
                    this.player.hurt(5 * (3 - a.size));
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

            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillStyle = '#FFF';
            ctx.font = '20px Arial';
            ctx.fillText(`HP: ${this.player.hp.toString().padStart(3, ' ')} / 100; Score: ${this.score}`, 10, 10);
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

        gameOver() {

        }

        onKeyDown(e) {
            console.log('Down', e.keyCode);
            let arrowState = getArrowKey(e.keyCode);

            if (arrowState !== null)
                this.arrowKeyHoldStatus[arrowState] = true;

            if (e.keyCode === 32) { // Space
                this.player.shoot();
            }
        }

        onKeyUp(e) {
            console.log('Up', e);
            let arrowState = getArrowKey(e.keyCode);

            if (arrowState !== null)
                this.arrowKeyHoldStatus[arrowState] = false;
        }

        teardown() {
        }
    };
    return user;
})(user || {});
