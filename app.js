let state = {};

const resetState = () => {
    state.board = [
        {value: ""}, 
        {value: " "}, 
        {value: "  "},
        {value: "   "}, 
        {value: "    "}, 
        {value: "     "},
        {value: "      "}, 
        {value: "       "}, 
        {value: "        "},
    ];
    state.currentPlayer = () => state.players[state.currentplayerIdx]
    state.players = ['', '']
    state.currentplayerIdx = 0;
};

// ***** dom selectors *****
const boardElem = document.querySelector('#board');
const playerTurnElem = document.querySelector('#players-turn');
const winnerElem = document.querySelector('#winner')

// dom manipulation functions

const renderBoard = () => {
    boardElem.innerHTML = ''
    for (let i = 0; i < state.board.length; i++) {
    const box = state.board[i];

    const boxElem = document.createElement('div');
    boxElem.classList.add('box');
    boxElem.innerText = box.value;
    boxElem.dataset.index = i;
    boardElem.appendChild(boxElem);
    }
};

const Players = () => {
    let text;
    if (!state.players[0] || !state.players[1]) {
    text = `<input name = 'player1' placeholder="Enter Player 1" required={true}>
        <input name = 'player2' placeholder="Enter Player 2" required={true}>
        <button class = 'start'>Start Game</button>`;
    } else {
        text = `It's currently ${state.currentPlayer()}'s turn. <button class = 'reset'>Reset Game</button>`;
    }
    playerTurnElem.innerHTML = text;
};


const nextPlayer = () => {
    state.currentplayerIdx = Math.abs(state.currentplayerIdx - 1);
};

const PlayerXorO = () => {
    const boxIdx = event.target.dataset.index
    if ( 1 === state.currentplayerIdx) {
        if (state.board[boxIdx].value == 'O' || state.board[boxIdx].value == 'X') {
            return
        } else {const boxIdx = event.target.dataset.index
         {state.board[boxIdx].value = 'X';}}
         } else if ( 0 === state.currentplayerIdx) {
        if (state.board[boxIdx].value == 'X' || state.board[boxIdx].value == 'O' ) {
            return
        } else {const boxIdx = event.target.dataset.index
        state.board[boxIdx].value = 'O';}
    }
};

const winner = () => {
    state.Winner = "Winner Winner Chicken Dinner"
    if (state.board[0].value === state.board[1].value && state.board[0].value === state.board[2].value) {
         winnerElem.innerHTML = state.Winner} 
    if (state.board[3].value === state.board[4].value && state.board[3].value === state.board[5].value) {
         winnerElem.innerHTML = state.Winner} 
    if (state.board[6].value === state.board[7].value && state.board[6].value === state.board[8].value) {
         winnerElem.innerHTML = state.Winner}
    if (state.board[0].value === state.board[3].value && state.board[0].value === state.board[6].value) {
         winnerElem.innerHTML = state.Winner}
    if (state.board[1].value === state.board[4].value && state.board[1].value === state.board[7].value) {
         winnerElem.innerHTML = state.Winner}
    if (state.board[2].value === state.board[5].value && state.board[2].value === state.board[8].value) {
         winnerElem.innerHTML = state.Winner}
    if (state.board[0].value === state.board[4].value && state.board[0].value === state.board[8].value) {
         winnerElem.innerHTML = state.Winner}
    if (state.board[2].value === state.board[4].value && state.board[2].value === state.board[6].value) {
         winnerElem.innerHTML = state.Winner}
    
}
const render = () => {
    renderBoard();
    Players();
};

// ******** event listeners *******

playerTurnElem.addEventListener('click', (event) => {
    if (event.target.className === 'start') {
        const player1Input = document.querySelector('input[name=player1]')
        const player1Value = player1Input.value;
        state.players[0] = player1Value
        const player2Input = document.querySelector('input[name=player2]')
        const player2Value = player2Input.value;
        state.players[1] = player2Value;
        render();
    } else if (event.target.className === 'reset') {
        winnerElem.innerHTML = ''
        resetState();
        render();
    }
});

boardElem.addEventListener('click', (event) => {
    if (state.players[0] || state.players[1]) {
        nextPlayer();
        PlayerXorO();
        winner();
        render();
    }
});



// ********* boot strapping ********
    resetState();
    render();
    nextPlayer();