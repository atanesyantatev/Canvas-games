import { canvas, ctx } from "./util.js";
import {Fire} from "./Fire.js";

export class Tank {
    fires = [];
    constructor () {
        this.img = new Image();
        this.img.src = "./images/tank.png";
        this.x = 350;
        this.y = 500;
        this.w = 120;
        this.h = 150;
        this.img.onload = () => ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    draw () {
        this.img.onload();
        if (this.fires.length != 0) {
            this.fireMovement();
        }
        ctx.strokeStyle = "white";
    }

    fireMovement () {
        this.fires.forEach(x => x.draw());
        this.fires.forEach(x => x.y -= 8);
    }

    shoot () {
        this.fires.push(new Fire(this.x + 42, this.y - 30));
    }

    move () {
        this.draw();
    }

    moveLeft () {
        if (this.x > canvas.height - innerHeight) {
            this.x -= 10;
        }
    }

    moveRight () {
        if (this.x < innerWidth - this.y + 250) {
            this.x += 10;
        }
    } 
}