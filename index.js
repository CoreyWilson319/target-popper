const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const startButton = document.getElementById("start")
let balloonArray = []
let timer = 5
let gameLive = true

function gameRender(){
    gameRunning = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleBalloons()
    }, 33)
}

function startGame(){
    if (gameLive){
        createBalloons = setInterval(()=>{
            for (let i = 0; i < 1; i++){
                balloonArray.push(new Balloon)
                // Create five ballons every 2 seconds

                if (!gameLive){
                    clearInterval(createBalloons)
                }
            }
        }, 1000)
    }
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// default mouse values
const mouse = {
    x: undefined,
    y: undefined,
}

// Trying to set collision
canvas.addEventListener('click', function(e){
    mouse.x = e.x
    mouse.y = e.y
    console.log("mouse x, y", mouse.x, mouse.y)
    for (let i = 0; i < balloonArray.length; i++ ) {
        if (balloonArray[i].alive) {
            // Work on collision
            // Try accounting for within 15 on the positive > and negative < fro both x and y
            if (balloonArray[i].x  - mouse.x < 15 && balloonArray[i].x  - mouse.x >= -25 && balloonArray[i].y  - mouse.y < 40 && balloonArray[i].y  - mouse.y >= -50) {
                // console.log("X Checks out", (balloonArray[i].x - mouse.x))
                    balloonArray[i].alive = false
                    console.log(balloonArray[i])
                    handlePopBalloons()
            }
            // if (mouse.x - balloonArray[i].x < 15 && mouse.y - balloonArray[i].y < 25){
            //     console.log(balloonArray[i])
            // }
        }
    }
})

class Balloon {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.alive = true;
        this.size = 30;
    };
    draw() {
        if (this.alive){
            ctx.fillStyle = 'blue'
            ctx.beginPath();
            ctx.arc(this.x, this.y, 15, 0, Math.PI * 2)
            ctx.fill()
        }
    }
}

function handleBalloons() {
    for (let i = 0; i < balloonArray.length; i++) {
        if (balloonArray[i].alive) {
            balloonArray[i].draw()
        }
    }
}

function handlePopBalloons(){
        for (let i = 0; i < balloonArray.length; i++) {
            if (balloonArray[i].alive === false) {
                balloonArray.splice(i, 1)
                console.log(balloonArray)
            
}
}}

let numbers = [1, 2, 3, 4, 5]
numbers.splice(2)
console.log(numbers)

// balloonArray.push(new Balloon)
gameRender()
// window.requestAnimationFrame(startGame)
startGame()