export default class Player {

    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    dinoRunImages = [];

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    jumpSpeed = 0.6;
    gravity = 0.4;

    constructor (ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
        this.yStandingPosition = this.y;

        this.standigStillImage = new Image();
        this.standigStillImage.src = "./images/dino.png";
        this.image = this.standigStillImage;

        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keyup", this.keyup);

        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);

        window.removeEventListener("touchstart", this.touchstart);
        window.removeEventListener("touchend", this.touchend);

        window.addEventListener("touchstart", this.touchstart);
        window.addEventListener("touchend", this.touchend);
    }

    touchstart = () => {
        this.jumpPressed = true;
    }

    touchend = () => {
         this.jumpPressed = false;
    }

    keydown = (event) => {
        if (event.code === "Space") {
            this.jumpPressed = true;
        }
    }

    keyup = (event) => {
        if (event.code === "Space") {
            this.jumpPressed = false;
        }
    }

    update (gameSpeed, frameTimeDelta) {
        this.run(gameSpeed, frameTimeDelta);

        if (this.jumpInProgress) {
            this.image = this.standigStillImage;
        }

        this.jump(frameTimeDelta);
    }

    jump (frameTimeDelta) {
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }

        if (this.jumpInProgress && !this.falling) {
            if (this.y > this.canvas.height - this.minJumpHeight || (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)) {
                this.y -= this.jumpSpeed * frameTimeDelta * this.scaleRatio;
            } else {
                this.falling = true;
            }
        }
        else {
            if (this.y < this.yStandingPosition) {
                this.y += this.gravity * frameTimeDelta * this.scaleRatio;
                if (this.y + this.height > this.canvas.height) {
                    this.y = this.yStandingPosition;
                }
            }
            else {
                this.falling = false;
                this.jumpInProgress = false;  
            }
        }
    }

    run (gameSpeed, frameTimeDelta) {
        // if (this.walkAnimationTimer <= 0) {
        //     if (this.image === this.dinoRunImages[0]) {
        //         this.image = this.dinoRunImages[1]
        //     } else {
        //         this.image = this.dinoRunImages[0];
        //     }
        //     this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        // }
        this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw () {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}