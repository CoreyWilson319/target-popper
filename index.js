const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth / 2
canvas.height = window.innerHeight /1.5
const startButton = document.getElementById("start")
let balloonArray = []
let timer = 5
let gameLive = false
let score = 0
let setIntervalArray = []
let gameStatus = null
let timerDisplay = document.getElementById('timer')
let scoreDisplay = document.getElementById('score')
let statusDisplay = document.getElementById('status')

function stateReset() {
    timer = 5
    score = 0
    balloonArray = []
    setIntervalArray = []
    gameLive = false
}



function gameRender(){
    gameRunning = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleBalloons()
        checkGameState()
        handlePopBalloons()
        timerDisplay.innerHTML = 'Timer: ' + timer;
        scoreDisplay.innerHTML = 'Score: ' + score;
    }, 33)
    setIntervalArray.push(gameRunning)
}

function stopGame(){
    if (gameLive){
        for (let i = 0; i < setIntervalArray.length; i++){
            clearInterval(setIntervalArray[i])
        }
        stateReset()
    }
}
function startGame(){
    stateReset()
    gameLive = true
    statusDisplay.innerHTML = ""
    if (gameLive){
        gameRender()
        createBalloons = setInterval(()=>{
            for (let i = 0; i < Math.random() * (4 - 1); i++){
                balloonArray.push(new Balloon)
                // Create random amount of balloons every 1 seconds

                if (!gameLive){
                    clearInterval(createBalloons)
                }
            }
            timer = timer - 1
            // conditions to make gameLive = false
            if (timer === 0) {
                gameLive = false
            }
        }, 1000)
        setIntervalArray.push(createBalloons)
        if (timer === 0) {
            handleWinLose()
            if (gameLive === false){
                // escape function if game is over
                return
        }
        }
}
}

function handleWinLose(){
    if (timer <= 0 && score > 70) {
        statusDisplay.innerHTML = "You Win!"
        return
    } else {
        statusDisplay.innerHTML = "You Lose, Click Start to try again!"
        return
    }
}


function restart(){
    if (gameLive){
        stopGame()

    }
    startGame()

}

startButton.onclick = restart

function checkGameState(){
    // checks if timer is above zero, if it is make gameLive = true if not gameLive = false and check win/lose
    if (timer > 0) {
        gameLive = true
    } else if(timer === 0){
        gameLive = false
        handleWinLose()
    }
}

// Come back to this to make game canvas fit screen after resizing window
// window.addEventListener('resize', function() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// })

// default mouse values
const mouse = {
    x: undefined,
    y: undefined,
}

// Collision for mouse and balloons
canvas.addEventListener('click', function(e){
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.x - rect.left
    mouse.y = e.y - rect.top
    for (let i = 0; i < balloonArray.length; i++ ) {
        if (balloonArray[i].alive) {
            if (balloonArray[i].x  - mouse.x < 15 && balloonArray[i].x  - mouse.x >= -25 && balloonArray[i].y  - mouse.y < 40 && balloonArray[i].y  - mouse.y >= -50) {
                    balloonArray[i].alive = false
                    // console.log(balloonArray[i])
                    handlePopBalloons()
            }

        }
    }
})

class Balloon {
    constructor(){
        this.x = Math.random() * (canvas.width - 1) + 1;
        this.y = Math.random() * (canvas.height - 1) + 1;
        this.alive = true;
        this.size = 30;
    };
    draw() {
        if (this.alive){
            ctx.fillStyle = 'red'
            ctx.beginPath();
            ctx.arc(this.x, this.y, 15, 0, Math.PI * 2)
            ctx.fill()
        }
    }
    // create explode function to pop balloons
}

function handleBalloons() {
    // draws balloons if balloon is alive
    if (gameLive) {
        for (let i = 0; i < balloonArray.length; i++) {
            if (balloonArray[i].alive) {
                balloonArray[i].draw()
            }
        }
    }
}

function handlePopBalloons(){
    // removes ballon from balloonArray if balloon has a value of false
    if (gameLive){
        for (let i = 0; i < balloonArray.length; i++) {
            if (balloonArray[i].alive === false) {
                score += 10
                balloonArray.splice(i, 1)
    }
            
}
}}


gameRender()
