const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth / 2
canvas.height = window.innerHeight /1.5
const startButton = document.getElementById("start")
let balloonArray = []
let timer = 5
let gameLive = true
let score = 0

function gameRender(){
    gameRunning = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleBalloons()
        checkGameState()
        handlePopBalloons()
    }, 33)
    if (gameLive === false){
        clearInterval(gameRunning)
        handleWinLose()
        // display some message about trying again and your score
        // allow try again to run startGame function
        return
    }
}

function handleWinLose(){
    if (timer <= 0 && score > 7) {
        console.log("YOU WIN")
    } else {
        console.log("TRY AGAIN")
    }
}

function startGame(){
    console.log('gameStarted')
    gameLive = true
    score = 0
    timer = 5
    balloonArray = []
    if (gameLive){
        createBalloons = setInterval(()=>{
            for (let i = 0; i < 1; i++){
                balloonArray.push(new Balloon)
                // Create 1 ballons every 1 seconds

                if (!gameLive){
                    clearInterval(createBalloons)
                }
            }
            if (gameLive){
                timer = timer - .5
                // console.log(timer)
                // console.log(score)
                // console.log(gameLive)
            } if (timer <= 0) {
                gameLive = false
            }
            if (gameLive === false){
                clearInterval(gameRunning)
                // display some message about trying again and your score
                // allow try again to run startGame function
                return
            }
        }, 500)
    }
}

startButton.onclick = startGame

function checkGameState(){
    if (timer > 0) {
        gameLive = true
    } else if(timer === 0){
        gameLive = false
        handleWinLose()
    }
}

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
    console.log("mouse x, y", mouse.x, mouse.y)
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
        this.x = Math.random() * canvas.width + 75;
        this.y = Math.random() * canvas.height + 75;
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
    if (gameLive){
        for (let i = 0; i < balloonArray.length; i++) {
            if (balloonArray[i].alive === false) {
                score += 10
                balloonArray.splice(i, 1)
    }
            
}
}}


// Wrap start game function to start button DONE
// Add a way to keep score as well as a timer 
//  ^ DONE JUST NEEDS DISPLAY
// enable some way to stop the game and reset the state to the beginning state
    // ^ Works but bug with doubling the rate of balloons that appear

gameRender()
// startGame()