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

let player = {
    x : boardWidth/2 - playerWidth
}

window.onload = function() {
        board = document.getElementById("board");
        board.height = boardHeight;
        board.width = boardWidth;
}