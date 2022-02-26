/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useState, useEffect } from 'react'
import Square from './components/Square';
import Players from './components/Players';
import { Patterns } from './Patterns';
import axios from 'axios';
const App = (props) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", "", ""])
  const [player, setPlayer] = useState("x");
  const [result, setResult] = useState({ winner: "none", state: "none" })
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://tris_back.test/api/v1/players')
      .then(res => {
        console.log('promise fullfilled')
        setPlayers(res.data)
      })
  }, [])
  console.log('render',players.length,'players')
  useEffect(() => {
    checkWin();
    checkIfTie();
    if (player === 'x') {
      setPlayer("o")
    } else {
      setPlayer('x')
    }
  }, [board]);

  useEffect(() => {
    if (result.state !== 'none') {
      alert(`Game Finished! Winning Player: ${result.winner}`);
      restartGame();
    }

  }, [result])
  const addPlayers = (e) => {
    e.preventDefault()
    const playerObject = {
      name: newPlayer,
      id: players.length + 1
    }
    setPlayers(players.concat(playerObject))
    setNewPlayer('')
  }

  const handlePlayerChange = (event) => {
    console.log(event.target.value)
    setNewPlayer(event.target.value)
  }
  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === "") {
          return player
        }
        return val
      })
    );
  }
  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer === '') return;
      let foundWinningPattern = true
      currentPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false

        }
      })
      if (foundWinningPattern) {
        setResult({ winner: player, state: "won" })
      }
    })
  }

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === '') {
        filled = false;
      }
    })

    if (filled) {
      setResult({ winner: "No one", state: 'Tie' })
    }
  }
  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", "", ""]);
    setPlayer("x");
  }
  return (
    <div className="App">
      <form action="" onSubmit={addPlayers}>
        <input value={newPlayer} onChange={handlePlayerChange} />
        <button type='submit'>Add</button>
      </form>
      <div className='board'>
        <div className='row'>
          <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
          <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
          <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
        </div>
        <div className='row'>
          <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
          <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
          <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
        </div>
        <div className='row'>
          <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
          <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
          <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
        </div>
      </div>
    </div>
  );
}

export default App;
