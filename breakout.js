//board

let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

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


}

function update(){    
    requestAnimationFrame(update);
    //rendo il player pulito
    context.clearRect(0,0, board.width, board.height);

    //player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height );



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