
// export default class Score {
//     score = 0;
//     HighScoreKey = 'highScore'
//     constructor (ctx, scaleRatio) {
//         this.ctx = ctx;
//         this.canvas = ctx.canvas;
//         this.scaleRatio = scaleRatio

//     }


//     update (frameTimeDelta) {
//        this.score = frameTimeDelta * 0.01
//     }


//     reset () {
//         this.score = 0;
//     }


//     setHighScore () {
//         const highScore = Number(localStorage.getItem(this.HighScoreKey));
//         if (this.score > highScore) {
//             localStorage.setItem(this.HighScoreKey, Math.floor(this.score))
//         }
//     }


//     draw () {
//         const highScore = Number(localStorage.getItem(this.HighScoreKey));
//         const y = 20 * this.scaleRatio;

//         const fontSize = 20 * this.scaleRatio;
//         this.ctx.font = `${fontSize}px serif`;
//         this.ctx.fillStyle = '#525250';
//         const scoreX = this.canvas.width - 75 * this.scaleRatio;
//         const highScoreX = scoreX - 125 * this.scaleRatio;

//         const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
//         const highScorePadded = highScore.toString().padStart(6, 0);

//         this.ctx.fillText(scorePadded, scoreX, y);
//         this.ctx.fillText(`HI${highScorePadded}`, highScoreX, y);
//     }
// }


export default class Score {
    score = 0;
    HighScoreKey = "highScore"

    constructor (ctx, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
    }

    update (frameTimeDelta) {
        this.score += frameTimeDelta * 0.01;
    }

    reset () {
        this.score = 0;
    }

    setHighScore () {
        const highScore = Number(localStorage.getItem(this.HighScoreKey));
        if (this.score > highScore) {
            localStorage.setItem(this.HighScoreKey, Math.floor(this.score));
        }
    }

    draw () {
        const highScore = Number(localStorage.getItem(this.HighScoreKey));
        const y = 20 * this.scaleRatio;

        const fontSize = 20 * this.scaleRatio;
        this.ctx.font = `${fontSize}px serif`;
        this.ctx.fillStyle = "#525250";
        const scoreX = this.canvas.width - 75 * this.scaleRatio;
        const highScoreX = scoreX - 125 * this.scaleRatio;

        const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
        const highScorePadded = highScore.toString().padStart(6, 0);

        this.ctx.fillText(scorePadded, scoreX, y);
        this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    }
}