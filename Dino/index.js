// import Player from "./Player.js";
// import Ground from "./Ground.js";
// import CactusController from "./CactusContoller.js";

// const canvas = document.getElementById("game");
// const ctx = canvas.getContext("2d");

// const gameSpeedStart = .75;
// const gameSpeedIncrement = 0.0001;


// const gameWidth = 800;
// const gameHeight = 200;
// const playerWidht = 88 / 1.5;
// const playerHeight = 94 / 1.5;
// const maxJumpHeight = gameHeight;
// const minJumpHeight = 150;
// const groundWidth = 2400;
// const groundHeight = 24;
// const groundAndCactusSpeed = 0.5;


// const cactusConfig = [
//     {width: 48 / 1.4, height: 100 / 1.5, image: "./images/cactus1.png"},
//     {width: 98 / 1.4, height: 100 / 1.5, image: "./images/cactus2.png"},
//     {width: 68 / 1.4, height: 70 / 1.5, image: "./images/cactus3.png"}
// ];

// let player = null;
// let ground = null;
// let cactusContoller = null;

// let scaleRatio = null;
// let previousTime = null;
// let gameSpeed = gameSpeedStart;
// let gameOver = false;
// let hasAddedEventListenerForRestart = false;
// let waitingToStart = true;

// function createSprites () {
//     const playerWidthInGame = playerWidht * scaleRatio;
//     const playerHeightInGame = playerHeight * scaleRatio;
//     const minJumpHeightInGame = minJumpHeight * scaleRatio;
//     const maxJumpHeightInGame = maxJumpHeight * scaleRatio;

//     const groundWidthInGame = groundWidth * scaleRatio;
//     const groundHeightInGame = groundHeight * scaleRatio;

//     player = new Player(ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);

//     ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, groundAndCactusSpeed);

//     const cactImages = cactusConfig.map(cactus => {
//         const image = new Image();
//         image.src = cactus.image;
//         return {
//             image: image,
//             width: cactus.width * scaleRatio,
//             height: cactus.height * scaleRatio,
//         }
//     });

//     cactusContoller = new CactusController(ctx, cactImages, scaleRatio, groundAndCactusSpeed);
// }

// function setScreen() {
//     scaleRatio = getScaleRatio();
//     canvas.width = gameWidth * scaleRatio;
//     canvas.height = gameHeight * scaleRatio;
//     createSprites();
// }

// setScreen();

// window.addEventListener("resize", () => setTimeout(setScreen, 500));

// if (screen.orientation) {
//     screen.orientation.addEventListener("change", setScreen);
// }

// function getScaleRatio() {
//     const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

//     const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

//     if (screenWidth / screenHeight < gameWidth / gameHeight) {
//         return screenWidth / gameWidth;
//     }
//     return screenHeight / gameHeight;

// }

// function clearScreen () {
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

// function gameLoop (curentTime) {
//     if (previousTime === null) {
//         previousTime = curentTime;
//         requestAnimationFrame(gameLoop);
//         return;
//     }
//     const frameTimeDelta = curentTime - previousTime;
//     previousTime = curentTime;
//     clearScreen();

//     if (!gameOver && !waitingToStart) {
//         ground.update(gameSpeed, frameTimeDelta);
//         cactusContoller.update(gameSpeed, frameTimeDelta);
//         player.update(gameSpeed, frameTimeDelta);

//     }

//     if (!gameOver && cactusContoller.collideWith(player)) {
//          gameOver = true;
//          setupGameReset();
//     }


   
   
//     function showGameOver () {
//         const fontSize = 70 * scaleRatio;
//         ctx.font = `${fontSize}px  Verdama`;
//         ctx.fillStyle = 'grey';
//         const x = canvas.width / 4.5;
//         const y = canvas.height / 2;
//         ctx.fillText('GAME OVER', x, y);
//     }

 

//     function reset () {
//         hasAddedEventListenerForRestart = false;
//         gameOver = false;
//         ground.reset();
//         cactusContoller.reset();
//         gameSpeed = gameSpeedStart;
//         waitingToStart = false
//     }

//     function setupGameReset () {
//         if (!hasAddedEventListenerForRestart) {
//             hasAddedEventListenerForRestart = true;

//             setTimeout(() => {
//                 window.addEventListener('keyup', reset, {once: true});
//                 window.addEventListener('touchstart', reset, {once: true});
//             })
//         }
//     }

//     function showStartGameText () {
//         const fontSize = 40 * scaleRatio;
//         ctx.font = `${fontSize}px Verdna`;
//         ctx.fillStyle = 'grey';
//         const x = canvas.width / 14;
//         const y = canvas.height / 2;
//         ctx.fillText('Tap Screen or Press Space To Start', x, y)
//     }


//     ground.draw();
//     cactusContoller.draw();
//     player.draw();

//     if (gameOver) {
//         showGameOver();
//     }

//     if (waitingToStart) {
//         showStartGameText();
//     }

//     requestAnimationFrame(gameLoop);

// }




// requestAnimationFrame(gameLoop);

// window.addEventListener('keyup', reset, {once: true});
// window.addEventListener('touchstart', reset, {once: true});






import Player from "./Player.js";
import Ground from "./Ground.js";
import CactusController from "./CactusContoller.js";
import Score from "./score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gameSpeedStart = 1;
const gameSpeedIncrement = 0.0001;


const gameWidth = 800;
const gameHeight = 200;
const playerWidht = 88 / 1.5;
const playerHeight = 94 / 1.5;
const maxJumpHeight = gameHeight;
const minJumpHeight = 150;
const groundWidth = 2400;
const groundHeight = 24;
const groundAndCactusSpeed = 0.5;

const cactusConfig = [
    { width: 48 / 1.5, height: 100 / 1.5, image: "./images/cactus1.png" },
    { width: 98 / 1.5, height: 100 / 1.5, image: "./images/cactus2.png" },
    { width: 68 / 1.5, height: 70 / 1.5, image: "./images/cactus3.png" }
];

let player = null;
let ground = null;
let cactusContoller = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = gameSpeedStart;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

function createSprites() {
    const playerWidthInGame = playerWidht * scaleRatio;
    const playerHeightInGame = playerHeight * scaleRatio;
    const minJumpHeightInGame = minJumpHeight * scaleRatio;
    const maxJumpHeightInGame = maxJumpHeight * scaleRatio;

    const groundWidthInGame = groundWidth * scaleRatio;
    const groundHeightInGame = groundHeight * scaleRatio;

    player = new Player(ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);

    ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, groundAndCactusSpeed);

    const cactImages = cactusConfig.map(cactus => {
        const image = new Image();
        image.src = cactus.image;
        return {
            image: image,
            width: cactus.width * scaleRatio,
            height: cactus.height * scaleRatio,
        }
    });

    cactusContoller = new CactusController(ctx, cactImages, scaleRatio, groundAndCactusSpeed);
    score = new Score(ctx, scaleRatio);
}

function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = gameWidth * scaleRatio;
    canvas.height = gameHeight * scaleRatio;
    createSprites();
}

setScreen();

window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.orientation) {
    screen.orientation.addEventListener("change", setScreen);
}

function getScaleRatio() {
    const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

    const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

    if (screenWidth / screenHeight < gameWidth / gameHeight) {
        return screenWidth / gameWidth;
    }
    return screenHeight / gameHeight;

}

function showGameOver() {
    const fontSize = 70 * scaleRatio;
    ctx.font = `${fontSize}px Verdana`;
    ctx.fillStyle = "grey";
    const x = canvas.width / 4.5;
    const y = canvas.height / 2;
    ctx.fillText("Game Over", x, y);
}

function setupGameReset() {
    if (!hasAddedEventListenersForRestart) {
        hasAddedEventListenersForRestart = true;

        setTimeout(() => {
            window.addEventListener("keyup", reset, { once: true });
            window.addEventListener("touchstart", reset, { once: true });
        }, 1000);
    }
}

function reset() {
    hasAddedEventListenersForRestart = false;
    gameOver = false;
    waitingToStart = false;
    ground.reset();
    cactusContoller.reset();
    gameSpeed = gameSpeedStart;
    score.reset();
}


function showStartGameText() {
    const fontSize = 40 * scaleRatio;
    ctx.font = `${fontSize}px Verdana`;
    ctx.fillStyle = "grey";
    const x = canvas.width / 14;
    const y = canvas.height / 2;
    ctx.fillText("Tap Screen or Press Space To Start", x, y);
}


function updateGameSpeed (frameTimeDelta) {
    gameSpeed += frameTimeDelta * gameSpeedIncrement;
}

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}




function gameLoop(curentTime) {
    if (previousTime === null) {
        previousTime = curentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = curentTime - previousTime;
    previousTime = curentTime;
    clearScreen();

    if (!gameOver && !waitingToStart) {
        ground.update(gameSpeed, frameTimeDelta);
        cactusContoller.update(gameSpeed, frameTimeDelta);
        player.update(gameSpeed, frameTimeDelta);
        score.update(frameTimeDelta);
        updateGameSpeed(frameTimeDelta);
    }

    if (!gameOver && cactusContoller.collideWith(player)) {
        gameOver = true;
        setupGameReset();
        score.setHighScore();
    }

    ground.draw();
    cactusContoller.draw();
    player.draw();
    score.draw();

    if (gameOver) {
        showGameOver();
    }

    if (waitingToStart) {
        showStartGameText();
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("keyup", reset, { once: true });
window.addEventListener("touchstart", reset, { once: true });