let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let newGameBtn = document.querySelector("#new_game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true;
let gameOver = false;

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

// Enable all boxes and reset UI
const enabledBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
  msgContainer.classList.add("hide");
  resetBtn.classList.remove("hideResetBtn");
  resetBtn.classList.remove("hide");
  gameOver = false;
};

// Reset game
const resetGame = () => {
  turn = true;
  enabledBoxes();
};

resetBtn.addEventListener("click", resetGame);

// Disable all boxes when winner or draw happens
const disabledBtns = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBtns();
  resetBtn.classList.add("hide");
  gameOver = true;
};

// Check for draw
const drawGame = () => {
  let filledCount = 0;

  boxes.forEach((box) => {
    if (box.innerText !== "") filledCount++;
  });

  if (filledCount === 9) {
    // Add animation to all boxes
    boxes.forEach((box) => {
      box.classList.add("draw-animation");
    });

    // Wait for animation, THEN show message
    setTimeout(() => {
      msgContainer.classList.remove("hide");
      msg.innerText = "Game was Draw!";
      disabledBtns();
      resetBtn.classList.add("hideResetBtn");
    }, 600); // animation duration
  }
};

// Check winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val && pos2Val && pos3Val) {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

// Handle box clicks
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
    drawGame();
  });
});

// New game button
newGameBtn.addEventListener("click", () => {
  resetGame();
  boxes.forEach((box) => {
    box.classList.remove("draw-animation");
  });
});
