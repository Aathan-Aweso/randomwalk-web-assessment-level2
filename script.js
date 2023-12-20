let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let playerXScoreDisplay = document.getElementById("playerXScore");
let playerOScoreDisplay = document.getElementById("playerOScore");

// Winning Pattern 
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;
let playerXScore = 0;
let playerOScore = 0;


// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));

  popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });

  popupRef.classList.add("hide");
};

// This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    playerXScore++;
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    playerOScore++;
  }

  updateScoreDisplay();
};

// Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = " <br> It's a Draw";
};

// New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

// Restart
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

// Win Logic
const winChecker = () => {
  // Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];


    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        // If all 3 buttons have the same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

// Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;

      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;

      element.innerText = "O";
      element.disabled = true;
    }

    // Increment count on each click
    count += 1;

    // Check for win on every click
    winChecker();

    // Update message container after every even turn
    if (count % 2 === 0) {
      updateMessage("This is X's turn.");
    } else {
      updateMessage("This is O's turn.");
    }

    // Check for draw
    if (count == 9) {
      drawFunction();
    }
  });
});

function updateMessage(message) {
  const messageContainer = document.querySelector(".message-container");
  if (messageContainer) {
    messageContainer.innerText = message;
  }
}

function updateScoreDisplay() {
  playerXScoreDisplay.innerText = playerXScore;
  playerOScoreDisplay.innerText = playerOScore;
}


window.onload = enableButtons;
