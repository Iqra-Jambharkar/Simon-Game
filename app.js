let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = 0;
let btns = ["blue","yellow","green","red"];



let heading = document.querySelector("h3");

document.addEventListener("keypress", () => {
    if(started == false) {
        console.log("game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}

let levelUp = () => {
    userSeq = [];
    level++;
    heading.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        heading.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start.`;
        updateHighScore();
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "#FFEDF3";
        },150);
        reset();

    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let highScoreDisplay = document.querySelector("#highScoreDisplay");

function updateHighScore() {
  if (level > highScore) {
    highScore = level ;
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  }
}

