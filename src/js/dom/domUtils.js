import mainGame from '../mainGame';

let game = mainGame();

let {
  humanBoard,
  computerBoard,
  human,
  computer,
} = game.battleShipObjs;

const container = document.querySelector('.container');

const attackCallBack = (target) => {
  // Call gameTurn method
  const index = Number(target.id.substr(2));
  const turns = game.gameTurn(index, human, computer, humanBoard, computerBoard);
  /*----------------------------------------*/
  // change the target's inner html into X
  if (computerBoard.grid[index] !== "*") {
    target.innerText = "X";
  } else {
    target.innerText = computerBoard.grid[index];
  }
  if (game.checkWin(computerBoard)) createEndGameDiv("Human win!");

  /* -----------------------------------*/
  // update the display in the human board based on the computer's turn
  if (turns !== []) {
    turns.forEach((turn) => {
      const humanSquare = document.getElementById(`h-${turn}`);
      document.querySelector('.guard-box').classList.remove('invisible');
      setTimeout(() => changeText(humanSquare, humanBoard, turn), 2000);
    });
  }
  if (game.checkWin(humanBoard)) createEndGameDiv("Computer win!");
};

const changeText = (humanSquare, humanBoard, turn) => {
  humanSquare.innerText = humanBoard.grid[turn];
  document.querySelector('.guard-box').classList.add('invisible');
};

const createGrid = (num, boardName) => {
  const grid = document.createElement('div');
  grid.setAttribute('class', `col-5 mx-3 mt-5`);

  for (let i = 0; i < num; i++) {
    grid.appendChild(createRow(num, i, boardName));
  }

  return grid;
};


const createRow = (num, rowNum, boardName) => {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  for (let i = 0; i < num; i++) {
    const box = document.createElement('div');
    box.setAttribute('class', 'col box');
    box.setAttribute('id', `${boardName}-${((rowNum * 10) + i)}`);
    if (boardName === 'c') {
      box.classList.add('c');
      addBoxListener(box);
    }
    row.appendChild(box);
  }
  return row;
};

const addBoxListener = (box) => {
  box.addEventListener('click', (e) => {
    e.stopPropagation();
    attackCallBack(e.target);
  }, {
    once: true,
  });
};

const humanBoardGrid = createGrid(10, 'h');
const computerBoardGrid = createGrid(10, 'c');


const guardBox = (parent) => {
  const bigBox = document.createElement('div');
  bigBox.setAttribute('class', 'bg-secondary position-absolute guard-box invisible');
  parent.appendChild(bigBox);
};

guardBox(computerBoardGrid);

const createEndGameDiv = (statusMsg) => {
  const endGameDiv = document.createElement('div');
  endGameDiv.setAttribute('class', 'position-absolute end-game');
  const msg = document.createElement('p');
  msg.setAttribute('class', 'position-absolute  end-game-msg');
  msg.innerText = statusMsg;
  container.appendChild(msg);
  container.appendChild(endGameDiv);
};

document.getElementsByTagName("button")[0].addEventListener("click", () => {
  //1. Create a new game
  game = mainGame();
  // 2. Generate new pieces for the game
  ({
    humanBoard,
    computerBoard,
    human,
    computer,
  } = game.battleShipObjs);
  // Clear all cells
  [...document.getElementsByClassName('box')].forEach((box) => {
    box.innerText = "";
  });
  // Add back event listeners
  [...document.getElementsByClassName('c')].forEach(box => addBoxListener(box));

  // Remove endGame div
  if (document.querySelector('p')) document.querySelector('.container').removeChild(document.querySelector('p'));
  if (document.querySelector('.end-game')) document.querySelector('.container').removeChild(document.querySelector('.end-game'));

});

export {
  createGrid,
  humanBoardGrid,
  computerBoardGrid,
  container,
};