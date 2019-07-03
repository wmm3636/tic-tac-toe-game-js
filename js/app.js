// console.log('JS works')

let xPlayer = 0; // to count how many times 'X' player won
let oPlayer = 0; // to count how many times 'O' player won
let num; // to get cell index
let clickedCell; // to get clicked cell
let ctx;// to start drawing shapes 'X' and 'O';
let turn = 1; // to count how many cells are clicked and check player turn
let isFilled = [false, false, false, false, false, false, false, false, false];// to check if the current cell clicked
let symbol = ['', '', '', '', '', '', '', '', ''];// to fill every cells with thier own symbol
// winCases to store winner cases
let winCases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let gameOver = false; // to check if the game is over or not 


/**
 * this function is to clear the game board 
 */
const clearGame = function () {
    const canvasAll = document.querySelectorAll('canvas');
    canvasAll.forEach(function (e) {
        clickedCell = document.getElementById(e.id);
        ctx = clickedCell.getContext("2d");
        ctx.clearRect(0, 0, clickedCell.width, clickedCell.height);
        isFilled = [false, false, false, false, false, false, false, false, false];
        turn = 1;
        symbol = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        document.getElementById("result").innerText = "";
        console.log(e.id);
    });
}


/**
 * this is to add event fo the new game button 
 */
var newBtn = document.getElementById("new");
newBtn.addEventListener("click", clearGame);



/**
 * this function is to take care when user click on any cell on the play table
 * @param {*} numId contains on the canvas id tag
 */
function boxClick(numId) {
    clickedCell = document.getElementById(numId);
    ctx = clickedCell.getContext("2d");
    ctx.lineWidth = 10;
    switch (numId) {
        case "canvas1": num = 0;
            break;
        case "canvas2": num = 1;
            break;
        case "canvas3": num = 2;
            break;
        case "canvas4": num = 3;
            break;
        case "canvas5": num = 4;
            break;
        case "canvas6": num = 5;
            break;
        case "canvas7": num = 6;
            break;
        case "canvas8": num = 7;
            break;
        case "canvas9": num = 8;
            break;
    }
    //drawing the shapes on the canvases 
    if (isFilled[num] == false) {
        if (gameOver == false) {
            // drawing 'X' shape
            if (turn % 2 != 0) {
                ctx.beginPath();
                ctx.moveTo(15, 15);
                ctx.lineTo(85, 85);
                ctx.moveTo(85, 15);
                ctx.lineTo(15, 85);
                ctx.strokeStyle = "black";
                ctx.stroke();
                ctx.closePath();
                symbol[num] = 'X';
            }
            // drawing 'O' shape
            else {
                ctx.beginPath();
                ctx.arc(50, 50, 35, 0, 2 * Math.PI, false);
                ctx.strokeStyle = "black";
                ctx.strokeStyle = "white";
                ctx.stroke();
                ctx.closePath();
                symbol[num] = 'O';
            }
            turn++;
            isFilled[num] = true;
            // check winner
            let s = symbol[num];
            for (let j = 0; j < winCases.length; j++) {
                if ((symbol[winCases[j][0]] == s) && (symbol[winCases[j][1]] == s) && (symbol[winCases[j][2]] == s)) {
                    document.getElementById("result").innerText = "Player '" + s + "' won!";
                    // window.localStorage.setItem('xPlayer', xPlayer++);
                    const x = (s == 'O') ? oPlayer++ : xPlayer++;
                    document.getElementById('xPlayer').innerText = xPlayer;
                    document.getElementById('oPlayer').innerText = oPlayer;
                    gameOver = true;
                }
            }
            //draw condition 
            if (turn > 9 && gameOver != true) {
                document.getElementById("result").innerText = "GAME OVER! IT WAS A DRAW!";
                return;
            }
        }
        else {
            alert("Game is over. Please click on the New Game button to start again.");
        }
    }
    else {
        alert("This box was already filled. Please click on another one.")
    }
}

/***
 * this is to add event listener when user click on the certain cell and retrieving the box's number.
 */
const canvasAll = document.querySelectorAll('canvas');
canvasAll.forEach(function (e) {
    console.log(e.id);
    e.addEventListener('click', function () {
        boxClick(e.id);
    })
});
