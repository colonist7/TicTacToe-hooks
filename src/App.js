import React, { useCallback, useReducer} from 'react';
import './App.css';
import Block from './block';
import reducer from './reducer';

let App = () => {
  const [state, dispatch] = useReducer(reducer, {
                                                  board: [0,0,0,0,0,0,0,0,0],
                                                  player: 1,
                                                  score: [0,0],
                                                  reset: false,
                                                  emptyCells: 9,
                                                  winner: 0,
                                                  gameOver: false
                                                  })

  let turn = useCallback((id) => {  
        dispatch({
                type: 'changePlayer',
                payload: id});
      }, [dispatch]);


  let clearState = () => {
     dispatch({
          type: 'clearState'
        });
  }

  let renderBlock = (id) => {
    return <Block id={id} state={state} changePlayer={turn}/>
  };


  return <>
            <h4>{state.score[0]} : {state.score[1]}</h4>
            <button onClick={() => clearState()}>Reset</button>
            <div style={{"display": "flex"}}>
              {renderBlock(0)}
              {renderBlock(1)}
              {renderBlock(2)}
            </div>
            <div style={{"display": "flex"}}>
              {renderBlock(3)}
              {renderBlock(4)}
              {renderBlock(5)}
            </div>
            <div style={{"display": "flex"}}>
              {renderBlock(6)}
              {renderBlock(7)}
              {renderBlock(8)}
            </div>
        </>
}

export default App;
