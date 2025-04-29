import React from "react";

import './App.css'
import { useState } from 'react'
import Componente2 from './Componente2.jsx'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const App = ({ initialName1, initialName2, playerSymbol }) => {
  const [playerName1 = "Nombre Jugador 1", setPlayerName1] = useState(initialName1)
  const [playerName2 = "Nombre Jugador 2", setPlayerName2] = useState(initialName2)
  const [isEditing1, setIsEditing1] = useState(false)
  const [isEditing2, setIsEditing2] = useState(false)
  const [symbolSelected, setSymbolSelected] = useState(null)

  function handleChangeClick1() {
    setIsEditing1((prev) => !prev)
  }

  function handleChangeClick2() {
    setIsEditing2((prev) => !prev)
  }

  function handleChangeName1(event) {
    setPlayerName1(event.target.value)
  }

  function handleChangeName2(event) {
    setPlayerName2(event.target.value)
  }

  function handleSymbolSelect(symbol) {
    setSymbolSelected(symbol)
  }
  function resetToMenu() {
    setSymbolSelected(null)
  }
  const playerNameField1 = isEditing1
    ? (<input type="text" required value={playerName1} onChange={handleChangeName1} />)
    : (<span className="player-name">{playerName1}</span>)

  const playerNameField2 = isEditing2
    ? (<input type="text" required value={playerName2} onChange={handleChangeName2} />)
    : (<span className="player-name">{playerName2}</span>);

  const btnCambiarvalor1 = isEditing1 ? "Guardar" : "Cambiar"
  const btnCambiarvalor2 = isEditing2 ? "Guardar" : "Cambiar"

  return (
    <div className="container text-center align-content-center mt-5 p-3">
      {!symbolSelected ? (
        <>
          <div className="row justify-content-md-center border border-2 border-black shadow rounded-2 text-bg-secondary">
            <div className="col-md-12">
              <h1>TIC-TAC-TOE</h1>
              <h3>Juego React</h3>
            </div>
          </div>

          <div className="row mt-3 border p-3">
            <div className='col-md-6 d-flex flex-column border-end'>
              <span className="player">
                {playerNameField1}
                <span className="player-symbol">{playerSymbol}</span>
              </span>
              <button onClick={handleChangeClick1}>{btnCambiarvalor1}</button>
            </div>
            <div className='col-md-6 d-flex flex-column'>
              <span className="player">
                {playerNameField2}
                <span className="player-symbol">{playerSymbol}</span>
              </span>
              <button onClick={handleChangeClick2}>{btnCambiarvalor2}</button>
            </div>
          </div>

          <div className='row border-end border-start'>
            <h3>Selecciona Símbolo Inicial</h3>
            <div className='col-md-12 p-2'>
              <button className='btn-sty rounded-2 m-1' onClick={() => handleSymbolSelect("X")}>X</button>
              <button className='btn-sty rounded-2 m-1' onClick={() => handleSymbolSelect("O")}>O</button>
            </div>
          </div>
        </>
      ) : (
        <Componente2 
          player1={playerName1}
          player2={playerName2}
          initialSymbol={symbolSelected}
          onBackToMenu={resetToMenu}
        />
      )}
    </div>
  );
};

export default App;
