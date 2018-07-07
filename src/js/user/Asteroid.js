"use strict";
var user = (function (user) {
    /**
     * 隕石
     *
     * @class user.Asteroid
     * @extends Framework.Sprite
     */
    user.Asteroid = class Asteroid extends Framework.Sprite {
        constructor() {
            //TODO: 設定隕石大小, 圖片
            let size = 0; //TODO: 設定隕石大小
            super("images/asteroid_brown-0.png");  //TODO: 設定隕石圖片

            this.size = size;

            this.audio = new Framework.Audio({
                hit: 'audio/hit.m4a',
                destroy: 'audio/destroy.m4a',
            });
        }

        initialize() {
            this.position.x = Framework.Config.canvasWidth;
            this.position.y = (Math.random() * Framework.Config.canvasHeight) | 0;
            this.speed = (3 - this.size) * 2;
            this.hp = 50;
        }

        load() {

        }

        update() {
            //TODO: 移動隕石、判斷HP、是否超出界線
        }

        hurt(damage) {
            this.hp -= damage;
            if (this.hp < 0) this.hp = 0;
            this.audio.play('hit');
        }
    };
    return user;
})(user || {});
