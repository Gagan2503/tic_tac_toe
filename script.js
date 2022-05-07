var board;
const hplayer = "O";
const ai = "X";
const comb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const boxes = document.getElementsByClassName("box");
startGame();
function startGame() {
  document.querySelector(".game").style.display = "none";
  board = Array.from(Array(9).keys());

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].style.removeProperty("background-color");
    boxes[i].addEventListener("click", turnClick, false);
  }
}
function turnClick(square) {
  //   console.log(square.target.id);
  if (typeof board[square.target.id] == "number") {
    turn(square.target.id, hplayer);
    if (!tie()) turn(spot(), ai);
  }
}
function turn(squareId, player) {
  board[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let won = checkwin(board, player);
  if (won) gameover(won);
}
function checkwin(boards, player) {
  let plays = boards.reduce(
    (a, e, i) => (e === player ? a.concat(i) : a),
    []
  );
  let won = null;
  for (let [index, win] of comb.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      won = { index: index, player: player };
      break;
    }
  }
  return won;
}
function gameover(won) {
  for (let index of comb[won.index]) {
    document.getElementById(index).style.backgroundColor =
      won.player == hplayer ? "green" : "red";
  }
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener("click", turnClick, false);
  }
  declarewinner(won.player == hplayer ? "you win!!" : "you lose!!");
}
function declarewinner(who) {
  document.querySelector(".game").style.display = "block";
  document.querySelector(".game .win").innerHTML = who;
}
function squares() {
  return board.filter((s) => typeof s == "number");
}
function spot() {
  return squares()[0];
}
function tie() {
  if (squares().length == 0) {
    for (let index = 0; index < boxes.length; index++) {
      boxes[index].style.backgroundColor = "green";
      boxes[index].removeEventListener("click", turnClick, false);
    }
    declarewinner("tie game!");
    return true;
  }
  return false;
}