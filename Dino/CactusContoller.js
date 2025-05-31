import Cactus from "./Cactus.js";

export default class CactusController {

    cactusIntervalMin = 500;
    cactusIntervalMax = 2000;

    nextCactusInterval = null;
    cacti = [];

    constructor (ctx, cactImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.cactImages = cactImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextCactusTime();
    } 



    getRandomNumber (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    crateCactus () {
        const index = this.getRandomNumber(0, this.cactImages.length - 1);
        const cactImage = this.cactImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - cactImage.height;
        const cactus = new Cactus(this.ctx, x, y, cactImage.width, cactImage.height, cactImage.image);
        this.cacti.push(cactus);
    }

    setNextCactusTime () {
        const num = this.getRandomNumber(this.cactusIntervalMin, this.cactusIntervalMax);

        this.nextCactusInterval = num;        
    }

    update (gameSpeed, frameTimeDelta) {
        if (this.nextCactusInterval <= 0) {
            this.crateCactus();
            this.setNextCactusTime();
        }
        this.nextCactusInterval -= frameTimeDelta;
                
        this.cacti.forEach((cactus) => {
            cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });

        this.cacti = this.cacti.filter((cactus) => cactus.x > - cactus.width);


    }

    draw () {
         this.cacti.forEach((cactus) => cactus.draw());   
    }

    collideWith (sprite) {
        return this.cacti.some(cactus => cactus.collideWith(sprite));
    }

    reset () {
        this.cacti = [];
    }
}