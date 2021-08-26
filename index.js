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



function gameRender(){
    gameRunning = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleBalloons()
        checkGameState()
        handlePopBalloons()
        document.getElementById("score").innerHTML = 'Score: ' + score;
        document.getElementById("timer").innerHTML = 'Timer: ' + timer;
        // if (gameLive === false){
        //     stopGame()
        //     handleWinLose()
        //     // display some message about trying again and your score
        //     // allow try again to run startGame function
        //     return
        // }
    }, 33)
    setIntervalArray.push(gameRunning)
}

function stopGame(){
    if (gameLive){
        for (let i = 0; i < setIntervalArray.length; i++){
            clearInterval(setIntervalArray[i])
        }
        gameLive = false
        timer = 0
        score = 0
        balloonArray.splice(0, balloonArray.length)
        balloonArray = []
    }
}
function startGame(){
    console.log('gameStarted')
    gameLive = true
    score = 0
    timer = 5
    balloonArray = []
    setIntervalArray = []
    document.getElementById('status').innerHTML = ""
    if (gameLive){
        gameRender()
        createBalloons = setInterval(()=>{
            for (let i = 0; i < Math.random() * (3 - 1) + 1; i++){
                balloonArray.push(new Balloon)
                // Create 1 ballons every 1 seconds

                if (!gameLive){
                    clearInterval(createBalloons)
                }
            }
            timer = timer - .5
                // console.log(timer)
                // console.log(score)
                // console.log(gameLive)
            // conditions to make gameLive = false
            if (timer === 0) {
                gameLive = false
            }
        }, 1000)
        setIntervalArray.push(createBalloons)
        if (timer === 0) {
            handleWinLose()
            if (gameLive === false){
                // stopGame()
                // display some message about trying again and your score
                // allow try again to run startGame function
                return
        }
        }
}
}

function handleWinLose(){
    if (timer <= 0 && score > 70) {
        // if timer is 0 or less than and the score is at least seven show win if not show loss
        console.log("YOU WIN")
        document.getElementById('status').innerHTML = "You Win!"
        // ctx.font = '48px serif';
        // ctx.fill = 'green'
        // ctx.fillText('You Win', canvas.height, 50);
        return
    } else {
        document.getElementById('status').innerHTML = "You Lose, Click Start to try again!"
        // ctx.fill = 'red'
        // ctx.font = '48px serif';
        // ctx.fillText('You Lose', canvas.height, 50);
        console.log("TRY AGAIN")
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
// startButton.onclick = startGame

function checkGameState(){
    // checks if timer is above zero, if it is make gameLive = true if not gameLive = false and check win/lose
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


// Wrap start game function to start button DONE
// Add a way to keep score as well as a timer 
//  ^ DONE JUST NEEDS DISPLAY
// enable some way to stop the game and reset the state to the beginning state
    // ^ Works but bug with doubling the rate of balloons that appear
    // COME BACK TO THIS WHEN I GET BACK
    // DOES NOT HAPPEN IF TIMER RUNS OUT
    // IT HAPPENS WHEN START IS CLICKED WHILE GAME IS RUNNING
        // COULD CREATE RESET BUTTON TO REFRESH PAGE (LAZY)
gameRender()
// startGame()