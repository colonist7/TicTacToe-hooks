import React, {useState, useEffect} from 'react';
import './App.css';

let Block = (props) => {
    let id = props.id;
    const signs = ["", "x", "o"];
    let [sign, setSign] = useState(signs[0]);
    let [active, setActive] = useState(true);
  
    useEffect(() => {  
        setSign(signs[props.state.board[id]]);
        setActive(props.state.board[id] === 0);
    }, [setActive, active, props.state.gameOver, signs, setSign, props.state.reset,props.state, id])
  
    return <div style={{
                        "opacity": active ? "1" : "0.4",
                        "width": "60px", 
                        "height": "60px", 
                        "border": "1px solid red", 
                        "borderRadius": "10px",
                        "margin": "5px",
                        "display" : "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }} 
                onClick={() => {
                  if(active) {
                    setSign(signs[props.state.player]);
                    setActive(false);
                    props.changePlayer(id);
                  }
                }} >
                {sign}
              </div>
  }

export default Block;
  