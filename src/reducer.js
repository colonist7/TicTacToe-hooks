const winCase = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
                ];

const initialState =  {    
                        board: [0,0,0,0,0,0,0,0,0],
                        player: 1,
                        score: [0,0],
                        reset: false,
                        emptyCells: 9,
                        winner: 0,
                        gameOver: false
                    };

let changePlayer = (state, id) => {
    state.board[id] = state.player;
    state.player = state.player === 1 ? 2 : 1;  

    return state;
}

let clearTable = (score) => {
    return {
        board: [0,0,0,0,0,0,0,0,0],
        player: 1,
        score: score,
        reset: false,
        emptyCells: 9,
        winner: 0,
        gameOver: false
    };
}

let checkGameover = (winner, emptyCells) => {                 
    if(winner > 0) {   
        return true;
    } else if(emptyCells === 0) {
        return true;
    } else if(emptyCells !== 0) {
        return false;
    }     
}

let postGameOver = (state) => {
    if(state.gameOver) {
        if(state.winner > 0) {
          console.log(`player ${state.winner} won !`);
        } else {
          console.log("free");
        }
      } 

      if(state.winner === 1) {
          state.score = [state.score[0] + 1, state.score[1]]
      } else if (state.winner === 2) { 
          state.score =  [state.score[0], state.score[1] + 1]
      }

      if(state.gameOver) {
        state = clearTable(state.score);
      }
  
      if(state.reset === true) {
        state = clearTable(state.score);
      }
  
      if(state.winner !== 0) {
        state = clearTable(state.score);
      }
  

      return state;
}

let calculatWinner = (state) => {
    for(let variant of winCase) { 
        if(state.board[variant[0]] === state.board[variant[1]] && state.board[variant[0]] === state.board[variant[2]] && state.board[variant[0]] !== 0){
            state.winner = state.board[variant[0]];
        } 
    }

    return state;
}

let setInitialState = () => {
    return {...initialState, board: [...initialState.board],};
}

export default function (state, action) {
    switch(action.type) {
        case "changePlayer":     
            //change player  
            state = changePlayer(state, action.payload);
            //calculate winner
            state = calculatWinner(state);
            //empty cells count
            state.emptyCells = state.board.filter(x => x === 0).length;
            //game over  
            state.gameOver = checkGameover(state.winner, state.emptyCells);
            //after game is over
            state = postGameOver(state);
            return state;
        case 'clearState':
            state = setInitialState();
            return state; 
        default: 
            return state;
    }
}