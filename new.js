const game = document.getElementById('game');
const modalContent = document.getElementById('content');
const modalWrapper = document.getElementById('modal-wrapper');
const btnNewGame = document.getElementById('btn-new-game');
let step;
let player;
let gameMap;
const winMap = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

btnNewGame.addEventListener('click', () => {
    clearGameingField();
    createBoxesForGame();
});

function clearGameingField() {
    game.innerHTML = '';
    modalWrapper.style.display = 'none';
};

function createBoxesForGame() {
    step = 1;
    player = 'X';
    gameMap = new Array(9);

    for (i = 0; i < gameMap.length; i++) {
        game.innerHTML += `<div class="box" id="${i}"></div>`;
    };
};

game.addEventListener('click', (event) => {
    if (!event.target.innerHTML) {
        renderStep(event);
        writeState(event);
        checkWinner();
        changePlayer();
        goToNextStep();
    };
});

function changePlayer() {
    player = player == 'X' ? '0' : 'X';
};

function renderStep(event) {
    event.target.innerHTML = player;
};

function writeState(event) {
    gameMap[event.target.id] = player;
};

function goToNextStep() {
    step++;
};

function checkWinner() {
    for (i in winMap) {
        let win = true;

        for (k in winMap[i]) {
            if (gameMap[winMap[i][k]] != player) {
                win = false;
            };
        };

        if (win) {
            showResult(player);
        };
    };

    if (step == 9) {
        showResult('Nobody');
    };
};

function showResult(winner) {
    modalContent.innerHTML = `${winner} Won!`;
    modalWrapper.style.display = 'block';
};
