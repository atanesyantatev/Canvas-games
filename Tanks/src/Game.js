import { Enemy } from "./Enemy.js";
import { Tank } from "./Tank.js";
import { canvas, ctx } from "./util.js";

export class Game {
    constructor () {
        this.enemies = [];
        this.bg = new Image();
        this.sound = new Audio();
        this.sound.src = "./audio/fire.mp3";
        this.destroyed = new Audio('./audio/destroyed.mp3');
        this.points = 0;
        this.bg.src = "https://wallpapers.com/images/featured/tanks-background-o9w2k2c33bb29dzo.jpg";
        setInterval(() => {
            this.enemies.push(new Enemy());
            this.enemies.forEach(x => x.shoot());
            this.sound.play();
        }, 3000)
        this.bg.onload = () => ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
        this.id = requestAnimationFrame(() => this.draw());
        this.player = new Tank();

        window.onkeydown = (e) => {
            if (e.key == "ArrowLeft") {
                this.player.moveLeft();
            } else if (e.key == "ArrowRight") {
                this.player.moveRight();
            } else if (e.key == " ") {
                this.player.shoot();
                this.sound.play();
            }
        }
    }

    draw () {
        this.id = requestAnimationFrame(() => this.draw());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bg.onload();
        this.enemies.forEach(x => x.move());
        this.player.move();
        this.player.draw();
        ctx.font = "30px Tahoma";
        ctx.fillText("Score : " + this.points, 30, 50);
        this.checkCollision();
        this.checkDamage();
        this.checkPlayersDamage();
        this.checkFinishLine();
    }

    checkCollision () {
        this.enemies.forEach(enemy => {
            if (Math.abs(this.player.x - enemy.x) < 100 && Math.abs(this.player.y - enemy.y) < 150) {
                enemy.x = Math.max(0, Math.min(canvas.width - 100, Math.ceil(Math.random() * (canvas.width - 100))));
                enemy.y = -130;
            }
        });
    }

    checkDamage () {
        this.enemies.forEach(enemy => {
            enemy.fires.forEach(fire => {
                if (fire.x >= this.player.x && fire.x <= this.player.x + 120) {
                    if (fire.y >= this.player.y && fire.y <= this.player.y + 60) {
                        cancelAnimationFrame(this.id);
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.font = "90px Tahoma";
                        this.player = null;
                        this.enemies = null;
                        return ctx.fillText("Game Over", innerWidth / 3, innerHeight / 2);
                    }
                }
            });
        });
    }

    checkPlayersDamage () {
        this.player.fires.forEach((fire, fireIndex) => {
            this.enemies = this.enemies.filter(enemy => {
                if (Math.abs(enemy.x - fire.x) < 110 && Math.abs(enemy.y - fire.y) < 110) {
                    this.points++;
                    this.destroyed.play();
                    this.player.fires.splice(fireIndex, 1);
                    return false;
                }
                return true;
            });
        });
    }

    checkFinishLine () {
        this.enemies.forEach(enemy => {
            if (enemy.y >= canvas.height) {
                cancelAnimationFrame(this.id);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "90px Arial";
                this.player = null;
                this.enemies = null;
                return ctx.fillText("Game Over", innerWidth / 3, innerHeight / 2);
            }
        });
    }
} 