import './App.css';
import React, {useState, useEffect, useRef} from "react";
import ChessBoard from 'chessboardjsx';
import Chess from "chess.js"

const container = {
  marginTop: "2rem",
  display: "flex",
  justifyContent: "space-around",
  alignItem: "center",
}

function App() {

  const [fen, setFen] = useState("start")

  let game = useRef(null);

  useEffect(() =>{
    game.current = new Chess();
  },[])

  const onDrop = ({sourceSquare, targetSquare}) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
    })
    
    if (move === null) return; //this line checks for illegal moves

    setFen(game.current.fen()) //this line provides FEN string for current game

  }

  
const resetGame = () => {
  game.current.clear();
  game.current.reset();
  setFen("start");
}

  return (
    <>
    {
        game.current && game.current.game_over() ? <div style = {{textAlign: "center"}}><h1>Game Over</h1><button onClick={resetGame}>Reset</button></div>: <span></span>
      }
    <div className="App" style= {container}>
      <ChessBoard position={fen} onDrop = {onDrop}/>
    </div>
    </>
  );
}

export default App;