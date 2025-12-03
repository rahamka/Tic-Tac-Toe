let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let newGameBtn = document.querySelector("#new_game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
  msgContainer.classList.add("hide");
};

const resetGame = () => {
  boxes.forEach((val) => {
    turn = true;
    enabledBoxes();
  });
};

resetBtn.addEventListener("click", () => {
  resetGame();
});

const disabledBtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBtns();
  resetBtn.classList.add("hide");
};

let trackingNum = 0;
const drawGame = () => {
  trackingNum++;
  if (trackingNum === 9) {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
      if (pos1Val !== pos2Val && pos2Val !== pos3Val) {
        for (let box of boxes) {
          setTimeout(() => {
            box.innerText = "";
          }, 100);
        }
        // remove the hide from msgContainer
        msgContainer.classList.remove("hide");
        msg.innerText = "Game was Draw!";
        resetBtn.classList.add("hideResetBtn");
      }
    }
  }
  // how to get the last click?
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    drawGame();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "X";
      turn = false;
    } else {
      box.innerText = "0";
      turn = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

newGameBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
  resetBtn.classList.remove("hide");
  trackingNum = 0;
  resetBtn.classList.remove("hideResetBtn");
});
