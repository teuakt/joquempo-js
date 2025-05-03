const $startButton = document.querySelector(".start-button");

const $stoneButton1 = document.querySelector(".player1-stone-button");
const $paperButton1 = document.querySelector(".player1-paper-button");
const $scissorsButton1 = document.querySelector(".player1-scissors-button");

const $stoneButton2 = document.querySelector(".player2-stone-button");
const $paperButton2 = document.querySelector(".player2-paper-button");
const $scissorsButton2 = document.querySelector(".player2-scissors-button");

const $fieldPlayer1 = document.querySelector(".player1-gamefield");
const $fieldPlayer2 = document.querySelector(".player2-gamefield");

const $winnerField = document.querySelector(".win-text");

const $scoreField1 = document.querySelector(".scorePlayer1");
const $scoreField2 = document.querySelector(".scorePlayer2");

const $resetButton = document.querySelector(".reset-button");

let winner = null;
let movePlayer1 = "";
let movePlayer2 = "";
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let formattedScore = null;
let gameStart = false;

function verifyWinner() {
  if (movePlayer1 == "stone" && movePlayer2 == "paper") {
    winner = 2;
  } else if (movePlayer1 == "stone" && movePlayer2 == "scissors") {
    winner = 1;
  } else if (movePlayer1 == "paper" && movePlayer2 == "stone") {
    winner = 1;
  } else if (movePlayer1 == "paper" && movePlayer2 == "scissors") {
    winner = 2;
  } else if (movePlayer1 == "scissors" && movePlayer2 == "stone") {
    winner = 2;
  } else if (movePlayer1 == "scissors" && movePlayer2 == "paper") {
    winner = 1;
  } else if (movePlayer1 == movePlayer2) {
    winner = 0;
  }
}

function printWinner() {
  if (winner == 1) {
    $winnerField.innerHTML = "O jogador venceu!";
  } else if (winner == 2) {
    $winnerField.innerHTML = "O computador venceu";
  } else if (winner == 0) {
    $winnerField.innerHTML = "Empate! Joguem novamente.";
  }
}

function resetBattleField() {
  $fieldPlayer1.innerHTML = "";
  $fieldPlayer2.innerHTML = "";
  movePlayer1 = "";
  movePlayer2 = "";
  $winnerField.innerHTML = "Aguardando jogada...";
}

function scoreCount() {
  if (winner == 1) {
    scorePlayer1++;
    if (scorePlayer1 < 10) {
      $scoreField1.innerHTML = "0" + scorePlayer1;
    } else {
      $scoreField1.innerHTML = scorePlayer1;
    }
  } else if (winner == 2) {
    scorePlayer2++;
    if (scorePlayer2 < 10) {
      $scoreField2.innerHTML = "0" + scorePlayer2;
    } else {
      $scoreField2.innerHTML = scorePlayer2;
    }
  }
}

function checkGameResult() {
  if (movePlayer1 != "" && movePlayer2 != "") {
    verifyWinner();
    scoreCount();
    printWinner();
    if (winner != null) {
      setTimeout(resetBattleField, 1000);
    }
  }
}

function move(moveName, fieldNumber) {
  if (gameStart) {
    if (fieldNumber == 1) {
      $fieldPlayer1.innerHTML =
        '<img class="move-image"src="./assets/' + moveName + '.png"/>';
      movePlayer1 = moveName;
    } else if (fieldNumber == 2) {
      $fieldPlayer2.innerHTML =
        '<img class="move-image"src="./assets/' + moveName + '.png"/>';
      movePlayer2 = moveName;
    }
    botMove();
    checkGameResult();
  }
}

function resetScoreBoard() {
  $scoreField1.innerHTML = "00";
  $scoreField2.innerHTML = "00";
  $fieldPlayer1.innerHTML = "";
  $fieldPlayer2.innerHTML = "";
  $winnerField.innerHTML = "Clique em 'Iniciar' para começar!";
  scorePlayer1 = 0
  scorePlayer2 = 0
}

function botMove(){
  botMoves = Math.floor(Math.random() * 3) + 1;

  $stoneButton2.classList.remove("button-active");
  $paperButton2.classList.remove("button-active");
  $scissorsButton2.classList.remove("button-active");
  
  if (botMoves == 1) {
    movePlayer2 = "stone";
    $stoneButton2.classList.add("button-active");
    setTimeout(() => $stoneButton2.classList.remove("button-active"), 100);
    $fieldPlayer2.innerHTML = '<img class="move-image" src="./assets/' + movePlayer2 + '.png"/>';
  } else if (botMoves == 2) {
    movePlayer2 = "paper";
    $paperButton2.classList.add("button-active");
    setTimeout(() => $paperButton2.classList.remove("button-active"), 100);
    $fieldPlayer2.innerHTML = '<img class="move-image" src="./assets/' + movePlayer2 + '.png"/>';
  } else {
    movePlayer2 = "scissors";
    $scissorsButton2.classList.add("button-active");
    setTimeout(() => $scissorsButton2.classList.remove("button-active"), 100);
    $fieldPlayer2.innerHTML = '<img class="move-image" src="./assets/' + movePlayer2 + '.png"/>';
  }
}

$stoneButton1.addEventListener("click", function () {
  move("stone", 1);
});
$paperButton1.addEventListener("click", function () {
  move("paper", 1);
});
$scissorsButton1.addEventListener("click", function () {
  move("scissors", 1);
});

/* $stoneButton2.addEventListener("click", function () { 
   move("stone", 2);
 });
 $paperButton2.addEventListener("click", function () {
   move("paper", 2);
 });
 $scissorsButton2.addEventListener("click", function () {
   move("scissors", 2);
 }); */

$resetButton.addEventListener("click", function () {
  resetScoreBoard();
});

$startButton.addEventListener("click", function () {
  gameStart = !gameStart;
  $startButton.classList.toggle("start");
  if (gameStart) {
    $startButton.innerHTML = "Pausar";
    $winnerField.innerHTML = "Aguardando jogada...";
  } else {
    $startButton.innerHTML = "Iniciar"
    $winnerField.innerHTML = "Clique em 'Iniciar' para começar!"
  }
});
