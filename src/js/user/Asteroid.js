"use strict";
var user = (function (user) {
    user.Asteroid = class Asteroid extends Framework.Sprite {
        constructor() {
            let size = (Math.random() * 3) | 0;

            if (Math.random() > 0.5) {
                super(`images/asteroid_brown-${size}.png`);
            } else {
                super(`images/asteroid_gray-${size}.png`);
            }
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
            this.position.x -= this.speed;
            if (this.spriteParent) {
                if (this.position.x + this.width < -100) {
                    this.spriteParent.detach(this);
                }

                if (this.hp <= 0) {
                    this.spriteParent.detach(this);
                    this.audio.play('destroy');
                }
            }
        }

        hurt(damage) {
            this.hp -= damage;
            if (this.hp < 0) this.hp = 0;
            this.audio.play('hit');
        }
    };
    return user;
})(user || {});
