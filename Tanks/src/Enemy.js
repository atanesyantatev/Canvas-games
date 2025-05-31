import { ctx, canvas } from "./util.js";
import { Fire } from "./Fire.js";

export class Enemy { 
    constructor () {
        this.img = new Image();
        this.img.src = "./images/tank2.png";
        this.sound = new Audio("./audio/fire.mp3");
        this.speed = Math.random() * 2;
        this.x = Math.max(0, Math.min(canvas.width - 100, Math.ceil(Math.random() * (canvas.width - 100))));
        this.y = -130;
        this.fires = [];
        this.img.onload = () => {
            this.draw();
        };
    }

    draw () {
        ctx.drawImage(this.img, this.x, this.y, 100, 150);
        if (this.fires.length != 0) {
            this.fireMovement();
        }
    }

    fireMovement () {
        this.fires.forEach(fire => fire.draw());
        this.fires.forEach(fire => fire.y += 8);
    }

    shoot () {
        let fire = new Fire(this.x + 30, this.y + 130);
        fire.img.src = "./images/fire2.png";
        this.fires.push(fire);
        this.sound.play();
    }

    move () {
        this.y += this.speed;
        this.draw();
    }
}