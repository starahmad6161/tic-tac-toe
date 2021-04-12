

class Player {
    
    winPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    
        [0, 4, 8],
        [2, 4, 6],
    ]
    positions = [];
    score = 0;
    
    constructor(name) {
        this.name = name;
    }
    pushPosition(position) {
        if (this.positions.indexOf(position) === -1) {
            this.positions.push(position);
        }
    }
    isWin() {
        for(let i = 0; i < this.winPositions.length; i++) {
            let newArr = this.positions.filter(item => this.winPositions[i].indexOf(item) !== -1);
            if (newArr.length >= 3) {
                return true;
            }
        }
        return false;
    }

    increaseScore() {
        this.score += 1;
    }
    resetPositions() {
        this.positions = [];
    }
    resetScore() {
        this.score = 0;
    }
}

let x = new Player("x");
let o = new Player("o");
let obj = x;

let boxes = document.querySelectorAll(".box");
let playAgainBtn = document.querySelector(".play-again-btn");
let restartBtn = document.querySelector(".restart-btn");
let currentPlayer = document.querySelector(".current-player");
let gameOverEle = document.querySelector(".game-over");
let mainOverlay = document.querySelector(".main__overlay");
let gameOverTxt = document.querySelector(".game-over-txt");
let mainCheckbox = document.querySelector(".main__checkbox");
let xScoreEle = document.querySelector(".x-score");
let oScoreEle = document.querySelector(".o-score");


let gameIsOver = false;
let isX = true;

let boxesIndex = [];

let playingWithPc = true;

//For checkbox [play with computer]
mainCheckbox.addEventListener("click", () => {
    playingWithPc = !playingWithPc;
    handleRestart();
});

//Add click event to boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", function () {
        if (box.children.length > 0) return null;
        obj = isX ? x : o;
        //Check if the current player is `X` or `O`
        if (isX) {
            if (playingWithPc) mainOverlay.style.display = "block";
            this.innerHTML = `<div class="x-element">X</div>`;
        } else {
            mainOverlay.style.display = "none";
            this.innerHTML = `<div class="o-element">o</div>`;
        } 
        boxesIndex.push(index);
        //Check which player is win
        obj.pushPosition(index);
        if (obj.isWin()) {
            gameIsOver = true;
            gameOverEle.classList.add("active");
            gameOverTxt.innerHTML = isX ? "X is win": "O is win";
            obj.increaseScore();
            updateScore();
        } else {
            if (boxesIndex.length === 9) {
                gameOverEle.classList.add("active");
                gameOverTxt.innerHTML = "Game Over";
                gameIsOver = true;
            }
        }
        isX = !isX;
        updateCurrentPlayer();
        if (playingWithPc && !isX && !gameIsOver) {
            setTimeout(() => {
                runPC()
            }, 500);
        }
    });
});
function runPC() {
    
    let randomBox = Math.floor(Math.random() * boxes.length);
    if (boxesIndex.includes(randomBox) && !gameIsOver) {// if this element has value
        runPC();
    } else {
        let ele = boxes[randomBox];
        ele.click();
    }
}

playAgainBtn.addEventListener("click", handlePlayAgain);
restartBtn.addEventListener("click", handleRestart);

function handlePlayAgain() {
    isX = true;
    mainOverlay.style.display = "none";
    x.resetPositions();
    o.resetPositions();
    boxes.forEach(ele => {
        ele.innerHTML = "";
    });
    gameIsOver = false;
    gameOverEle.classList.remove("active");
    boxesIndex = [];
    updateScore();
    updateCurrentPlayer();
}
function handleRestart() {
    handlePlayAgain();
    x.resetScore();
    o.resetScore();
    updateScore();
}




function updateScore() {
    xScoreEle.innerHTML = x.score;
    oScoreEle.innerHTML = o.score;
}


function updateCurrentPlayer() {
    currentPlayer.innerHTML = isX ? "X" : "O"; 
}