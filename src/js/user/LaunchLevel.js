"use strict";
var user = (function (user) {
    /**
     * 遊戲開始
     *
     * @class user.LaunchLevel
     * @extends Framework.Level
     */
    user.LaunchLevel = class extends Framework.Level {
        constructor() {
            super();
        }

        load() {
            this.scene = new user.GameMenu();
            this.rootScene.attach(this.scene);
        }

        update() {
            super.update();
            this.scene.update();
        }

        draw(ctx) {
            super.draw(ctx);
            this.scene.draw(ctx);
        }

        mousemove(e){
            this.scene.onMouseMove(e);
        }

        mouseup(e){
            this.scene.onMouseUp(e);
        }

        receiveExtraDataWhenLevelStart(extraData) {
        }
    };


    return user;
})(user || {});
