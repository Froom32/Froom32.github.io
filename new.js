const game = document.getElementById('game');
const modalContent = document.getElementById('content');
const modalWrapper = document.getElementById('modal-wrapper');
const btnNewGame = document.getElementById('btn-new-game');
let boardSize;
let step;
let currentPlayer;
let playerX = {
    name: 'X',
    rowContainer: [],
    colContainer: [],
    diagonalContainer: [],
    oppositeDiagonalContainer: [],
};
let player0 = {
    name: '0',
    rowContainer: [],
    colContainer: [],
    diagonalContainer: [],
    oppositeDiagonalContainer: [],
};

btnNewGame.addEventListener('click', () => {
    clearGameField();
    createNewGame();
});

function clearGameField() {
    game.innerHTML = '';
    modalWrapper.style.display = 'none';
};

function createNewGame() {
    step = 1;
    currentPlayer = playerX;
    boardSize = +document.querySelector('input[name="board_size"]:checked').value;

    for (i = 0; i < boardSize; i++) {
        playerX.rowContainer[i] = 0;
        playerX.colContainer[i] = 0;
        playerX.diagonalContainer[i] = 0;
        playerX.oppositeDiagonalContainer[i] = 0;
        player0.rowContainer[i] = 0;
        player0.colContainer[i] = 0;
        player0.diagonalContainer[i] = 0;
        player0.oppositeDiagonalContainer[i] = 0;

        for (k = 0; k < boardSize; k++) {
            game.innerHTML += `<div class="box${boardSize}" row="${i}" col="${k}" id="${i}${k}"></div>`;
        };
    };
};

game.addEventListener('click', (event) => {
    if (!event.target.innerHTML) {
        renderStep(event);
        checkWinner(+event.target.getAttribute('row'), +event.target.getAttribute('col'));
        goToNextStep();
        changePlayer();
    };
});

function renderStep(event) {
    event.target.innerHTML = currentPlayer.name;
};

function checkWinner(row, col) {
    currentPlayer.rowContainer[row] += 1;
    currentPlayer.colContainer[col] += 1;
    if (row == col) {
        currentPlayer.diagonalContainer[row] += 1;
    };
    if (+row + col + 1 == boardSize) {
        currentPlayer.oppositeDiagonalContainer[row] += 1;
    };

    let sum = (total, current) => total + current;

    if (currentPlayer.rowContainer[row] == boardSize
        || currentPlayer.colContainer[col] == boardSize
        || currentPlayer.diagonalContainer.reduce(sum) == boardSize
        || currentPlayer.oppositeDiagonalContainer.reduce(sum) == boardSize) {
        showResult(currentPlayer.name);
    } else if (step == boardSize * boardSize) {
        showResult('Nobody');
    };
};

function showResult(winner) {
    modalContent.innerHTML = `${winner} Won!`;
    modalWrapper.style.display = 'block';
};

function goToNextStep() {
    step++;
};

function changePlayer() {
    currentPlayer = step % 2 == 0 ? player0 : playerX;
};
