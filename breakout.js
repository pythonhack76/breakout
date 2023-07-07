//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

// Aggiungi questa riga all'inizio del tuo codice
let hitSound = new Audio("./assets/sounds/explosion.wav");


//credits
let author = "spritecoder";
let email_author = "game@spritecoder.com";
let version = "1.0.0";

//player
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 10;

let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX

}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
    x : boardWidth/2,
    y: boardHeight/2, 
    width : ballWidth,
    height : ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
}

//blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3; //aggiungi more as game goes on
let blockMaxRows = 10; //limit how many rows
let blockCount = 0; 

//starting block corner top left
let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false; 

let explosion = "./assets/images/sounds/explosion.wav";

window.onload = function() {
        board = document.getElementById("board");
        board.height = boardHeight;
        board.width = boardWidth;
        context = board.getContext("2d"); 

        //draw the initial player
        context.fillStyle = "lightgreen";
        context.fillRect(player.x, player.y, player.width, player.height );

        requestAnimationFrame(update);
        document.addEventListener("keydown", movePlayer);

        //CREATE BLOCKS
        createBlocks(); 

}

function update(){    
    requestAnimationFrame(update);
    //rendo il player pulito
    context.clearRect(0,0, board.width, board.height);

    //player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height );

    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //bounce ball off walls
    if (ball.y <= 0){
        //se la palla tocca il top del canvas
        ball.velocityX *= -1; //reverse direction
    }
    else if ( ball.x <= 0 || (ball.x + ball.width) >= boardWidth) {
        // se la palla tocca sinistra o destra del canvas
        ball.velocityX *= -1; //reverse direction 
    }
    else if (ball.y + ball.height >= boardHeight){
        // if 
        //game over
    }

    //bounce the ball off palyer paddle
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1; //flip y direction up or down
        hitSound.play(); // Riproduci l'effetto sonoro
    }

    else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1; //flip y direction up or down
        hitSound.play(); // Riproduci l'effetto sonoro
    }

        //blocks
        context.fillStyle = "skyblue";
        for (let i = 0; i < blockArray.length; i++ ){
            let block = blockArray[i];
            if (!block.break){
                if (topCollision(ball, block) || bottomCollision(ball, block)){
                    block.break = true;
                    ball.velocityY *= -1; // flip y direction up ord down
                    blockCount -= 1;
                    score += 100;
                }
                else if ( leftCollision(ball, block) || rightCollision(ball, block)){
                    block.break = true;
                    ballVelocityX *= -1; //flip x direction lfet or right
                    blockCount -= 1;
                    score += 100; 
                }
                context.fillRect(block.x, block.y, block.width, block.height);
            }
      }
      context.font = "20px sans-serif";
      context.fillText(score, 10, 25);
}

function outOfBounds(xPosition){
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e) {
    if (e.code == "ArrowLeft"){
        //player.x -= playerVelocityX;
        let nextPlayerX = player.x - player.velocityX; 
        if (!outOfBounds(nextPlayerX)){
            player.x = nextPlayerX; 
        }
    }
    else if (e.code == "ArrowRight"){
        //player.x += player.velocityX;
        let nextPlayerX = player.x + playerVelocityX;
        if (!outOfBounds(nextPlayerX)){
            player.x = nextPlayerX; 
        }
    }
}

function detectCollision(a,b){
    return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x && //
           a.y < b.y + b.height && //
           a.y + a.height > b.y; //
}

function topCollision(ball, block){ //a is above b (ball is above block)

        return detectCollision(ball, block) && (ball.y + ball.height) >= block.y; 
}

function bottomCollision(ball, block){ // a is below b ( ball is below block)
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y; 
}

function leftCollision(ball, block) {
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x; 
}

function rightCollision(ball, block){
    return detectCollision(ball, block ) && (block.x + block.width) >= ball.x; 
}


function createBlocks() {
    blockArray = []; // clear blockArray
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10, // c+10 space 10 pixels apart columns
                y : blockY + r *blockHeight + r*10,
                width : blockWidth,
                height : blockHeight,
                break : false
                
            }
            blockArray.push(block);
        }
    }

    blockCount = blockArray.length; 
}