"use client";
import React, { useState } from "react";

const AdivinaElNumero = () => {
  const [numDice, setNumDice] = useState(1);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  const rollDiceAndGuess = () => {
    const diceResults = [];
    for (let i = 0; i < numDice; i++) {
      diceResults.push(Math.floor(Math.random() * 6) + 1);
    }

    const diceSum = diceResults.reduce((acc, curr) => acc + curr, 0);
    if (diceSum === parseInt(guess)) {
      setResult("¡Correcto! Ganaste.");
      setScore(score + 1);
    } else {
      setResult("Incorrecto. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <h1>Adivina el numero</h1>
      <div>
        <label>Cantidad de Dados:</label>
        <select onChange={(e) => setNumDice(parseInt(e.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>
      <div>
        <label>Adivina la Suma:</label>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      </div>
      <button onClick={rollDiceAndGuess}>Tirar Dados y Adivinar</button>
      <div>
        <h2>Resultado: {result}</h2>
        <h2>Puntaje: {score}</h2>
      </div>
    </div>
  );
};

export default AdivinaElNumero;
