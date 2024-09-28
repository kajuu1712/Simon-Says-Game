let level = 0;
let highestScore = 0;
let started = false;
let gameSeq = [];
let userSeq = [];
let boxes = ["red", "yellow", "green", "blue"];
let h2 = document.querySelector('h2');
let body = document.querySelector('body');

document.addEventListener("keypress", () => {
    if(started == false) {
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}`;
    let idx = Math.floor(Math.random()*3);
    randomBoxClass = boxes[idx];
    randomBox = document.querySelector(`.${randomBoxClass}`);
    gameSeq.push(randomBoxClass);
    console.log("Game:" ,gameSeq);
    flashWhite(randomBox);
}

function flashWhite(box) {
    box.classList.add("flashWhite");
    setTimeout(() => {
        box.classList.remove("flashWhite");
    },250);
}

let allBoxes = document.querySelectorAll(".box");
for(box of allBoxes) {
    box.addEventListener("click", btnClicked);
}

function btnClicked() {
    console.log(this);
    flashWhite(this);
    let btnClickedClass = this.getAttribute("id");
    userSeq.push(btnClickedClass);
    console.log("User:" ,userSeq);
    checkAns(userSeq.length-1);
}

function checkAns(idxNum) {
    if(gameSeq[idxNum] === userSeq[idxNum]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }else {
        if(highestScore <= level) {
            highestScore = level;
        }
        body.style.backgroundColor = "red";
        setTimeout(() => {
            body.style.backgroundColor = "white";
        },180);
        h2.innerHTML = `Game over! Highest Score: ${highestScore}. <br> Your score is ${level}. Press any key to start again. `;
        resetGame();
    }
}

function resetGame() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}