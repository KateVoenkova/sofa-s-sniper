import {CanvasImage} from "../helpers/CanvasImage.js";
import {random} from "../helpers/functions.js";

class Bottle extends CanvasImage {
    constructor(canvas, img, explosionImg) {
        super(img, 0, 0, 100, 200);
        this.canvas = canvas;
        this.explosionImg = explosionImg;
        this.exploding = false;
        this.explosionFrame = 0;

        let x = random(0, canvas.width);
        let y = random(0, canvas.height);
        this.moveTo(x, y);

        this.state = 'alive';
        setTimeout(() => this.kill(), 3000);
    }

    kill() {
        this.state = 'killed';
        this.exploding = true;
    }

    isAlive() {
        return this.state === 'alive' || this.exploding;
    }

    draw(ctx) {
        if (this.exploding) {
            // Анимация взрыва
            ctx.drawImage(this.explosionImg, this.x, this.y, this.width, this.height);
            this.explosionFrame++;
            if (this.explosionFrame > 10) this.exploding = false;
        } else {
            super.draw(ctx);
        }
    }
}

export {Bottle};
