import { useState } from "react"
import './Componente2.css'
const Turns = {
  simone: 'X',
  simtwo: 'O'
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square1 ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

function Componente2({ player1, player2, initialSymbol, onBackToMenu }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(initialSymbol)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const win = checkWinner(newBoard)
    if (win) {
      setWinner(win)
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner("Empate")
    } else {
      const newTurn = turn === Turns.simone ? Turns.simtwo : Turns.simone;
      setTurn(newTurn)
    }
  };

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];
    for (let [a, bIdx, c] of lines) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  };

  const getWinnerName = () => {
    if (winner === 'Empate') return '¡Es un empate!'
    if (winner === Turns.simone) return `${player1} ha ganado`
    if (winner === Turns.simtwo) return `${player2} ha ganado`
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(initialSymbol)
    setWinner(null)
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 text-center">
          <h1>¡Juego Tic Tac Toe!</h1>
        </div>
        <section className="col-md-3 game">
          {
            board.map((_, index) => (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                isSelected={false}
              >
                {board[index]}
              </Square>
            ))
          }
        </section>
        {winner && (
          <div className="mt-3 text-center">
            <h3>{getWinnerName()}</h3>
          </div>
        )}
      </div>

      <div className='row border border-2 border-black rounded-3 mt-4 p-3'>
        <h3>Menú de Juego</h3>
        <div className='col-md-12'>
          <button className='btnReset p-3 rounded-2 m-1' onClick={resetGame}>Volver a Jugar</button>
          <button className='btnMenu p-3 rounded-2 m-1' onClick={onBackToMenu}>Volver a Menú Inicial</button>
        </div>
      </div>
    </div>
  );
}

export default Componente2