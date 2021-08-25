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
    // as long as there is time on the clock gameLive should be true
    // while this is true create balloons
    // if timer runs out gameLive becomes false and stop creating ballons
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
            if ((mouse.x - balloonArray[i].x) < 30 && (mouse.y - balloonArray[i].y < 30)){
                console.log(balloonArray[i])
                balloonArray[i].alive = false
                console.log(balloonArray[i])
                handlePopBalloons()
            }
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
        if (!balloonArray[i].alive) {
            balloonArray.splice(index, i)
            handleBalloons()
        }
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




gameRender()
// window.requestAnimationFrame(startGame)
startGame()