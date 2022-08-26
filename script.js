const startMenu = document.getElementById('startMenu');
let timer;
const state = {
    isSecondStep: false,
    previousElemId: '',
    tempValue: '',
    countFinished: 0
}

renderStartMenu()

// UI rendering
function renderStartMenu() {
    const start = document.createElement('button');
    start.innerText = 'New Game';
    startMenu.appendChild(start);
    start.addEventListener('click', renderBoard);
}

function renderBoard() {
    timer = Date.now();
    startMenu.classList.add('d-none');
    const board = document.getElementById('field');
    let symbols = [];
    for(let i = 0; i < 4; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        symbols[i] = [];
        for(let j = 0; j < 4; j++) {
            let temp = Math.floor(Math.random() * 8);
            if (isMoreTwice(symbols, temp)) {
                j--;
            } else {
                symbols[i][j] = temp;
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.classList.add('hidden');
                cell.innerText = symbols[i][j];
                cell.id = `${i}${j}`; 
                cell.addEventListener('click', handleStep);
                row.appendChild(cell);
            }
        }
        board.appendChild(row);
    }
}

// #region Event Listeners

function handleStep(e) {
    if (!state.isSecondStep) {
        state.tempValue = e.target.innerHTML;
        e.target.classList.remove('hidden');
        state.previousElemId = e.target.id;
        state.isSecondStep = true;
    } else {
        if(state.tempValue === e.target.innerHTML && state.previousElemId !== e.target.id) {
            e.target.classList.remove('hidden');
            const elem = document.getElementById(state.previousElemId);
            elem.classList.remove('hidden');
            state.countFinished ++;
        } else {
            e.target.classList.remove('hidden');
            const elem = document.getElementById(state.previousElemId);
            setTimeout(() => elem.classList.add('hidden'), 500);
            setTimeout(() => e.target.classList.add('hidden'), 500);
        }
        state.isSecondStep = false;
    }
    if (state.countFinished === 8) {
        timer = Date.now() - timer;
        let gameID;
        if(localStorage.length === 0) {
            gameID = 0;
            localStorage.setItem(`game${gameID}`, `${gameID}`);
        } else {
            gameID = +localStorage.getItem(`game${localStorage.length - 1}`);
            gameID++;
            localStorage.setItem(`game${gameID}`, `${gameID}`);
        }
        alert(`Game Over! Game ID ${localStorage.getItem(`game${localStorage.length - 1}`)}`); // Timer is not completed
        location.reload();
    }
}

// #endregion

// helpers

function isMoreTwice(completedCells, num) {
    let matrix = completedCells;
    let count = 0;
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] == num) count++;
        }
    }
    if(count > 1) return true;
    return false;
}