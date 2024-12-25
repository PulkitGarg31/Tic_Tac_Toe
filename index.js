// Select all necessary DOM elements
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart');

// Define variables for tracking game state
let isCircleTurn = false;
let gameActive = true;
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game
startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    isCircleTurn = false;
    gameActive = true;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    messageElement.style.display = 'none';
}

function handleClick(e) {
    if (!gameActive) return;

    const cell = e.target;
    const currentClass = isCircleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        winnerMessage.innerText = 'Draw!';
    } else {
        winnerMessage.innerText = `${isCircleTurn ? "O's" : "X's"} Wins!`;
    }
    messageElement.style.display = 'block';
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass === X_CLASS ? 'X' : 'O';
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (isCircleTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
