import { ctx } from "./util.js";

export class Fire {
    img = new Image();
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.img.src = "./images/fire.png";
        this.img.onload = () => ctx.drawImage(this.img, this.x, this.y, 40, 40);
    }

    draw () {
        this.img.onload();
    }
}